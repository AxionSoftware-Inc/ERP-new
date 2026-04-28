"use client";

import { Button, Card, Empty, Input, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ActionDropdown } from "../../_components/ActionDrawer";
import { adminActions } from "../../_lib/panelActions";
import { formatDateTime, formatMoney, getPatientDetail } from "./patientData";
import { PatientSubnav } from "./PatientSubnav";

const { Text, Title } = Typography;

function Shell({ patientId, title, children }: { patientId: string; title: string; children: React.ReactNode }) {
  const detail = getPatientDetail(patientId);
  if (!detail) return <Card><Empty description="Bemor topilmadi" /></Card>;

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <PatientSubnav patientId={patientId} />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">{detail.patient.patientNumber}</Text>
          <Title level={2}>{title}</Title>
          <Text>{detail.patient.fullName}</Text>
        </div>
        <ActionDropdown actions={adminActions} buttonLabel="Amallar" />
      </div>
      {children}
    </Space>
  );
}

export function PatientPaymentsPage({ patientId }: { patientId: string }) {
  const detail = getPatientDetail(patientId);
  const rows = detail?.invoices ?? [];
  const columns: ColumnsType<(typeof rows)[number]> = [
    { title: "Invoice", dataIndex: "invoiceNumber", width: 160 },
    { title: "Total", dataIndex: "totalAmount", width: 130, render: (value: number) => formatMoney(value) },
    { title: "To'langan", dataIndex: "paidAmount", width: 130, render: (value: number) => formatMoney(value) },
    { title: "Qarz", dataIndex: "debtAmount", width: 130, render: (value: number) => <Tag color={value > 0 ? "red" : "green"}>{formatMoney(value)}</Tag> },
    { title: "Status", dataIndex: "status", width: 130 },
    { title: "Sana", dataIndex: "issuedAt", width: 145, render: (value: string) => formatDateTime(value) },
  ];

  return (
    <Shell patientId={patientId} title="Bemor to'lovlari">
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={rows} scroll={{ x: "max-content" }} pagination={false} /></Card>
    </Shell>
  );
}

export function PatientDocumentsPage({ patientId }: { patientId: string }) {
  const detail = getPatientDetail(patientId);
  const rows = detail?.documents ?? [];
  const columns: ColumnsType<(typeof rows)[number]> = [
    { title: "Raqam", dataIndex: "documentNumber", width: 170 },
    { title: "Turi", dataIndex: "documentType", width: 190 },
    { title: "Sarlavha", dataIndex: "title", width: 240 },
    { title: "Status", dataIndex: "status", width: 120, render: (value: string) => <Tag color={value === "SIGNED" ? "green" : "blue"}>{value}</Tag> },
    { title: "Imzolangan", dataIndex: "signedAt", width: 145, render: (value?: string) => (value ? formatDateTime(value) : "-") },
  ];

  return (
    <Shell patientId={patientId} title="Bemor hujjatlari">
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={rows} scroll={{ x: "max-content" }} pagination={false} /></Card>
    </Shell>
  );
}

export function PatientNotesPage({ patientId }: { patientId: string }) {
  const rows = [
    { id: "note-001", type: "Reception", text: "Bemor takroriy qabul uchun telefon orqali ogohlantirilsin.", author: "registrar.madina", createdAt: "2026-04-27T10:20:00+05:00" },
    { id: "note-002", type: "Clinical", text: "Qon bosimi nazorati bo'yicha tavsiyalar berilgan.", author: "doctor.aziza", createdAt: "2026-04-27T09:25:00+05:00" },
  ];
  const columns: ColumnsType<(typeof rows)[number]> = [
    { title: "Turi", dataIndex: "type", width: 130, render: (value: string) => <Tag>{value}</Tag> },
    { title: "Matn", dataIndex: "text" },
    { title: "Muallif", dataIndex: "author", width: 160 },
    { title: "Sana", dataIndex: "createdAt", width: 145, render: (value: string) => formatDateTime(value) },
  ];

  return (
    <Shell patientId={patientId} title="Ichki eslatmalar">
      <Card size="small" title="Yangi eslatma">
        <Space.Compact style={{ width: "100%" }}>
          <Input placeholder="Eslatma matni" />
          <Button type="primary">Qo&apos;shish</Button>
        </Space.Compact>
      </Card>
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={rows} pagination={false} /></Card>
    </Shell>
  );
}

export function PatientFilesPage({ patientId }: { patientId: string }) {
  const rows = [
    { id: "file-001", name: "Passport scan", category: "Identity", size: "1.2 MB", status: "VERIFIED", uploadedAt: "2026-04-27T08:35:00+05:00" },
    { id: "file-002", name: "UZI image", category: "Diagnostics", size: "4.8 MB", status: "ATTACHED", uploadedAt: "2026-04-27T11:15:00+05:00" },
  ];
  const columns: ColumnsType<(typeof rows)[number]> = [
    { title: "Fayl", dataIndex: "name", width: 220 },
    { title: "Kategoriya", dataIndex: "category", width: 150 },
    { title: "Hajm", dataIndex: "size", width: 100 },
    { title: "Status", dataIndex: "status", width: 130, render: (value: string) => <Tag>{value}</Tag> },
    { title: "Yuklangan", dataIndex: "uploadedAt", width: 145, render: (value: string) => formatDateTime(value) },
  ];

  return (
    <Shell patientId={patientId} title="Bemor fayllari">
      <Card size="small" title="Upload zonasi"><Button type="primary">Fayl biriktirish</Button></Card>
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={rows} pagination={false} /></Card>
    </Shell>
  );
}
