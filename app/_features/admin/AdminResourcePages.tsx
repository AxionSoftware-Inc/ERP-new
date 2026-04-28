"use client";

import Link from "next/link";
import { Card, Descriptions, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ActionDropdown } from "../../_components/ActionDrawer";
import { adminActions } from "../../_lib/panelActions";
import {
  auditLogs,
  departments,
  medicalDocuments,
  patients,
  roles,
  serviceCategories,
  services,
  staffMembers,
  users,
} from "../../_data/fakeClinicData";
import { formatDateTime, formatMoney } from "../reception/receptionData";

const { Text, Title } = Typography;

type SimpleRecord = Record<string, string | number | React.ReactNode>;

function ResourceShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">{eyebrow}</Text>
          <Title level={2}>{title}</Title>
          <Text>{description}</Text>
        </div>
        <ActionDropdown actions={adminActions} buttonLabel="Amallar" />
      </div>
      {children}
    </Space>
  );
}

export function ServicesPage() {
  const rows = services.map((service) => ({
    ...service,
    categoryName: serviceCategories.find((item) => item.id === service.categoryId)?.name ?? "-",
    departmentName: departments.find((item) => item.id === service.departmentId)?.name ?? "-",
  }));
  const columns: ColumnsType<(typeof rows)[number]> = [
    { title: "Kod", dataIndex: "code", width: 150 },
    { title: "Nomi", dataIndex: "name", width: 220, render: (value: string, record) => <Link href={`/services/${record.id}`}>{value}</Link> },
    { title: "Kategoriya", dataIndex: "categoryName", width: 170 },
    { title: "Bo'lim", dataIndex: "departmentName", width: 160 },
    { title: "Turi", dataIndex: "serviceType", width: 140 },
    { title: "Narx", dataIndex: "basePrice", width: 120, render: (value: number) => formatMoney(value) },
    { title: "Status", dataIndex: "status", width: 110, render: (value: string) => <Tag color="green">{value}</Tag> },
    { title: "Action", width: 90, render: () => <ActionDropdown actions={adminActions} /> },
  ];
  return (
    <ResourceShell eyebrow="Services" title="Xizmatlar katalogi" description="Klinika xizmatlari, bo'limlar va narxlar.">
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={rows} scroll={{ x: "max-content" }} pagination={false} /></Card>
    </ResourceShell>
  );
}

export function DocumentsPage() {
  const columns: ColumnsType<(typeof medicalDocuments)[number]> = [
    { title: "Raqam", dataIndex: "documentNumber", width: 170 },
    { title: "Turi", dataIndex: "documentType", width: 180 },
    { title: "Sarlavha", dataIndex: "title", width: 220, render: (value: string, record) => <Link href={`/documents/${record.id}`}>{value}</Link> },
    { title: "Status", dataIndex: "status", width: 120, render: (value: string) => <Tag color={value === "SIGNED" ? "green" : "blue"}>{value}</Tag> },
    { title: "Imzolangan", dataIndex: "signedAt", width: 160, render: (value?: string) => (value ? formatDateTime(value) : "-") },
    { title: "Action", width: 90, render: () => <ActionDropdown actions={adminActions} /> },
  ];
  return (
    <ResourceShell eyebrow="Documents" title="Tibbiy hujjatlar" description="Xulosalar, retseptlar, natijalar va ma'lumotnomalar.">
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={medicalDocuments} scroll={{ x: "max-content" }} pagination={false} /></Card>
    </ResourceShell>
  );
}

