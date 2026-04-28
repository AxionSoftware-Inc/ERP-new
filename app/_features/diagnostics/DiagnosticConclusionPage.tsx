"use client";

import Link from "next/link";
import { Button, Card, Descriptions, Empty, Form, Input, Space, Tag, Typography } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { ActionButton } from "../../_components/ActionDrawer";
import { diagnosticActions } from "../../_lib/panelActions";
import { formatDateTime, getDiagnosticDetail } from "./diagnosticsData";
import { DiagnosticStatusTag } from "./DiagnosticStatusTag";
import { DiagnosticsSubnav } from "./DiagnosticsSubnav";

const { Text, Title } = Typography;

export function DiagnosticConclusionPage({ orderId }: { orderId: string }) {
  const detail = getDiagnosticDetail(orderId);
  if (!detail) {
    return <Card><Empty description="Diagnostika order topilmadi" /></Card>;
  }
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <DiagnosticsSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Diagnostika xulosasi</Text>
          <Title level={2}>{detail.order.serviceName}</Title>
          <Space wrap><DiagnosticStatusTag status={detail.order.status} /><Tag>{detail.order.priority}</Tag></Space>
        </div>
        <Space><ActionButton action={{ ...diagnosticActions[1], label: "Draft" }} icon={<SaveOutlined />}>Draft</ActionButton><ActionButton action={{ ...diagnosticActions[2], primary: true }}>Tasdiqlash</ActionButton></Space>
      </div>
      <Card size="small" title="Tekshiruv ma'lumoti">
        <Descriptions bordered size="small" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Bemor">{detail.order.patientName}</Descriptions.Item>
          <Descriptions.Item label="Telefon">{detail.order.patientPhone}</Descriptions.Item>
          <Descriptions.Item label="Vaqt">{formatDateTime(detail.order.scheduledAt)}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card size="small" title="Xulosa">
        <Form layout="vertical" className="dense-form">
          <Form.Item label="Findings" initialValue={detail.result?.findings}><Input.TextArea rows={5} /></Form.Item>
          <Form.Item label="Conclusion" initialValue={detail.result?.conclusion}><Input.TextArea rows={5} /></Form.Item>
          <Form.Item label="Fayllar"><Input placeholder="Fayl upload keyingi bosqichda ulanadi" /></Form.Item>
          <Space><ActionButton action={{ ...diagnosticActions[1], label: "Saqlash", primary: true }}>Saqlash</ActionButton><Link href="/diagnostics/orders"><Button>Orqaga</Button></Link></Space>
        </Form>
      </Card>
    </Space>
  );
}
