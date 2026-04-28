"use client";

import Link from "next/link";
import { Button, Card, Descriptions, Empty, Space, Tag, Timeline, Typography } from "antd";
import { ActionButton } from "../../_components/ActionDrawer";
import { diagnosticActions } from "../../_lib/panelActions";
import { formatDateTime, getDiagnosticDetail } from "./diagnosticsData";
import { DiagnosticStatusTag } from "./DiagnosticStatusTag";
import { DiagnosticsSubnav } from "./DiagnosticsSubnav";

const { Text, Title } = Typography;

export function DiagnosticOrderDetailPage({ orderId }: { orderId: string }) {
  const detail = getDiagnosticDetail(orderId);
  if (!detail) return <Card><Empty description="Diagnostika order topilmadi" /></Card>;

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <DiagnosticsSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Diagnostic order</Text>
          <Title level={2}>{detail.order.serviceName}</Title>
          <Space wrap><DiagnosticStatusTag status={detail.order.status} /><Tag>{detail.order.priority}</Tag></Space>
        </div>
        <Space>
          <Link href={`/diagnostics/orders/${detail.order.id}/conclusion`}><Button type="primary">Xulosa yozish</Button></Link>
          <ActionButton action={diagnosticActions[0]}>Tekshiruvni boshlash</ActionButton>
        </Space>
      </div>
      <Card size="small" title="Order ma'lumoti">
        <Descriptions bordered size="small" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Bemor">{detail.order.patientName}</Descriptions.Item>
          <Descriptions.Item label="Telefon">{detail.order.patientPhone}</Descriptions.Item>
          <Descriptions.Item label="Mutaxassis">{detail.order.specialistName}</Descriptions.Item>
          <Descriptions.Item label="Tekshiruv">{detail.order.serviceName}</Descriptions.Item>
          <Descriptions.Item label="Vaqt">{formatDateTime(detail.order.scheduledAt)}</Descriptions.Item>
          <Descriptions.Item label="Result">{detail.result?.status ?? "NO_RESULT"}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card size="small" title="Xulosa preview">
        <Descriptions size="small" bordered column={1}>
          <Descriptions.Item label="Findings">{detail.result?.findings ?? "-"}</Descriptions.Item>
          <Descriptions.Item label="Conclusion">{detail.result?.conclusion ?? "-"}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card size="small" title="Timeline">
        <Timeline items={[{ children: `Rejalashtirilgan: ${formatDateTime(detail.order.scheduledAt)}` }, { children: `Status: ${detail.order.status}` }]} />
      </Card>
    </Space>
  );
}
