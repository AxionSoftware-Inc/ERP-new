"use client";

import { Button, Card, Form, Input, Select, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatMoney } from "../reception/receptionData";
import { formatDate, purchaseOrders, purchaseRequests, suppliers } from "./operationsData";
import { OperationsSubnav } from "./OperationsSubnav";

const { Text, Title } = Typography;

export function PurchaseRequestsPage() {
  const columns: ColumnsType<(typeof purchaseRequests)[number]> = [
    { title: "So'rov", dataIndex: "number", width: 170 },
    { title: "Bo'lim", dataIndex: "department", width: 150 },
    { title: "So'ragan", dataIndex: "requester", width: 170 },
    { title: "Kerakli sana", dataIndex: "requiredDate", width: 130, render: (value: string) => formatDate(value) },
    { title: "Sabab", dataIndex: "reason", width: 260 },
    { title: "Status", dataIndex: "status", width: 150, render: (value: string) => <Tag color={value === "APPROVED" ? "green" : "orange"}>{value}</Tag> },
  ];

  return (
    <Shell title="Xarid so'rovlari" description="Bo'limlardan kelgan xarid ehtiyojlari va tasdiqlash navbati.">
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={purchaseRequests} scroll={{ x: "max-content" }} pagination={false} /></Card>
    </Shell>
  );
}

export function PurchaseOrdersPage() {
  const columns: ColumnsType<(typeof purchaseOrders)[number]> = [
    { title: "Buyurtma", dataIndex: "number", width: 170 },
    { title: "Yetkazib beruvchi", dataIndex: "supplierName", width: 190 },
    { title: "Summa", dataIndex: "amount", width: 140, render: (value: number) => formatMoney(value) },
    { title: "Buyurtma sana", dataIndex: "orderedAt", width: 130, render: (value: string) => formatDate(value) },
    { title: "Kutilgan sana", dataIndex: "expectedAt", width: 130, render: (value: string) => formatDate(value) },
    { title: "Status", dataIndex: "status", width: 160, render: (value: string) => <Tag>{value}</Tag> },
  ];

  return (
    <Shell title="Xarid buyurtmalari" description="Yetkazib beruvchilar, summa, kutilgan sana va qabul holati.">
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={purchaseOrders} scroll={{ x: "max-content" }} pagination={false} /></Card>
    </Shell>
  );
}

export function SuppliersPage() {
  const columns: ColumnsType<(typeof suppliers)[number]> = [
    { title: "Nomi", dataIndex: "name", width: 200 },
    { title: "Telefon", dataIndex: "phone", width: 150 },
    { title: "Email", dataIndex: "email", width: 180 },
    { title: "STIR", dataIndex: "taxId", width: 130 },
    { title: "Qarzdorlik", dataIndex: "debt", width: 130, render: (value: number) => <Tag color={value > 0 ? "red" : "green"}>{formatMoney(value)}</Tag> },
    { title: "Status", dataIndex: "status", width: 110, render: (value: string) => <Tag color="green">{value}</Tag> },
  ];

  return (
    <Shell title="Yetkazib beruvchilar" description="Medikament, reagent va sarf materiallari yetkazib beruvchilari.">
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={suppliers} scroll={{ x: "max-content" }} pagination={false} /></Card>
      <Card size="small" title="Yangi yetkazib beruvchi">
        <Form layout="vertical" className="dense-form">
          <div className="form-grid">
            <Form.Item label="Nomi"><Input /></Form.Item>
            <Form.Item label="Telefon"><Input /></Form.Item>
            <Form.Item label="Kategoriya"><Select options={[{ label: "Tibbiy material", value: "medical" }, { label: "Laboratoriya", value: "lab" }]} /></Form.Item>
          </div>
          <Button type="primary">Qo&apos;shish</Button>
        </Form>
      </Card>
    </Shell>
  );
}

function Shell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <OperationsSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Purchases</Text>
          <Title level={2}>{title}</Title>
          <Text>{description}</Text>
        </div>
      </div>
      {children}
    </Space>
  );
}
