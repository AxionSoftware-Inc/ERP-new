"use client";

import Link from "next/link";
import { Button, Card, Form, Input, Select, Space, Typography } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { ActionButton } from "../../_components/ActionDrawer";
import { cashierActions } from "../../_lib/panelActions";
import { getInvoices } from "./cashierData";
import { CashierSubnav } from "./CashierSubnav";

const { Text, Title } = Typography;

export function NewPaymentPage() {
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <CashierSubnav />
      <div className="erp-ant-page-header reception-command-header"><div><Text type="secondary">Cashier</Text><Title level={2}>To&apos;lov yaratish</Title><Text>Invoice tanlash, to&apos;lov usuli va summani kiritish.</Text></div></div>
      <Card size="small" title="To'lov ma'lumotlari">
        <Form layout="vertical" className="dense-form">
          <div className="form-grid">
            <Form.Item label="Invoice" required><Select showSearch options={getInvoices().map((invoice) => ({ label: `${invoice.invoiceNumber} - ${invoice.patientName}`, value: invoice.id }))} /></Form.Item>
            <Form.Item label="To'lov usuli" required><Select options={[{ label: "Naqd", value: "CASH" }, { label: "Karta", value: "CARD" }, { label: "Bank", value: "BANK_TRANSFER" }]} /></Form.Item>
            <Form.Item label="Summa" required><Input placeholder="0" /></Form.Item>
          </div>
          <Form.Item label="Izoh"><Input.TextArea rows={3} /></Form.Item>
          <Space><ActionButton action={{ ...cashierActions[0], label: "To'lovni saqlash", primary: true }} icon={<SaveOutlined />}>To&apos;lovni saqlash</ActionButton><ActionButton action={cashierActions[1]}>Chek chiqarish</ActionButton><Link href="/cashier"><Button>Orqaga</Button></Link></Space>
        </Form>
      </Card>
    </Space>
  );
}
