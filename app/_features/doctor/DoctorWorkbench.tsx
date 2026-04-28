"use client";

import Link from "next/link";
import { useState } from "react";
import { Alert, Button, Card, Col, Row, Space, Statistic, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FileTextOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { ActionDropdown } from "../../_components/ActionDrawer";
import { doctorActions } from "../../_lib/panelActions";
import type { DoctorAppointmentRow } from "./doctorData";
import { formatTime, getDoctorAppointments, getDoctorMetrics } from "./doctorData";
import { DoctorStatusTag } from "./DoctorStatusTag";
import { DoctorSubnav } from "./DoctorSubnav";

const { Text, Title } = Typography;

export function DoctorWorkbench() {
  const [rows, setRows] = useState(() => getDoctorAppointments());
  const metrics = getDoctorMetrics();

  function applyDoctorAction(id: string, key: string) {
    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row;
        if (key === "lab") return { ...row, labCount: row.labCount + 1 };
        if (key === "diag") return { ...row, diagnosticCount: row.diagnosticCount + 1 };
        if (key === "lock") return { ...row, status: "COMPLETED", encounterStatus: "LOCKED" };
        return row;
      }),
    );
  }

  const columns: ColumnsType<DoctorAppointmentRow> = [
    {
      title: "Vaqt",
      dataIndex: "scheduledAt",
      width: 70,
      render: (value: string) => <strong>{formatTime(value)}</strong>,
    },
    {
      title: "Bemor",
      dataIndex: "patientName",
      width: 210,
      render: (value: string, record) => (
        <Space direction="vertical" size={0}>
          <Link href={`/doctor/patients/${record.patientId}/history`}>{value}</Link>
          <Text type="secondary">
            {record.patientAge} yosh · {record.patientPhone}
          </Text>
        </Space>
      ),
    },
    { title: "Sabab", dataIndex: "reason", width: 230 },
    {
      title: "Ogohlantirish",
      width: 180,
      render: (_, record) => (
        <Space wrap>
          {record.patientWarnings.length ? record.patientWarnings.map((warning) => <Tag color="volcano" key={warning}>{warning}</Tag>) : <Tag>Yo&apos;q</Tag>}
        </Space>
      ),
    },
    {
      title: "Orderlar",
      width: 130,
      render: (_, record) => (
        <Space>
          <Tag color={record.labCount ? "blue" : "default"}>Lab {record.labCount}</Tag>
          <Tag color={record.diagnosticCount ? "purple" : "default"}>Diag {record.diagnosticCount}</Tag>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      render: (_, record) => <DoctorStatusTag status={record.status} />,
    },
    {
      title: "Keyingi amal",
      width: 180,
      render: (_, record) => (
        <Space className="workflow-action-row">
          {record.status === "COMPLETED" || record.status === "CANCELLED" ? (
            <Link className="secondary-link" href={`/patients/${record.patientId}/medical-history`}>Tarix</Link>
          ) : (
            <Link href={`/doctor/appointments/${record.id}`}>
              <Button size="small" type="primary">{record.status === "IN_PROGRESS" ? "Davom ettirish" : "Qabulni ochish"}</Button>
            </Link>
          )}
          <ActionDropdown actions={doctorActions} onSubmit={(action) => applyDoctorAction(record.id, action.key)} />
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <DoctorSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Doctor</Text>
          <Title level={2}>Shifokor ish stoli</Title>
          <Text>Bugungi qabullar, bemor ogohlantirishlari va tibbiy yozuvlar bilan ishlash.</Text>
        </div>
        <Space wrap>
          <Button icon={<FileTextOutlined />}>Tibbiy hujjatlar</Button>
          <Button type="primary" icon={<PlayCircleOutlined />}>
            Keyingi bemor
          </Button>
        </Space>
      </div>

      <Row gutter={[10, 10]} className="kpi-strip">
        <Col xs={24} sm={12} lg={5}>
          <Card size="small"><Statistic title="Bugungi qabullar" value={metrics.today} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={5}>
          <Card size="small"><Statistic title="Kutmoqda" value={metrics.waiting} valueStyle={{ color: "#b45309" }} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={5}>
          <Card size="small"><Statistic title="Qabulda" value={metrics.inProgress} valueStyle={{ color: "#1d4ed8" }} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={5}>
          <Card size="small"><Statistic title="Yakunlangan" value={metrics.completed} valueStyle={{ color: "#047857" }} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={4}>
          <Card size="small"><Statistic title="Ogohlantirish" value={metrics.needsAttention} valueStyle={{ color: "#b91c1c" }} /></Card>
        </Col>
      </Row>

      <Alert
        showIcon
        type="info"
        message="Tibbiy yozuv yakunlangandan keyin lock qilinadi. O'zgarishlar auditga yoziladi."
        className="compact-alert"
      />

      <Card size="small" className="table-card">
        <Table
          rowKey="id"
          size="small"
          columns={columns}
          dataSource={rows}
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 20 }}
        />
      </Card>
    </Space>
  );
}
