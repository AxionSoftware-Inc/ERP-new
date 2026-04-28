"use client";

import { Button, Card, Col, Input, Row, Select, Space, Statistic, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PhoneOutlined, SearchOutlined } from "@ant-design/icons";
import { ActionButton } from "../../_components/ActionDrawer";
import { receptionActions } from "../../_lib/panelActions";
import { formatDateTime, getReceptionCallRows } from "./receptionData";
import { ReceptionSubnav } from "./ReceptionSubnav";

const { Text, Title } = Typography;

type CallRow = ReturnType<typeof getReceptionCallRows>[number];

const callStatusColors: Record<CallRow["status"], string> = {
  NEW: "blue",
  IN_PROGRESS: "processing",
  APPOINTMENT_CREATED: "green",
  CLOSED: "default",
  MISSED: "red",
};

const callStatusLabels: Record<CallRow["status"], string> = {
  NEW: "Yangi",
  IN_PROGRESS: "Jarayonda",
  APPOINTMENT_CREATED: "Qabul yaratildi",
  CLOSED: "Yopilgan",
  MISSED: "O'tkazib yuborilgan",
};

export function ReceptionCalls() {
  const rows = getReceptionCallRows();
  const followUps = rows.filter((row) => row.followUpAt && ["NEW", "IN_PROGRESS"].includes(row.status)).length;

  const columns: ColumnsType<CallRow> = [
    { title: "Vaqt", dataIndex: "createdAt", width: 150, render: (value: string) => formatDateTime(value) },
    { title: "Qo'ng'iroq qiluvchi", dataIndex: "callerName", width: 190 },
    { title: "Telefon", dataIndex: "phone", width: 150 },
    { title: "Bemor", dataIndex: "patientName", width: 180 },
    { title: "Mavzu", dataIndex: "topic", width: 220 },
    {
      title: "Status",
      dataIndex: "status",
      width: 150,
      render: (value: CallRow["status"]) => <Tag color={callStatusColors[value]}>{callStatusLabels[value]}</Tag>,
    },
    { title: "Mas'ul", dataIndex: "assignedName", width: 160 },
    { title: "Follow-up", dataIndex: "followUpAt", width: 150, render: (value?: string) => (value ? formatDateTime(value) : "-") },
    {
      title: "Action",
      width: 160,
      fixed: "right",
      render: () => (
        <Space>
          <ActionButton action={{ ...receptionActions[0], label: "Qabul yaratish" }} size="small">Qabul yaratish</ActionButton>
          <ActionButton action={{ ...receptionActions[5], label: "Yopish" }} size="small">Yopish</ActionButton>
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
          <Title level={2}>Qo&apos;ng&apos;iroqlar</Title>
          <Text>Telefon orqali kelgan murojaatlar, qayta aloqa va qabulga yozish jarayoni.</Text>
        </div>
        <ActionButton action={{ ...receptionActions[0], label: "Yangi qo'ng'iroq", primary: true }} icon={<PhoneOutlined />}>
          Yangi qo&apos;ng&apos;iroq
        </ActionButton>
      </div>

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic title="Bugungi qo'ng'iroqlar" value={rows.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic title="Yangi" value={rows.filter((row) => row.status === "NEW").length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic title="Jarayonda" value={rows.filter((row) => row.status === "IN_PROGRESS").length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic title="Follow-up kerak" value={followUps} valueStyle={{ color: "#b45309" }} />
          </Card>
        </Col>
      </Row>

      <Card size="small">
        <Space wrap>
          <Input prefix={<SearchOutlined />} placeholder="Ism, telefon yoki mavzu" style={{ width: 260 }} />
          <Select
            allowClear
            placeholder="Status"
            style={{ width: 180 }}
            options={Object.entries(callStatusLabels).map(([value, label]) => ({ value, label }))}
          />
          <Button>Filterlarni tozalash</Button>
        </Space>
      </Card>

      <Card size="small">
        <Table rowKey="id" size="small" columns={columns} dataSource={rows} scroll={{ x: 1520 }} pagination={{ pageSize: 20 }} />
      </Card>
    </Space>
  );
}
