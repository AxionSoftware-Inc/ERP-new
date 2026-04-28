"use client";

import Link from "next/link";
import { Button, Card, Input, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { ActionDropdown } from "../../_components/ActionDrawer";
import { adminActions } from "../../_lib/panelActions";
import type { PatientRow } from "./patientData";
import { formatDateTime, formatMoney, getPatientRows } from "./patientData";

const { Text, Title } = Typography;

export function PatientsPage() {
  const rows = getPatientRows();
  const columns: ColumnsType<PatientRow> = [
    { title: "Karta", dataIndex: "patientNumber", width: 110 },
    {
      title: "Bemor",
      dataIndex: "fullName",
      width: 210,
      render: (value: string, record) => (
        <Space direction="vertical" size={0}>
          <Link href={`/patients/${record.id}`}>{value}</Link>
          <Text type="secondary">{record.phone}</Text>
        </Space>
      ),
    },
    { title: "Yosh", dataIndex: "age", width: 80 },
    { title: "Qabullar", dataIndex: "appointmentCount", width: 100 },
    { title: "Oxirgi qabul", dataIndex: "lastAppointmentAt", width: 145, render: (value?: string) => (value ? formatDateTime(value) : "-") },
    { title: "Qarzdorlik", dataIndex: "debtAmount", width: 130, render: (value: number) => <Tag color={value > 0 ? "red" : "green"}>{formatMoney(value)}</Tag> },
    { title: "Status", dataIndex: "status", width: 110, render: (value: string) => <Tag color="green">{value}</Tag> },
    { title: "Action", width: 170, render: (_, record) => <Space><Link href={`/reception/appointments/new?patient=${record.id}`}>Qabulga yozish</Link><ActionDropdown actions={adminActions} /></Space> },
  ];
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <div className="erp-ant-page-header reception-command-header">
        <div><Text type="secondary">Patients</Text><Title level={2}>Bemorlar bazasi</Title><Text>Yagona bemor kartalari, qarzdorlik va tibbiy tarixga kirish.</Text></div>
        <Link href="/patients/new"><Button type="primary" icon={<PlusOutlined />}>Yangi bemor</Button></Link>
      </div>
      <Card size="small" className="filter-card"><Input prefix={<SearchOutlined />} placeholder="F.I.Sh, telefon yoki karta raqami" style={{ maxWidth: 360 }} /></Card>
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={rows} scroll={{ x: "max-content" }} pagination={{ pageSize: 20 }} /></Card>
    </Space>
  );
}
