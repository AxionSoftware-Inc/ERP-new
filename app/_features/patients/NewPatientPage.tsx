"use client";

import Link from "next/link";
import { Button, Card, DatePicker, Form, Input, Select, Space, Typography } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export function NewPatientPage() {
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <div className="erp-ant-page-header reception-command-header">
        <div><Text type="secondary">Patients</Text><Title level={2}>Yangi bemor</Title><Text>Reception yoki admin tomonidan yangi bemor kartasini yaratish.</Text></div>
      </div>
      <Card size="small" title="Bemor ma'lumotlari">
        <Form layout="vertical" className="dense-form">
          <div className="form-grid">
            <Form.Item label="Familiya" required><Input /></Form.Item>
            <Form.Item label="Ism" required><Input /></Form.Item>
            <Form.Item label="Telefon" required><Input /></Form.Item>
            <Form.Item label="Jins"><Select options={[{ label: "Erkak", value: "MALE" }, { label: "Ayol", value: "FEMALE" }]} /></Form.Item>
            <Form.Item label="Tug'ilgan sana"><DatePicker style={{ width: "100%" }} /></Form.Item>
            <Form.Item label="Qon guruhi"><Input /></Form.Item>
          </div>
          <Form.Item label="Manzil"><Input /></Form.Item>
          <Form.Item label="Allergiya / surunkali kasalliklar"><Input.TextArea rows={3} /></Form.Item>
          <Space><Button type="primary" icon={<SaveOutlined />}>Saqlash</Button><Button>Saqlash va qabulga yozish</Button><Link href="/patients"><Button>Bekor qilish</Button></Link></Space>
        </Form>
      </Card>
    </Space>
  );
}
