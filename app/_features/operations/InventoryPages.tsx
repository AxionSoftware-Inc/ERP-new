"use client";

import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Space, Statistic, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatMoney } from "../reception/receptionData";
import { formatDate, inventoryItems, stockMovements } from "./operationsData";
import { OperationsSubnav } from "./OperationsSubnav";

const { Text, Title } = Typography;

export function InventoryOverviewPage() {
  const lowStock = inventoryItems.filter((item) => item.status === "LOW_STOCK").length;
  const expiring = inventoryItems.filter((item) => item.status === "EXPIRING").length;
  const columns: ColumnsType<(typeof stockMovements)[number]> = [
    { title: "Mahsulot", dataIndex: "itemName", width: 220 },
    { title: "Turi", dataIndex: "type", width: 90, render: (value: string) => <Tag color={value === "IN" ? "green" : "orange"}>{value}</Tag> },
    { title: "Miqdor", dataIndex: "quantity", width: 100 },
    { title: "Bo'lim", dataIndex: "department", width: 150 },
    { title: "Mas'ul", dataIndex: "actor", width: 160 },
    { title: "Vaqt", dataIndex: "createdAt", width: 145, render: (value: string) => formatDate(value) },
  ];

  return (
    <Shell title="Ombor boshqaruvi" description="Zaxira, kam qoldiq, yaroqlilik muddati va stock movement nazorati.">
      <Row gutter={[10, 10]} className="kpi-strip">
        <Col xs={24} sm={12} lg={6}><Card size="small"><Statistic title="Mahsulotlar" value={inventoryItems.length} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card size="small"><Statistic title="Kam qoldiq" value={lowStock} valueStyle={{ color: "#b91c1c" }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card size="small"><Statistic title="Muddati yaqin" value={expiring} valueStyle={{ color: "#b45309" }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card size="small"><Statistic title="Bugungi movement" value={stockMovements.length} /></Card></Col>
      </Row>
      <Card size="small" title="So'nggi stock movementlar" className="table-card">
        <Table rowKey="id" size="small" columns={columns} dataSource={stockMovements} scroll={{ x: "max-content" }} pagination={false} />
      </Card>
    </Shell>
  );
}

export function InventoryItemsPage() {
  const columns: ColumnsType<(typeof inventoryItems)[number]> = [
    { title: "SKU", dataIndex: "sku", width: 150 },
    { title: "Nomi", dataIndex: "name", width: 220 },
    { title: "Kategoriya", dataIndex: "category", width: 140 },
    { title: "Qoldiq", dataIndex: "stock", width: 100 },
    { title: "Minimum", dataIndex: "minStock", width: 100 },
    { title: "Muddati", dataIndex: "expiryDate", width: 130, render: (value: string) => formatDate(value) },
    { title: "Status", dataIndex: "status", width: 130, render: (value: string) => <Tag color={value === "OK" ? "green" : value === "LOW_STOCK" ? "red" : "orange"}>{value}</Tag> },
  ];

  return (
    <Shell title="Ombor mahsulotlari" description="SKU, kategoriya, zaxira limiti va yaroqlilik muddati.">
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={inventoryItems} scroll={{ x: "max-content" }} pagination={false} /></Card>
    </Shell>
  );
}

export function StockInPage() {
  return (
    <Shell title="Ombor kirim" description="Yetkazib beruvchidan kelgan mahsulotlarni partiya bilan qabul qilish.">
      <MovementForm type="IN" />
    </Shell>
  );
}

export function StockOutPage() {
  return (
    <Shell title="Ombor chiqim" description="Bo'limlarga sarflangan mahsulotlarni sabab va mas'ul bilan qayd qilish.">
      <MovementForm type="OUT" />
    </Shell>
  );
}

function MovementForm({ type }: { type: "IN" | "OUT" }) {
  return (
    <Card size="small" title={type === "IN" ? "Kirim ma'lumotlari" : "Chiqim ma'lumotlari"}>
      <Form layout="vertical" className="dense-form">
        <div className="form-grid">
          <Form.Item label="Mahsulot" required><Select showSearch options={inventoryItems.map((item) => ({ label: `${item.sku} - ${item.name}`, value: item.id }))} /></Form.Item>
          <Form.Item label="Miqdor" required><InputNumber min={1} style={{ width: "100%" }} /></Form.Item>
          <Form.Item label={type === "IN" ? "Narx" : "Bo'lim"}>{type === "IN" ? <Input placeholder={formatMoney(0)} /> : <Select options={[{ label: "Laboratoriya", value: "lab" }, { label: "Terapiya", value: "therapy" }]} />}</Form.Item>
          <Form.Item label="Partiya"><Input /></Form.Item>
          <Form.Item label="Yaroqlilik muddati"><Input placeholder="2026-12-31" /></Form.Item>
          <Form.Item label="Mas'ul"><Input /></Form.Item>
        </div>
        <Form.Item label="Izoh"><Input.TextArea rows={3} /></Form.Item>
        <Space><Button type="primary">Saqlash</Button><Button>Draft</Button></Space>
      </Form>
    </Card>
  );
}

function Shell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <OperationsSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Operations</Text>
          <Title level={2}>{title}</Title>
          <Text>{description}</Text>
        </div>
      </div>
      {children}
    </Space>
  );
}