export function AccessUsersPage() {
  const rows = users.map((user) => {
    const staff = staffMembers.find((item) => item.id === user.staffMemberId);
    return { ...user, staffName: staff ? `${staff.lastName} ${staff.firstName}` : "-", department: departments.find((item) => item.id === staff?.departmentId)?.name ?? "-" };
  });
  const columns: ColumnsType<(typeof rows)[number]> = [
    { title: "Username", dataIndex: "username", width: 180, render: (value: string, record) => <Link href={`/access/users/${record.id}`}>{value}</Link> },
    { title: "Xodim", dataIndex: "staffName", width: 190 },
    { title: "Bo'lim", dataIndex: "department", width: 160 },
    { title: "Rollar", dataIndex: "roleCodes", width: 220, render: (items: string[]) => <Space wrap>{items.map((item) => <Tag key={item}>{item}</Tag>)}</Space> },
    { title: "Status", dataIndex: "status", width: 110, render: (value: string) => <Tag color="green">{value}</Tag> },
    { title: "Oxirgi kirish", dataIndex: "lastLoginAt", width: 160, render: (value: string) => formatDateTime(value) },
    { title: "Action", width: 90, render: () => <ActionDropdown actions={adminActions} /> },
  ];
  return (
    <ResourceShell eyebrow="Access" title="Foydalanuvchilar" description="Tizim foydalanuvchilari, rollar va bo'limlar.">
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={rows} scroll={{ x: "max-content" }} pagination={false} /></Card>
    </ResourceShell>
  );
}

export function RolesPage() {
  const columns: ColumnsType<(typeof roles)[number]> = [
    { title: "Kod", dataIndex: "code", width: 180 },
    { title: "Nomi", dataIndex: "name", width: 160 },
    { title: "Tavsif", dataIndex: "description" },
    { title: "Action", width: 90, render: () => <ActionDropdown actions={adminActions} /> },
  ];
  return (
    <ResourceShell eyebrow="Access" title="Rollar" description="ERP rollari va ularning vazifasi.">
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={roles} pagination={false} /></Card>
    </ResourceShell>
  );
}

export function AuditPage() {
  const columns: ColumnsType<(typeof auditLogs)[number]> = [
    { title: "Vaqt", dataIndex: "createdAt", width: 160, render: (value: string) => formatDateTime(value) },
    { title: "Modul", dataIndex: "module", width: 130 },
    { title: "Entity", dataIndex: "entityName", width: 160 },
    { title: "Entity ID", dataIndex: "entityId", width: 160 },
    { title: "Action", dataIndex: "action", width: 120, render: (value: string, record) => <Link href={`/audit/${record.id}`}><Tag>{value}</Tag></Link> },
  ];
  return (
    <ResourceShell eyebrow="Audit" title="Audit jurnali" description="Muhim operatsiyalar va o'zgarishlar tarixi.">
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={auditLogs} scroll={{ x: "max-content" }} pagination={false} /></Card>
    </ResourceShell>
  );
}

export function SettingsPage() {
  const rows: SimpleRecord[] = [
    { key: "clinic", name: "Klinika ma'lumotlari", description: "Nomi, telefon, manzil, valyuta", status: <Tag color="green">Sozlangan</Tag> },
    { key: "hours", name: "Ish vaqti", description: "08:00-20:00, asosiy filial", status: <Tag color="green">Aktiv</Tag> },
    { key: "payments", name: "To'lov usullari", description: "Naqd, karta, bank", status: <Tag color="blue">3 usul</Tag> },
    { key: "rules", name: "Qabul qoidalari", description: "Oldindan to'lov va no-show qoidalari", status: <Tag color="orange">Tekshirish kerak</Tag> },
  ];
  const columns: ColumnsType<SimpleRecord> = [
    { title: "Bo'lim", dataIndex: "name", width: 220 },
    { title: "Tavsif", dataIndex: "description" },
    { title: "Status", dataIndex: "status", width: 160 },
  ];
  return (
    <ResourceShell eyebrow="Settings" title="Sozlamalar" description="Klinika, to'lov, qabul va tizim sozlamalari.">
      <Card size="small" className="table-card"><Table rowKey="key" size="small" columns={columns} dataSource={rows} pagination={false} /></Card>
      <Card size="small" title="Klinika asosiy ma'lumotlari">
        <Descriptions size="small" bordered column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Klinika">Shifo Med Clinic</Descriptions.Item>
          <Descriptions.Item label="Valyuta">UZS</Descriptions.Item>
          <Descriptions.Item label="Timezone">Asia/Tashkent</Descriptions.Item>
        </Descriptions>
      </Card>
    </ResourceShell>
  );
}

