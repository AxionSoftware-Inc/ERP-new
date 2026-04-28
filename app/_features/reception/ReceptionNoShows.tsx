"use client";

import Link from "next/link";
import { Card, Col, Row, Space, Statistic, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ActionButton } from "../../_components/ActionDrawer";
import { receptionActions } from "../../_lib/panelActions";
import type { ReceptionAppointmentRow } from "./receptionData";
import { formatDateTime, getReceptionNoShows } from "./receptionData";
import { ReceptionStatusTag } from "./ReceptionStatusTag";
import { ReceptionSubnav } from "./ReceptionSubnav";

const { Text, Title } = Typography;

export function ReceptionNoShows() {
  const rows = getReceptionNoShows();

  const columns: ColumnsType<ReceptionAppointmentRow> = [
    { title: "Qabul raqami", dataIndex: "appointmentNumber", width: 150 },
    { title: "Sana va vaqt", dataIndex: "scheduledAt", width: 160, render: (value: string) => formatDateTime(value) },
    { title: "Bemor", dataIndex: "patientName", width: 190 },
    { title: "Telefon", dataIndex: "patientPhone", width: 150 },
    { title: "Shifokor", dataIndex: "doctorName", width: 170 },
    { title: "Xizmat", dataIndex: "serviceName", width: 180 },
    { title: "Status", dataIndex: "status", width: 150, render: (_, record) => <ReceptionStatusTag status={record.status} /> },
    {
      title: "Action",
      width: 210,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Link href={`/reception/appointments/${record.id}`}>Tafsilot</Link>
          <ActionButton action={receptionActions[3]} size="small">Qayta yozish</ActionButton>
          <ActionButton action={{ ...receptionActions[0], label: "Qo'ng'iroq qilish" }} size="small">Qo&apos;ng&apos;iroq</ActionButton>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <ReceptionSubnav />
      <div className="erp-ant-page-header">
        <div>
          <Text type="secondary">Registratura</Text>
          <Title level={2}>Kelmagan bemorlar</Title>
          <Text>Belgilangan vaqtda kelmagan bemorlarni qayta yozish yoki aloqa qilish uchun nazorat.</Text>
        </div>
      </div>

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic title="Bugungi no-show" value={rows.length} valueStyle={{ color: "#b91c1c" }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic title="Qayta yozilgan" value={0} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic title="Aloqa kutilmoqda" value={rows.length} valueStyle={{ color: "#b45309" }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic title="Bekor qilingan" value={0} />
          </Card>
        </Col>
      </Row>

      <Card size="small">
        <Table rowKey="id" size="small" columns={columns} dataSource={rows} scroll={{ x: 1360 }} pagination={{ pageSize: 20 }} />
      </Card>
    </Space>
  );
}
