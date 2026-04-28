"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Card, Col, Progress, Row, Space, Statistic, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CreditCardOutlined } from "@ant-design/icons";
import { ActionButton, ActionDropdown, type PanelAction } from "../../_components/ActionDrawer";
import { cashierActions } from "../../_lib/panelActions";
import type { InvoiceRow } from "./cashierData";
import { formatMoney, getCashierMetrics, getInvoices } from "./cashierData";
import { InvoiceStatusTag } from "./InvoiceStatusTag";
import { CashierSubnav } from "./CashierSubnav";

const { Text, Title } = Typography;

export function CashierWorkbench() {
  const [invoices, setInvoices] = useState(() => getInvoices());
  const metrics = {
    revenue: invoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0),
    cash: getCashierMetrics().cash,
    card: getCashierMetrics().card,
    debt: invoices.reduce((sum, invoice) => sum + invoice.debtAmount, 0),
    waiting: invoices.filter((invoice) => invoice.status === "ISSUED").length,
    billed: invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0),
    discount: invoices.reduce((sum, invoice) => sum + invoice.discountAmount, 0),
    averageInvoice: invoices.length ? Math.round(invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0) / invoices.length) : 0,
  };
  const collectionRate = metrics.billed ? Math.round((metrics.revenue / metrics.billed) * 100) : 0;
  function applyCashierAction(id: string, key: string) {
    setInvoices((current) =>
      current.map((invoice) => {
        if (invoice.id !== id) return invoice;
        if (key === "pay") return { ...invoice, paidAmount: invoice.totalAmount, debtAmount: 0, status: "PAID" };
        if (key === "discount") {
          const nextTotal = Math.max(invoice.totalAmount - 50000, 0);
          return { ...invoice, discountAmount: invoice.discountAmount + 50000, totalAmount: nextTotal, debtAmount: Math.max(nextTotal - invoice.paidAmount, 0), status: invoice.paidAmount >= nextTotal ? "PAID" : "PARTIALLY_PAID" };
        }
        if (key === "refund") return { ...invoice, status: "REFUNDED" };
        if (key === "cancel") return { ...invoice, status: "CANCELLED" };
        return invoice;
      }),
    );
  }
  const columns: ColumnsType<InvoiceRow> = [
    { title: "Invoice", dataIndex: "invoiceNumber", width: 155 },
    { title: "Bemor", dataIndex: "patientName", width: 190 },
    { title: "Xizmatlar", dataIndex: "serviceNames", width: 260, render: (items: string[]) => <Space wrap>{items.map((item) => <Tag key={item}>{item}</Tag>)}</Space> },
    { title: "Summa", dataIndex: "totalAmount", width: 120, render: (value: number) => formatMoney(value) },
    { title: "To'langan", dataIndex: "paidAmount", width: 120, render: (value: number) => formatMoney(value) },
    { title: "Qarz", dataIndex: "debtAmount", width: 120, render: (value: number) => <Tag color={value > 0 ? "red" : "green"}>{formatMoney(value)}</Tag> },
    { title: "Status", dataIndex: "status", width: 130, render: (_, record) => <InvoiceStatusTag status={record.status} /> },
    {
      title: "Keyingi amal",
      width: 210,
      render: (_, record) => {
        const primaryAction = getCashierPrimaryAction(record);
        return (
          <Space className="workflow-action-row">
            {primaryAction ? (
              primaryAction.key === "pay" ? (
                <Link href="/cashier/payments/new"><Button size="small" type="primary">To&apos;lov qabul qilish</Button></Link>
              ) : (
                <ActionButton action={primaryAction} size="small" onSubmit={(action) => applyCashierAction(record.id, action.key)}>
                  {primaryAction.label}
                </ActionButton>
              )
            ) : (
              <span className="secondary-link">Yopilgan</span>
            )}
            <ActionDropdown actions={cashierActions} onSubmit={(action) => applyCashierAction(record.id, action.key)} />
          </Space>
        );
      },
    },
  ];
  const debtColumns: ColumnsType<InvoiceRow> = [
    { title: "Invoice", dataIndex: "invoiceNumber", width: 155 },
    { title: "Bemor", dataIndex: "patientName", width: 190 },
    { title: "Telefon", dataIndex: "patientPhone", width: 145 },
    { title: "Qarz", dataIndex: "debtAmount", width: 125, render: (value: number) => <Tag color="red">{formatMoney(value)}</Tag> },
    {
      title: "Keyingi amal",
      width: 150,
      render: (_, record) => (
        <Space className="workflow-action-row">
          <Link href="/cashier/payments/new"><Button size="small" type="primary">To&apos;lash</Button></Link>
          <ActionDropdown actions={cashierActions} onSubmit={(action) => applyCashierAction(record.id, action.key)} />
        </Space>
      ),
    },
  ];
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <CashierSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div><Text type="secondary">Cashier</Text><Title level={2}>Kassa ish stoli</Title><Text>To&apos;lovlar, qarzdorlik va kunlik tushum.</Text></div>
        <Link href="/cashier/payments/new"><Button type="primary" icon={<CreditCardOutlined />}>To&apos;lov yaratish</Button></Link>
      </div>
      <Row gutter={[10, 10]} className="kpi-strip">
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Tushum" value={metrics.revenue} formatter={(v) => formatMoney(Number(v))} /></Card></Col>
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Naqd" value={metrics.cash} formatter={(v) => formatMoney(Number(v))} /></Card></Col>
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Karta" value={metrics.card} formatter={(v) => formatMoney(Number(v))} /></Card></Col>
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Qarzdorlik" value={metrics.debt} formatter={(v) => formatMoney(Number(v))} valueStyle={{ color: "#b91c1c" }} /></Card></Col>
        <Col xs={24} sm={12} lg={4}><Card size="small"><Statistic title="Kutmoqda" value={metrics.waiting} /></Card></Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col xs={24} lg={6}>
          <section className="surface-panel">
            <div className="surface-panel-header">
              <div>
                <strong>Yig&apos;im ko&apos;rsatkichi</strong>
                <Text type="secondary">Hisoblangan summadan qancha undirildi.</Text>
              </div>
            </div>
            <Progress type="dashboard" percent={collectionRate} strokeColor={collectionRate >= 90 ? "#047857" : "#b45309"} />
            <Space direction="vertical" size={4} style={{ width: "100%" }}>
              <Text>Hisoblangan: {formatMoney(metrics.billed)}</Text>
              <Text>Undirilgan: {formatMoney(metrics.revenue)}</Text>
              <Text type="danger">Qolgan qarz: {formatMoney(metrics.debt)}</Text>
            </Space>
          </section>
        </Col>
        <Col xs={24} lg={6}>
          <Card size="small" title="Kassa KPI">
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Statistic title="O'rtacha invoice" value={metrics.averageInvoice} formatter={(v) => formatMoney(Number(v))} />
              <Statistic title="Chegirmalar" value={metrics.discount} formatter={(v) => formatMoney(Number(v))} valueStyle={{ color: "#b45309" }} />
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card size="small" title="Qarzdorlik navbati" className="table-card">
            <Table rowKey="id" size="small" columns={debtColumns} dataSource={invoices.filter((invoice) => invoice.debtAmount > 0)} scroll={{ x: "max-content" }} pagination={false} />
          </Card>
        </Col>
      </Row>
      <Card size="small" title="Invoice boshqaruvi" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={invoices} scroll={{ x: "max-content" }} pagination={{ pageSize: 20 }} /></Card>
    </Space>
  );
}

function getCashierPrimaryAction(record: InvoiceRow): PanelAction | null {
  if (record.status === "CANCELLED" || record.status === "REFUNDED") return null;
  if (record.debtAmount > 0 || record.status === "ISSUED" || record.status === "PARTIALLY_PAID") return { ...cashierActions[0], primary: true };
  if (record.status === "PAID") return { ...cashierActions[1], primary: true };
  return null;
}
