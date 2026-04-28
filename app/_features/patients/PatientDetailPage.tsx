"use client";

import Link from "next/link";
import { Button, Card, Col, Descriptions, Empty, Row, Space, Table, Tag, Timeline, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import { ActionDropdown } from "../../_components/ActionDrawer";
import { adminActions } from "../../_lib/panelActions";
import { formatDateTime, formatMoney, getPatientDetail } from "./patientData";

const { Text, Title } = Typography;

export function PatientDetailPage({ patientId }: { patientId: string }) {
  const detail = getPatientDetail(patientId);
  if (!detail) return <Card><Empty description="Bemor topilmadi" /></Card>;
  const invoiceColumns: ColumnsType<(typeof detail.invoices)[number]> = [
    { title: "Invoice", dataIndex: "invoiceNumber" },
    { title: "Total", dataIndex: "totalAmount", render: (value: number) => formatMoney(value) },
    { title: "Qarz", dataIndex: "debtAmount", render: (value: number) => <Tag color={value > 0 ? "red" : "green"}>{formatMoney(value)}</Tag> },
    { title: "Status", dataIndex: "status" },
  ];
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">{detail.patient.patientNumber}</Text>
          <Title level={2}>{detail.patient.fullName}</Title>
          <Space wrap>{detail.patient.allergies ? <Tag color="volcano">Allergiya: {detail.patient.allergies}</Tag> : null}{detail.patient.chronicDiseases ? <Tag color="orange">{detail.patient.chronicDiseases}</Tag> : null}</Space>
        </div>
        <Space wrap>
          <Link href={`/reception/appointments/new?patient=${detail.patient.id}`}><Button type="primary" icon={<PlusOutlined />}>Qabulga yozish</Button></Link>
          <ActionDropdown actions={adminActions} buttonLabel="Amallar" />
        </Space>
      </div>
      <Row gutter={[10, 10]}>
        <Col xs={24} xl={8}>
          <Card size="small" title="Bemor summary">
            <Descriptions size="small" column={1}>
              <Descriptions.Item label="Telefon">{detail.patient.phone}</Descriptions.Item>
              <Descriptions.Item label="Yosh">{detail.patient.age}</Descriptions.Item>
              <Descriptions.Item label="Manzil">{detail.patient.address}</Descriptions.Item>
              <Descriptions.Item label="Qarzdorlik">{formatMoney(detail.patient.debtAmount)}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} xl={16}>
          <Card size="small" title="Tibbiy timeline">
            <Timeline
              items={[
                ...detail.appointments.map((item) => ({ children: `${formatDateTime(item.scheduledAt)} - ${item.reason} - ${item.status}` })),
                ...detail.encounters.map((item) => ({ children: `${item.preliminaryDiagnosis} - ${item.status}` })),
              ]}
            />
          </Card>
        </Col>
      </Row>
      <Card size="small" title="To'lovlar">
        <Table rowKey="id" size="small" columns={invoiceColumns} dataSource={detail.invoices} pagination={false} />
      </Card>
    </Space>
  );
}