export function ServiceDetailPage({ serviceId }: { serviceId: string }) {
  const service = services.find((item) => item.id === serviceId);
  if (!service) return <Card>Service topilmadi</Card>;
  return (
    <ResourceShell eyebrow="Services" title={service.name} description="Xizmat narxi, bo'limi va to'lov qoidasi.">
      <Card size="small">
        <Descriptions bordered size="small" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Kod">{service.code}</Descriptions.Item>
          <Descriptions.Item label="Kategoriya">{serviceCategories.find((item) => item.id === service.categoryId)?.name}</Descriptions.Item>
          <Descriptions.Item label="Bo'lim">{departments.find((item) => item.id === service.departmentId)?.name}</Descriptions.Item>
          <Descriptions.Item label="Turi">{service.serviceType}</Descriptions.Item>
          <Descriptions.Item label="Narx">{formatMoney(service.basePrice)}</Descriptions.Item>
          <Descriptions.Item label="Oldindan to'lov">{service.requiresPrepayment ? "Ha" : "Yo'q"}</Descriptions.Item>
        </Descriptions>
      </Card>
    </ResourceShell>
  );
}

export function DocumentDetailPage({ documentId }: { documentId: string }) {
  const doc = medicalDocuments.find((item) => item.id === documentId);
  const patient = patients.find((item) => item.id === doc?.patientId);
  if (!doc) return <Card>Hujjat topilmadi</Card>;
  return (
    <ResourceShell eyebrow="Documents" title={doc.title} description="Tibbiy hujjat detail va chop etish holati.">
      <Card size="small">
        <Descriptions bordered size="small" column={{ xs: 1, md: 2 }}>
          <Descriptions.Item label="Raqam">{doc.documentNumber}</Descriptions.Item>
          <Descriptions.Item label="Turi">{doc.documentType}</Descriptions.Item>
          <Descriptions.Item label="Bemor">{patient ? `${patient.lastName} ${patient.firstName}` : "-"}</Descriptions.Item>
          <Descriptions.Item label="Status"><Tag>{doc.status}</Tag></Descriptions.Item>
          <Descriptions.Item label="Imzolangan">{doc.signedAt ? formatDateTime(doc.signedAt) : "-"}</Descriptions.Item>
        </Descriptions>
      </Card>
    </ResourceShell>
  );
}

export function UserDetailPage({ userId }: { userId: string }) {
  const user = users.find((item) => item.id === userId);
  const staff = staffMembers.find((item) => item.id === user?.staffMemberId);
  if (!user) return <Card>Foydalanuvchi topilmadi</Card>;
  return (
    <ResourceShell eyebrow="Access" title={user.username} description="Foydalanuvchi, xodim va rollar.">
      <Card size="small">
        <Descriptions bordered size="small" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Xodim">{staff ? `${staff.lastName} ${staff.firstName}` : "-"}</Descriptions.Item>
          <Descriptions.Item label="Bo'lim">{departments.find((item) => item.id === staff?.departmentId)?.name}</Descriptions.Item>
          <Descriptions.Item label="Status"><Tag color="green">{user.status}</Tag></Descriptions.Item>
          <Descriptions.Item label="Rollar">{user.roleCodes.map((role) => <Tag key={role}>{role}</Tag>)}</Descriptions.Item>
          <Descriptions.Item label="Oxirgi kirish">{formatDateTime(user.lastLoginAt)}</Descriptions.Item>
        </Descriptions>
      </Card>
    </ResourceShell>
  );
}

export function AuditDetailPage({ auditId }: { auditId: string }) {
  const audit = auditLogs.find((item) => item.id === auditId);
  if (!audit) return <Card>Audit topilmadi</Card>;
  return (
    <ResourceShell eyebrow="Audit" title={audit.action} description="Audit yozuvi detail.">
      <Card size="small">
        <Descriptions bordered size="small" column={{ xs: 1, md: 2 }}>
          <Descriptions.Item label="Vaqt">{formatDateTime(audit.createdAt)}</Descriptions.Item>
          <Descriptions.Item label="Modul">{audit.module}</Descriptions.Item>
          <Descriptions.Item label="Entity">{audit.entityName}</Descriptions.Item>
          <Descriptions.Item label="Entity ID">{audit.entityId}</Descriptions.Item>
          <Descriptions.Item label="Actor">{audit.actorUserId}</Descriptions.Item>
          <Descriptions.Item label="Action"><Tag>{audit.action}</Tag></Descriptions.Item>
        </Descriptions>
      </Card>
    </ResourceShell>
  );
}
