"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Card, Col, Row, Space, Statistic, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ScanOutlined } from "@ant-design/icons";
import { ActionButton, ActionDropdown, type PanelAction } from "../../_components/ActionDrawer";
import { diagnosticActions } from "../../_lib/panelActions";
import type { DiagnosticOrderRow } from "./diagnosticsData";
import { formatDateTime, getDiagnosticOrders } from "./diagnosticsData";
import { DiagnosticStatusTag } from "./DiagnosticStatusTag";
import { DiagnosticsSubnav } from "./DiagnosticsSubnav";

const { Text, Title } = Typography;

export function DiagnosticsWorkbench() {
  const [rows, setRows] = useState(() => getDiagnosticOrders());
  const metrics = {
    total: rows.length,
    scheduled: rows.filter((item) => item.status === "SCHEDULED").length,
    inProgress: rows.filter((item) => item.status === "IN_PROGRESS").length,
    ready: rows.filter((item) => item.status === "READY").length,
    approved: rows.filter((item) => item.status === "APPROVED").length,
  };
  function applyDiagnosticAction(id: string, key: string) {
    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row;
        if (key === "start") return { ...row, status: "IN_PROGRESS" };
        if (key === "conclusion") return { ...row, status: "READY", resultStatus: "DRAFT" };
        if (key === "approve") return { ...row, status: "APPROVED", resultStatus: "APPROVED" };
        if (key === "reschedule") return { ...row, status: "SCHEDULED" };
        if (key === "cancel") return { ...row, status: "CANCELLED" };
        return row;
      }),
    );
  }
  const columns: ColumnsType<DiagnosticOrderRow> = [
    { title: "Vaqt", dataIndex: "scheduledAt", width: 145, render: (value: string) => formatDateTime(value) },
    { title: "Bemor", dataIndex: "patientName", width: 190 },
    { title: "Tekshiruv", dataIndex: "serviceName", width: 220 },
    { title: "Mutaxassis", dataIndex: "specialistName", width: 170 },
    { title: "Status", dataIndex: "status", width: 145, render: (_, record) => <DiagnosticStatusTag status={record.status} /> },
    {
      title: "Keyingi amal",
      width: 220,
      render: (_, record) => {
        const primaryAction = getDiagnosticPrimaryAction(record);
        return (
          <Space className="workflow-action-row">
            {primaryAction ? (
              primaryAction.key === "conclusion" ? (
                <Link href={`/diagnostics/orders/${record.id}/conclusion`}><Button size="small" type="primary">Xulosa yozish</Button></Link>
              ) : (
                <ActionButton action={primaryAction} size="small" onSubmit={(action) => applyDiagnosticAction(record.id, action.key)}>
                  {primaryAction.label}
                </ActionButton>
              )
            ) : (
              <Link className="secondary-link" href={`/diagnostics/orders/${record.id}`}>Tafsilot</Link>
            )}
            <ActionDropdown actions={diagnosticActions} onSubmit={(action) => applyDiagnosticAction(record.id, action.key)} />
          </Space>
        );
      },
    },
  ];
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <DiagnosticsSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Diagnostics</Text>
          <Title level={2}>Diagnostika ish stoli</Title>
          <Text>Instrumental tekshiruvlar jadvali, statusi va xulosalar.</Text>
        </div>
        <ActionButton action={diagnosticActions[0]} icon={<ScanOutlined />}>Tekshiruvni boshlash</ActionButton>
      </div>
      <Row gutter={[10, 10]} className="kpi-strip">
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Buyurtmalar" value={metrics.total} /></Card></Col>
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Rejalangan" value={metrics.scheduled} /></Card></Col>
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Jarayonda" value={metrics.inProgress} valueStyle={{ color: "#1d4ed8" }} /></Card></Col>
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Tayyor" value={metrics.ready} valueStyle={{ color: "#7c3aed" }} /></Card></Col>
        <Col xs={24} sm={12} lg={4}><Card size="small"><Statistic title="Tasdiq" value={metrics.approved} valueStyle={{ color: "#047857" }} /></Card></Col>
      </Row>
      <Card size="small" className="table-card">
        <Table rowKey="id" size="small" columns={columns} dataSource={rows} scroll={{ x: "max-content" }} pagination={{ pageSize: 20 }} />
      </Card>
    </Space>
  );
}

function getDiagnosticPrimaryAction(record: DiagnosticOrderRow): PanelAction | null {
  if (record.status === "ORDERED" || record.status === "SCHEDULED") return { ...diagnosticActions[0], primary: true };
  if (record.status === "IN_PROGRESS") return { ...diagnosticActions[1], primary: true };
  if (record.status === "READY") return { ...diagnosticActions[2], primary: true };
  return null;
}
