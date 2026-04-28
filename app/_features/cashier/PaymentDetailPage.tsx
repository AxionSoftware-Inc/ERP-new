"use client";

import Link from "next/link";
import { Button, Card, Descriptions, Empty, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PrinterOutlined } from "@ant-design/icons";
import { ActionButton } from "../../_components/ActionDrawer";
import { cashierActions } from "../../_lib/panelActions";
import { formatDateTime, formatMoney, getPaymentDetail } from "./cashierData";
import { CashierSubnav } from "./CashierSubnav";
import { InvoiceStatusTag } from "./InvoiceStatusTag";

const { Text, Title } = Typography;

export function PaymentDetailPage({ paymentId }: { paymentId: string }) {
  const detail = getPaymentDetail(paymentId);
  if (!detail) return <Card><Empty description="To'lov topilmadi" /></Card>;
  const columns: ColumnsType<(typeof detail.items)[number]> = [
    { title: "Xizmat", dataIndex: "serviceName" },
    { title: "Soni", dataIndex: "quantity", width: 90 },
    { title: "Narx", dataIndex: "unitPrice", width: 120, render: (value: number) => formatMoney(value) },
    { title: "Total", dataIndex: "totalPrice", width: 120, render: (value: number) => formatMoney(value) },
  ];
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <CashierSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Payment detail</Text>
          <Title level={2}>{detail.payment.paymentNumber}</Title>
          <Space wrap><Tag color="green">{detail.payment.status}</Tag>{detail.invoice ? <InvoiceStatusTag status={detail.invoice.status} /> : null}</Space>
        </div>
        <Space><ActionButton action={cashierActions[1]} icon={<PrinterOutlined />}>Chek</ActionButton><ActionButton action={cashierActions[3]}>Qaytarim</ActionButton></Space>
      </div>
      <Card size="small" title="To'lov ma'lumoti">
        <Descriptions bordered size="small" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Bemor">{detail.payment.patientName}</Descriptions.Item>
          <Descriptions.Item label="Kassir">{detail.payment.cashierName}</Descriptions.Item>
          <Descriptions.Item label="Vaqt">{formatDateTime(detail.payment.paidAt)}</Descriptions.Item>
          <Descriptions.Item label="Summa">{formatMoney(detail.payment.amount)}</Descriptions.Item>
          <Descriptions.Item label="Usul">{detail.payment.method}</Descriptions.Item>
          <Descriptions.Item label="Invoice">{detail.invoice?.invoiceNumber ?? "-"}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card size="small" title="Invoice xizmatlari">
        <Table rowKey="id" size="small" columns={columns} dataSource={detail.items} pagination={false} />
      </Card>
      <Link href="/cashier/payments"><Button>To&apos;lovlarga qaytish</Button></Link>
    </Space>
  );
}
