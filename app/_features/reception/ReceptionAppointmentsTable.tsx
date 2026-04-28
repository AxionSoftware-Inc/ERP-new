"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Card, DatePicker, Input, Select, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { ActionButton, ActionDropdown, type PanelAction } from "../../_components/ActionDrawer";
import { receptionActions } from "../../_lib/panelActions";
import type { AppointmentStatus } from "../../_data/fakeClinicData";
import type { ReceptionAppointmentRow } from "./receptionData";
import {
  appointmentSourceLabels,
  appointmentStatusLabels,
  appointmentTypeLabels,
  formatDateTime,
  getDoctorOptions,
  getReceptionAppointments,
  queueStepLabels,
} from "./receptionData";
import { ReceptionStatusTag } from "./ReceptionStatusTag";
import { ReceptionSubnav } from "./ReceptionSubnav";
import { PaymentStatusTag } from "./PaymentStatusTag";

const { RangePicker } = DatePicker;
const { Text, Title } = Typography;

export function ReceptionAppointmentsTable() {
  const [rows, setRows] = useState(() => getReceptionAppointments());

  function applyReceptionAction(id: string, key: string) {
    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row;
        if (key === "arrived") return { ...row, status: "ARRIVED", checkedInAt: new Date().toISOString() };
        if (key === "payment") return { ...row, status: "WAITING_PAYMENT", paymentStatus: "WAITING", queueStep: "CASHIER", queueTicket: row.queueTicket ?? "K-NEW" };
        if (key === "doctor") return { ...row, status: "WAITING_DOCTOR", queueStep: "DOCTOR", queueTicket: row.queueTicket ?? "D-NEW" };
        if (key === "no-show") return { ...row, status: "NO_SHOW" };
        if (key === "cancel") return { ...row, status: "CANCELLED" };
        return row;
      }),
    );
  }

  const columns: ColumnsType<ReceptionAppointmentRow> = [
    { title: "Qabul raqami", dataIndex: "appointmentNumber", width: 150, fixed: "left" },
    {
      title: "Sana va vaqt",
      dataIndex: "scheduledAt",
      width: 125,
      render: (value: string) => formatDateTime(value),
    },
    {
      title: "Bemor",
      dataIndex: "patientName",
      width: 190,
      render: (value: string, record) => (
        <Space direction="vertical" size={0}>
          <Link href={`/patients/${record.patientId}`}>{value}</Link>
          <Text type="secondary">{record.patientPhone}</Text>
        </Space>
      ),
    },
    {
      title: "Qabul",
      width: 250,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <span>{record.doctorName}</span>
          <Text type="secondary">{record.serviceName}</Text>
        </Space>
      ),
    },
    {
      title: "Tur/manba",
      width: 145,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <span>{appointmentTypeLabels[record.type]}</span>
          <Text type="secondary">{appointmentSourceLabels[record.source]}</Text>
        </Space>
      ),
    },
    {
      title: "To'lov",
      dataIndex: "paymentStatus",
      width: 105,
      render: (_, record) => <PaymentStatusTag status={record.paymentStatus} />,
    },
    {
      title: "Navbat",
      dataIndex: "queueTicket",
      width: 105,
      render: (value: string | undefined, record) => (
        <Space direction="vertical" size={0}>
          <span>{value ?? "-"}</span>
          <Text type="secondary">{record.queueStep ? queueStepLabels[record.queueStep] : ""}</Text>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 130,
      render: (_, record) => <ReceptionStatusTag status={record.status} />,
    },
    {
      title: "Keyingi amal",
      width: 220,
      fixed: "right",
      render: (_, record) => {
        const primaryAction = getReceptionPrimaryAction(record);
        return (
          <Space className="workflow-action-row">
            {primaryAction ? (
              <ActionButton action={primaryAction} size="small" onSubmit={(action) => applyReceptionAction(record.id, action.key)}>
                {primaryAction.label}
              </ActionButton>
            ) : (
              <Link className="secondary-link" href={`/reception/appointments/${record.id}`}>Tafsilot</Link>
            )}
            <ActionDropdown actions={receptionActions} onSubmit={(action) => applyReceptionAction(record.id, action.key)} />
          </Space>
        );
      },
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <ReceptionSubnav />
      <div className="erp-ant-page-header">
        <div>
          <Text type="secondary">Registratura</Text>
          <Title level={2}>Qabullar ro&apos;yxati</Title>
          <Text>Barcha qabullarni sana, shifokor, bemor, xizmat va status bo&apos;yicha boshqarish.</Text>
        </div>
        <Link href="/reception/appointments/new">
          <Button type="primary" icon={<PlusOutlined />}>
            Yangi qabul
          </Button>
        </Link>
      </div>

      <Card size="small" className="filter-card">
        <Space wrap>
          <Input prefix={<SearchOutlined />} placeholder="Bemor, telefon yoki qabul raqami" style={{ width: 260 }} />
          <RangePicker />
          <Select
            allowClear
            placeholder="Status"
            style={{ width: 180 }}
            options={Object.entries(appointmentStatusLabels).map(([value, label]) => ({ value, label }))}
          />
          <Select
            allowClear
            placeholder="To'lov holati"
            style={{ width: 170 }}
            options={[
              { label: "To'langan", value: "PAID" },
              { label: "To'lov kutmoqda", value: "WAITING" },
              { label: "Qarzdor", value: "DEBT" },
              { label: "Hisob yo'q", value: "NO_INVOICE" },
            ]}
          />
          <Select allowClear placeholder="Shifokor" style={{ width: 220 }} options={getDoctorOptions()} />
          <Button>Filterlarni tozalash</Button>
        </Space>
      </Card>

      <Card size="small" className="table-card">
        <Table
          rowKey="id"
          size="small"
          columns={columns}
          dataSource={rows}
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 20, showSizeChanger: true, pageSizeOptions: [20, 50, 100] }}
          rowClassName={(record) => (record.status === ("CANCELLED" as AppointmentStatus) ? "muted-row" : "")}
        />
      </Card>
    </Space>
  );
}

function getReceptionPrimaryAction(record: ReceptionAppointmentRow): PanelAction | null {
  if (["COMPLETED", "CANCELLED", "NO_SHOW"].includes(record.status)) return null;
  if (record.status === "SCHEDULED" || record.status === "CONFIRMED") return { ...receptionActions[0], primary: true };
  if (record.status === "ARRIVED") return { ...(record.paymentStatus === "PAID" ? receptionActions[2] : receptionActions[1]), primary: true };
  if (record.status === "WAITING_PAYMENT") return { ...receptionActions[1], primary: true };
  if (record.status === "WAITING_DOCTOR") return { ...receptionActions[2], primary: true };
  return null;
}
