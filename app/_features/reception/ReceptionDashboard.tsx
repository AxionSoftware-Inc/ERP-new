"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Card, Col, Input, Row, Space, Statistic, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CalendarOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { ActionButton, ActionDropdown, type PanelAction } from "../../_components/ActionDrawer";
import { receptionActions } from "../../_lib/panelActions";
import type { ReceptionAppointmentRow } from "./receptionData";
import {
  formatTime,
  getReceptionAppointments,
  getReceptionMetrics,
  queueStepLabels,
} from "./receptionData";
import { ReceptionStatusTag } from "./ReceptionStatusTag";
import { ReceptionSubnav } from "./ReceptionSubnav";
import { PaymentStatusTag } from "./PaymentStatusTag";
import { QuickPatientSearch } from "./QuickPatientSearch";
import { QuickPatientDrawer } from "./QuickPatientDrawer";
import { WorkflowBoard } from "./WorkflowBoard";
import { ReceptionOpsChecklist } from "./ReceptionOpsChecklist";

const { Text, Title } = Typography;

export function ReceptionDashboard() {
  const [quickPatientOpen, setQuickPatientOpen] = useState(false);
  const [rows, setRows] = useState(() => getReceptionAppointments());
  const metrics = getReceptionMetrics();

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
    {
      title: "Vaqt",
      dataIndex: "scheduledAt",
      width: 70,
      render: (value: string) => <strong>{formatTime(value)}</strong>,
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
      title: "To'lov",
      dataIndex: "paymentStatus",
      width: 105,
      render: (_, record) => <PaymentStatusTag status={record.paymentStatus} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 130,
      render: (_, record) => <ReceptionStatusTag status={record.status} />,
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
      title: "Keyingi amal",
      width: 210,
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
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Registratura</Text>
          <Title level={2}>Qabulxona ish stoli</Title>
          <Text>Bemorlarni ro&apos;yxatdan o&apos;tkazish, qabulga yozish va bo&apos;limlarga yo&apos;naltirish.</Text>
        </div>
        <Space wrap>
          <Link href="/reception/schedule">
            <Button icon={<CalendarOutlined />}>Qabul jadvali</Button>
          </Link>
          <Link href="/reception/appointments/new">
            <Button type="primary" icon={<PlusOutlined />}>
              Yangi qabul
            </Button>
          </Link>
        </Space>
      </div>

      <Row gutter={[10, 10]} className="kpi-strip">
        <Col xs={24} sm={12} lg={5}>
          <Card size="small">
            <Statistic title="Bugungi qabullar" value={metrics.totalToday} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={5}>
          <Card size="small">
            <Statistic title="Kelganlar" value={metrics.arrived} valueStyle={{ color: "#047857" }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={5}>
          <Card size="small">
            <Statistic title="Kutayotganlar" value={metrics.waiting} valueStyle={{ color: "#b45309" }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={5}>
          <Card size="small">
            <Statistic title="Kelmaganlar" value={metrics.noShow} valueStyle={{ color: "#b91c1c" }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card size="small">
            <Statistic title="Follow-up" value={metrics.callFollowUps} valueStyle={{ color: "#b45309" }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[12, 12]}>
        <Col xs={24} xl={7}>
          <QuickPatientSearch onCreatePatient={() => setQuickPatientOpen(true)} />
        </Col>
        <Col xs={24} xl={12}>
          <section className="surface-panel">
            <div className="surface-panel-header">
              <div>
                <strong>Reception workflow</strong>
                <Text type="secondary">Bemor klinika ichida qaysi bosqichda ekanini tez ko&apos;rish.</Text>
              </div>
            </div>
            <WorkflowBoard />
          </section>
        </Col>
        <Col xs={24} xl={5}>
          <ReceptionOpsChecklist />
        </Col>
      </Row>

      <Card
        size="small"
        title="Bugungi qabul ro'yxati"
        extra={<Input prefix={<SearchOutlined />} placeholder="Bemor, telefon yoki qabul raqami" style={{ width: 280 }} />}
      >
        <Table
          rowKey="id"
          size="small"
          columns={columns}
          dataSource={rows}
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 10, showSizeChanger: true }}
        />
      </Card>

      <QuickPatientDrawer open={quickPatientOpen} onClose={() => setQuickPatientOpen(false)} />
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
