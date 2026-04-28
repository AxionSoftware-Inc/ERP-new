"use client";

import Link from "next/link";
import { Button, Card, Descriptions, Empty, Space, Table, Tag, Timeline, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ActionButton } from "../../_components/ActionDrawer";
import { labActions } from "../../_lib/panelActions";
import { getLabOrderDetail, formatDateTime } from "./labData";
import { LabStatusTag } from "./LabStatusTag";
import { LabSubnav } from "./LabSubnav";

const { Text, Title } = Typography;

export function LabOrderDetailPage({ orderId }: { orderId: string }) {
  const detail = getLabOrderDetail(orderId);
  if (!detail) return <Card><Empty description="Laboratoriya order topilmadi" /></Card>;

  const columns: ColumnsType<(typeof detail.tests)[number]> = [
    { title: "Kod", dataIndex: "code", width: 120 },
    { title: "Tahlil", dataIndex: "name", width: 220 },
    { title: "Kategoriya", dataIndex: "category", width: 150 },
    { title: "Namuna", dataIndex: "sampleType", width: 120 },
    { title: "Norma", dataIndex: "referenceRange", width: 140 },
  ];

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <LabSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Laboratory order</Text>
          <Title level={2}>{detail.order.orderNumber}</Title>
          <Space wrap><LabStatusTag status={detail.order.status} /><Tag>{detail.order.priority}</Tag></Space>
        </div>
        <Space>
          <Link href={`/laboratory/orders/${detail.order.id}/results`}><Button type="primary">Natija kiritish</Button></Link>
          <ActionButton action={labActions[1]}>Barcode</ActionButton>
        </Space>
      </div>
      <Card size="small" title="Order ma'lumoti">
        <Descriptions bordered size="small" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Bemor">{detail.order.patientName}</Descriptions.Item>
          <Descriptions.Item label="Telefon">{detail.order.patientPhone}</Descriptions.Item>
          <Descriptions.Item label="Shifokor">{detail.order.doctorName}</Descriptions.Item>
          <Descriptions.Item label="Buyurtma vaqti">{formatDateTime(detail.order.orderedAt)}</Descriptions.Item>
          <Descriptions.Item label="Namuna vaqti">{detail.order.sampleCollectedAt ? formatDateTime(detail.order.sampleCollectedAt) : "-"}</Descriptions.Item>
          <Descriptions.Item label="Natijalar">{detail.results.length}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card size="small" title="Tahlillar">
        <Table rowKey="id" size="small" columns={columns} dataSource={detail.tests} pagination={false} scroll={{ x: "max-content" }} />
      </Card>
      <Card size="small" title="Timeline">
        <Timeline
          items={[
            { children: `Buyurtma yaratildi: ${formatDateTime(detail.order.orderedAt)}` },
            detail.order.sampleCollectedAt ? { children: `Namuna olindi: ${formatDateTime(detail.order.sampleCollectedAt)}` } : { children: "Namuna kutilmoqda" },
          ]}
        />
      </Card>
    </Space>
  );
}
