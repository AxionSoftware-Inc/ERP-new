"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Card, Col, Row, Space, Statistic, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ActionButton, ActionDropdown, type PanelAction } from "../../_components/ActionDrawer";
import { labActions } from "../../_lib/panelActions";
import type { LabOrderRow } from "./labData";
import { formatDateTime, getLabOrders } from "./labData";
import { LabStatusTag } from "./LabStatusTag";
import { LabSubnav } from "./LabSubnav";

const { Text, Title } = Typography;

export function LabWorkbench() {
  const [rows, setRows] = useState(() => getLabOrders());
  const metrics = {
    total: rows.length,
    waitingSample: rows.filter((item) => item.status === "WAITING_SAMPLE" || item.status === "ORDERED").length,
    collected: rows.filter((item) => item.status === "SAMPLE_COLLECTED").length,
    inProgress: rows.filter((item) => item.status === "IN_PROGRESS").length,
    approval: rows.filter((item) => item.status === "READY_FOR_APPROVAL").length,
  };

  function applyLabAction(id: string, key: string) {
    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row;
        if (key === "sample") return { ...row, status: "SAMPLE_COLLECTED", sampleCollectedAt: new Date().toISOString() };
        if (key === "approve") return { ...row, status: "READY_FOR_APPROVAL" };
        if (key === "reject") return { ...row, status: "IN_PROGRESS" };
        if (key === "cancel") return { ...row, status: "CANCELLED" };
        return row;
      }),
    );
  }

  const columns: ColumnsType<LabOrderRow> = [
    { title: "Order", dataIndex: "orderNumber", width: 150 },
    {
      title: "Bemor",
      dataIndex: "patientName",
      width: 200,
      render: (value: string, record) => (
        <Space direction="vertical" size={0}>
          <span>{value}</span>
          <Text type="secondary">{record.patientPhone}</Text>
        </Space>
      ),
    },
    {
      title: "Tahlillar",
      dataIndex: "testNames",
      width: 260,
      render: (tests: string[]) => <Space wrap>{tests.map((test) => <Tag key={test}>{test}</Tag>)}</Space>,
    },
    { title: "Shifokor", dataIndex: "doctorName", width: 160 },
    { title: "Vaqt", dataIndex: "orderedAt", width: 145, render: (value: string) => formatDateTime(value) },
    { title: "Status", dataIndex: "status", width: 150, render: (_, record) => <LabStatusTag status={record.status} /> },
    {
      title: "Keyingi amal",
      width: 220,
      render: (_, record) => {
        const primaryAction = getLabPrimaryAction(record);
        return (
          <Space className="workflow-action-row">
            {primaryAction ? (
              primaryAction.key === "result" ? (
                <Link href={`/laboratory/orders/${record.id}/results`}><Button size="small" type="primary">Natija kiritish</Button></Link>
              ) : (
                <ActionButton action={primaryAction} size="small" onSubmit={(action) => applyLabAction(record.id, action.key)}>
                  {primaryAction.label}
                </ActionButton>
              )
            ) : (
              <Link className="secondary-link" href={`/laboratory/orders/${record.id}`}>Tafsilot</Link>
            )}
            <ActionDropdown actions={labActions} onSubmit={(action) => applyLabAction(record.id, action.key)} />
          </Space>
        );
      },
    },
  ];

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <LabSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Laboratory</Text>
          <Title level={2}>Laboratoriya ish stoli</Title>
          <Text>Namuna olish, tahlil bajarish va natijalarni tasdiqlashga tayyorlash.</Text>
        </div>
        <ActionDropdown actions={labActions} buttonLabel="Amallar" />
      </div>

      <Row gutter={[10, 10]} className="kpi-strip">
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Orderlar" value={metrics.total} /></Card></Col>
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Namuna kutmoqda" value={metrics.waitingSample} valueStyle={{ color: "#b45309" }} /></Card></Col>
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Namuna olindi" value={metrics.collected} valueStyle={{ color: "#0891b2" }} /></Card></Col>
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Jarayonda" value={metrics.inProgress} valueStyle={{ color: "#1d4ed8" }} /></Card></Col>
        <Col xs={24} sm={12} lg={4}><Card size="small"><Statistic title="Tasdiq" value={metrics.approval} valueStyle={{ color: "#7c3aed" }} /></Card></Col>
      </Row>

      <Card size="small" className="table-card">
        <Table rowKey="id" size="small" columns={columns} dataSource={rows} scroll={{ x: "max-content" }} pagination={{ pageSize: 20 }} />
      </Card>
    </Space>
  );
}

function getLabPrimaryAction(record: LabOrderRow): PanelAction | null {
  if (record.status === "ORDERED" || record.status === "WAITING_SAMPLE") return { ...labActions[0], primary: true };
  if (record.status === "SAMPLE_COLLECTED" || record.status === "IN_PROGRESS") return { key: "result", label: "Natija kiritish", primary: true };
  if (record.status === "READY_FOR_APPROVAL") return { ...labActions[2], primary: true };
  return null;
}
