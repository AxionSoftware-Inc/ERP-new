"use client";

import { Button, Card, DatePicker, Input, Select, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import type { LabOrderRow } from "./labData";
import { formatDateTime, getLabOrders, labStatusLabels } from "./labData";
import { LabStatusTag } from "./LabStatusTag";
import { LabSubnav } from "./LabSubnav";
import Link from "next/link";

const { RangePicker } = DatePicker;
const { Text, Title } = Typography;

export function LabOrdersPage() {
  const rows = getLabOrders();

  const columns: ColumnsType<LabOrderRow> = [
    { title: "Order", dataIndex: "orderNumber", width: 150 },
    { title: "Bemor", dataIndex: "patientName", width: 190 },
    { title: "Telefon", dataIndex: "patientPhone", width: 140 },
    { title: "Tahlil soni", dataIndex: "testNames", width: 110, render: (tests: string[]) => tests.length },
    { title: "Shifokor", dataIndex: "doctorName", width: 160 },
    { title: "Buyurtma vaqti", dataIndex: "orderedAt", width: 145, render: (value: string) => formatDateTime(value) },
    { title: "Status", dataIndex: "status", width: 150, render: (_, record) => <LabStatusTag status={record.status} /> },
    { title: "Action", width: 150, render: (_, record) => <Space><Link href={`/laboratory/orders/${record.id}`}>Ochish</Link><Link href={`/laboratory/orders/${record.id}/results`}>Natija</Link></Space> },
  ];

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <LabSubnav />
      <div className="erp-ant-page-header">
        <div>
          <Text type="secondary">Laboratory</Text>
          <Title level={2}>Laboratoriya buyurtmalari</Title>
          <Text>Barcha orderlarni status, sana, bemor va tahlil turi bo&apos;yicha boshqarish.</Text>
        </div>
      </div>
      <Card size="small" className="filter-card">
        <Space wrap>
          <Input prefix={<SearchOutlined />} placeholder="Order, bemor yoki telefon" style={{ width: 260 }} />
          <RangePicker />
          <Select
            allowClear
            placeholder="Status"
            style={{ width: 200 }}
            options={Object.entries(labStatusLabels).map(([value, label]) => ({ value, label }))}
          />
          <Button>Filterlarni tozalash</Button>
        </Space>
      </Card>
      <Card size="small" className="table-card">
        <Table rowKey="id" size="small" columns={columns} dataSource={rows} scroll={{ x: "max-content" }} pagination={{ pageSize: 20 }} />
      </Card>
    </Space>
  );
}
