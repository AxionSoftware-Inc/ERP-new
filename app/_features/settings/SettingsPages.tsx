"use client";

import { Button, Card, Descriptions, Form, Input, InputNumber, Select, Space, Switch, Table, Tag, TimePicker, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { clinic } from "../../_data/fakeClinicData";
import { SettingsSubnav } from "./SettingsSubnav";

const { Text, Title } = Typography;

function Header({ title, description }: { title: string; description: string }) {
  return (
    <div className="erp-ant-page-header reception-command-header">
      <div>
        <Text type="secondary">Settings</Text>
        <Title level={2}>{title}</Title>
        <Text>{description}</Text>
      </div>
    </div>
  );
}

export function ClinicSettingsPage() {
  return (
    <Shell title="Klinika ma'lumotlari" description="Yuridik ma'lumotlar, aloqa, valyuta va timezone.">
      <Card size="small" title="Asosiy ma'lumotlar">
        <Form layout="vertical" className="dense-form">
          <div className="form-grid">
            <Form.Item label="Klinika nomi" required initialValue={clinic.name}><Input /></Form.Item>
            <Form.Item label="Yuridik nomi" initialValue="Shifo Med Clinic MChJ"><Input /></Form.Item>
            <Form.Item label="STIR" initialValue="301234567"><Input /></Form.Item>
            <Form.Item label="Telefon" required initialValue={clinic.phone}><Input /></Form.Item>
            <Form.Item label="Email" initialValue={clinic.email}><Input /></Form.Item>
            <Form.Item label="Valyuta" initialValue={clinic.defaultCurrency}><Select options={[{ label: "UZS", value: "UZS" }, { label: "USD", value: "USD" }]} /></Form.Item>
          </div>
          <Form.Item label="Manzil" initialValue={clinic.address}><Input /></Form.Item>
          <Space><Button type="primary">Saqlash</Button><Button>O&apos;zgarish sababini yozish</Button></Space>
        </Form>
      </Card>
    </Shell>
  );
}

export function WorkingHoursSettingsPage() {
  const rows = [
    { id: "mon", day: "Dushanba", start: "08:00", end: "20:00", active: true },
    { id: "tue", day: "Seshanba", start: "08:00", end: "20:00", active: true },
    { id: "wed", day: "Chorshanba", start: "08:00", end: "20:00", active: true },
    { id: "thu", day: "Payshanba", start: "08:00", end: "20:00", active: true },
    { id: "fri", day: "Juma", start: "08:00", end: "20:00", active: true },
    { id: "sat", day: "Shanba", start: "09:00", end: "16:00", active: true },
    { id: "sun", day: "Yakshanba", start: "-", end: "-", active: false },
  ];
  const columns: ColumnsType<(typeof rows)[number]> = [
    { title: "Kun", dataIndex: "day", width: 160 },
    { title: "Boshlanish", dataIndex: "start", width: 140 },
    { title: "Tugash", dataIndex: "end", width: 140 },
    { title: "Holat", dataIndex: "active", width: 120, render: (value: boolean) => <Tag color={value ? "green" : "default"}>{value ? "Ish kuni" : "Yopiq"}</Tag> },
  ];

  return (
    <Shell title="Ish vaqti" description="Filial va hafta kunlari bo'yicha ish vaqtini sozlash.">
      <Card size="small" title="Haftalik jadval">
        <Table rowKey="id" size="small" columns={columns} dataSource={rows} pagination={false} />
      </Card>
      <Card size="small" title="Default qabul slotlari">
        <Form layout="vertical" className="dense-form">
          <div className="form-grid">
            <Form.Item label="Boshlanish"><TimePicker style={{ width: "100%" }} /></Form.Item>
            <Form.Item label="Tugash"><TimePicker style={{ width: "100%" }} /></Form.Item>
            <Form.Item label="Slot davomiyligi"><InputNumber min={5} max={120} defaultValue={20} style={{ width: "100%" }} /></Form.Item>
          </div>
          <Button type="primary">Saqlash</Button>
        </Form>
      </Card>
    </Shell>
  );
}

export function PaymentMethodsSettingsPage() {
  const rows = [
    { id: "cash", name: "Naqd", code: "CASH", fiscal: true, active: true },
    { id: "card", name: "Karta", code: "CARD", fiscal: true, active: true },
    { id: "bank", name: "Bank o'tkazmasi", code: "BANK_TRANSFER", fiscal: false, active: true },
  ];
  const columns: ColumnsType<(typeof rows)[number]> = [
    { title: "Nomi", dataIndex: "name", width: 180 },
    { title: "Kod", dataIndex: "code", width: 160 },
    { title: "Fiskal", dataIndex: "fiscal", width: 110, render: (value: boolean) => <Switch checked={value} /> },
    { title: "Aktiv", dataIndex: "active", width: 110, render: (value: boolean) => <Switch checked={value} /> },
  ];

  return (
    <Shell title="To'lov usullari" description="Kassa, fiskal integratsiya va aktiv to'lov kanallari.">
      <Card size="small" className="table-card"><Table rowKey="id" size="small" columns={columns} dataSource={rows} pagination={false} /></Card>
    </Shell>
  );
}

export function AppointmentRulesSettingsPage() {
  return (
    <Shell title="Qabul qoidalari" description="No-show, kechikish, oldindan to'lov va qabul davomiyligi qoidalari.">
      <Card size="small" title="Workflow qoidalari">
        <Form layout="vertical" className="dense-form">
          <div className="form-grid">
            <Form.Item label="Default qabul davomiyligi"><InputNumber min={5} max={120} defaultValue={20} style={{ width: "100%" }} /></Form.Item>
            <Form.Item label="Kechikish limiti"><InputNumber min={0} max={120} defaultValue={15} addonAfter="daq" style={{ width: "100%" }} /></Form.Item>
            <Form.Item label="No-show avtomatik belgilash"><InputNumber min={0} max={240} defaultValue={30} addonAfter="daq" style={{ width: "100%" }} /></Form.Item>
            <Form.Item label="Oldindan to'lov talab qilinsin"><Switch defaultChecked /></Form.Item>
            <Form.Item label="Qarzdor bemorni bloklash"><Switch /></Form.Item>
            <Form.Item label="Bekor qilish sababi majburiy"><Switch defaultChecked /></Form.Item>
          </div>
          <Descriptions size="small" bordered column={1}>
            <Descriptions.Item label="Tavsiya">Payment required xizmatlarda bemor shifokorga faqat kassa tasdig&apos;idan keyin o&apos;tadi.</Descriptions.Item>
          </Descriptions>
          <Space style={{ marginTop: 12 }}><Button type="primary">Saqlash</Button><Button>Audit sababini yozish</Button></Space>
        </Form>
      </Card>
    </Shell>
  );
}

function Shell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <SettingsSubnav />
      <Header title={title} description={description} />
      {children}
    </Space>
  );
}
