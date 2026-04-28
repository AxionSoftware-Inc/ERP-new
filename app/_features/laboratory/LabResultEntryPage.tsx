"use client";

import Link from "next/link";
import { Alert, Button, Card, Descriptions, Empty, Form, Input, Space, Switch, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SaveOutlined } from "@ant-design/icons";
import { ActionButton } from "../../_components/ActionDrawer";
import { labActions } from "../../_lib/panelActions";
import { getLabOrderDetail } from "./labData";
import { LabStatusTag } from "./LabStatusTag";
import { LabSubnav } from "./LabSubnav";

const { Text, Title } = Typography;

export function LabResultEntryPage({ orderId }: { orderId: string }) {
  const detail = getLabOrderDetail(orderId);

  if (!detail) {
    return (
      <Card>
        <Empty description="Laboratoriya order topilmadi" />
      </Card>
    );
  }

  const columns: ColumnsType<NonNullable<(typeof detail.tests)[number]>> = [
    { title: "Tahlil", dataIndex: "name", width: 220 },
    { title: "Namuna", dataIndex: "sampleType", width: 120 },
    { title: "Norma", dataIndex: "referenceRange", width: 140 },
    {
      title: "Natija",
      width: 180,
      render: (_, record) => <Input placeholder={record.unit} defaultValue={detail.results.find((result) => result.labTestId === record.id)?.value} />,
    },
    {
      title: "Abnormal",
      width: 110,
      render: (_, record) => <Switch defaultChecked={detail.results.find((result) => result.labTestId === record.id)?.isAbnormal} />,
    },
  ];

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <LabSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Natija kiritish</Text>
          <Title level={2}>{detail.order.orderNumber}</Title>
          <Space wrap>
            <LabStatusTag status={detail.order.status} />
            <Tag>{detail.order.priority}</Tag>
          </Space>
        </div>
        <Space wrap>
          <ActionButton action={{ ...labActions[2], label: "Draft saqlash" }} icon={<SaveOutlined />}>Draft saqlash</ActionButton>
          <ActionButton action={{ ...labActions[2], primary: true }}>Tasdiqlashga yuborish</ActionButton>
        </Space>
      </div>

      <Card size="small" title="Order ma'lumoti">
        <Descriptions bordered size="small" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Bemor">{detail.order.patientName}</Descriptions.Item>
          <Descriptions.Item label="Telefon">{detail.order.patientPhone}</Descriptions.Item>
          <Descriptions.Item label="Shifokor">{detail.order.doctorName}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Alert showIcon type="info" message="Natijalar tasdiqlangandan keyin shifokor oynasida ko'rinadi va hujjatga chiqariladi." className="compact-alert" />

      <Card size="small" title="Natija qiymatlari">
        <Form layout="vertical">
          <Table rowKey="id" size="small" columns={columns} dataSource={detail.tests} pagination={false} scroll={{ x: "max-content" }} />
          <Form.Item label="Laboratoriya izohi" style={{ marginTop: 12 }}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Space>
            <ActionButton action={{ ...labActions[2], label: "Saqlash", primary: true }}>Saqlash</ActionButton>
            <Link href="/laboratory/orders"><Button>Orqaga</Button></Link>
          </Space>
        </Form>
      </Card>
    </Space>
  );
}
