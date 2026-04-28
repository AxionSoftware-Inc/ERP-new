"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ActionDropdown } from "../../_components/ActionDrawer";
import { cashierActions } from "../../_lib/panelActions";
import { formatDateTime, formatMoney, getPaymentRows } from "./cashierData";
import { CashierSubnav } from "./CashierSubnav";

const { Text, Title } = Typography;
type PaymentRow = ReturnType<typeof getPaymentRows>[number];

export function PaymentsPage() {
  const [rows, setRows] = useState(() => getPaymentRows());
  function applyPaymentAction(id: string, key: string) {
    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row;
        if (key === "refund") return { ...row, status: "REFUNDED" };
        if (key === "cancel") return { ...row, status: "CANCELLED" };
        return row;
      }),
    );
  }
  const columns: ColumnsType<PaymentRow> = [
    { title: "Payment", dataIndex: "paymentNumber", width: 160 },
    { title: "Bemor", dataIndex: "patientName", width: 190 },
    { title: "Summa", dataIndex: "amount", width: 120, render: (value: number) => formatMoney(value) },
    { title: "Usul", dataIndex: "method", width: 120 },
    { title: "Kassir", dataIndex: "cashierName", width: 170 },
    { title: "Vaqt", dataIndex: "paidAt", width: 145, render: (value: string) => formatDateTime(value) },
    { title: "Status", dataIndex: "status", width: 120 },
    { title: "Action", width: 140, render: (_, record) => <Space><Link href={`/cashier/payments/${record.id}`}>Ochish</Link><ActionDropdown actions={cashierActions} onSubmit={(action) => applyPaymentAction(record.id, action.key)} /></Space> },
  ];
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <CashierSubnav />
      <div className="erp-ant-page-header"><div><Text type="secondary">Cashier</Text><Title level={2}>To&apos;lovlar ro&apos;yxati</Title><Text>Amalga oshirilgan to&apos;lovlar va chek holatlari.</Text></div></div>
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={rows} scroll={{ x: "max-content" }} pagination={{ pageSize: 20 }} /></Card>
    </Space>
  );
}
