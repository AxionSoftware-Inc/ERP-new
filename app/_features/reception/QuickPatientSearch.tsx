"use client";

import Link from "next/link";
import { Button, Input, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { formatDateTime, formatMoney, getReceptionPatientSearchRows } from "./receptionData";

const { Text } = Typography;

type PatientSearchRow = ReturnType<typeof getReceptionPatientSearchRows>[number];

export function QuickPatientSearch({ onCreatePatient }: { onCreatePatient?: () => void }) {
  const rows = getReceptionPatientSearchRows();

  const columns: ColumnsType<PatientSearchRow> = [
    { title: "Karta", dataIndex: "patientNumber", width: 110 },
    {
      title: "Bemor",
      dataIndex: "name",
      width: 180,
      render: (value: string, record) => (
        <Space direction="vertical" size={0}>
          <Link href={`/patients/${record.id}`}>{value}</Link>
          <Text type="secondary">{record.phone}</Text>
        </Space>
      ),
    },
    {
      title: "Oxirgi qabul",
      dataIndex: "lastAppointmentAt",
      width: 135,
      render: (value?: string) => (value ? formatDateTime(value) : "-"),
    },
    {
      title: "Qarzdorlik",
      dataIndex: "debtAmount",
      width: 120,
      render: (value: number) => (value > 0 ? <Tag color="red">{formatMoney(value)}</Tag> : <Tag color="green">Yo&apos;q</Tag>),
    },
    {
      title: "Action",
      width: 160,
      render: (_, record) => (
        <Space>
          <Link href={`/reception/appointments/new?patient=${record.id}`}>Qabul</Link>
          <Link href={`/patients/${record.id}`}>Karta</Link>
        </Space>
      ),
    },
  ];

  return (
    <section className="surface-panel">
      <div className="surface-panel-header">
        <div>
          <strong>Tez bemor qidirish</strong>
          <Text type="secondary">F.I.Sh, telefon yoki karta raqami orqali.</Text>
        </div>
        <Button size="small" icon={<UserAddOutlined />} onClick={onCreatePatient}>
          Tez bemor
        </Button>
      </div>
      <Space direction="vertical" size={10} style={{ width: "100%" }}>
        <Input prefix={<SearchOutlined />} placeholder="F.I.Sh, telefon yoki karta raqami" />
        <Table
          rowKey="id"
          size="small"
          columns={columns}
          dataSource={rows}
          pagination={false}
          scroll={{ x: 760 }}
        />
      </Space>
    </section>
  );
}
