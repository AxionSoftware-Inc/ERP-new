"use client";

import { Button, Card, Col, Form, Input, Row, Space, Statistic, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { ActionButton } from "../../_components/ActionDrawer";
import { cashierActions } from "../../_lib/panelActions";
import { formatMoney, getCashierMetrics } from "./cashierData";
import { CashierSubnav } from "./CashierSubnav";

const { Text, Title } = Typography;

export function CashierClosingPage() {
  const metrics = getCashierMetrics();
  const expectedCash = metrics.cash;
  const expectedCard = metrics.card;
  const total = metrics.revenue;

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <CashierSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Cashier</Text>
          <Title level={2}>Kassa yopish</Title>
          <Text>Smena yakunida naqd, karta, farq va izohni rahbar tasdig&apos;iga tayyorlash.</Text>
        </div>
        <ActionButton action={{ ...cashierActions[1], label: "Smena hisobotini chiqarish", primary: true }} icon={<CheckCircleOutlined />}>
          Hisobot chiqarish
        </ActionButton>
      </div>

      <Row gutter={[10, 10]} className="kpi-strip">
        <Col xs={24} sm={12} lg={6}><Card size="small"><Statistic title="Kutilgan naqd" value={expectedCash} formatter={(v) => formatMoney(Number(v))} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card size="small"><Statistic title="Karta tushumi" value={expectedCard} formatter={(v) => formatMoney(Number(v))} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card size="small"><Statistic title="Jami tushum" value={total} formatter={(v) => formatMoney(Number(v))} valueStyle={{ color: "#047857" }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card size="small"><Statistic title="Qarzdorlik" value={metrics.debt} formatter={(v) => formatMoney(Number(v))} valueStyle={{ color: "#b91c1c" }} /></Card></Col>
      </Row>

      <Card size="small" title="Smena yopish formasi">
        <Form layout="vertical" className="dense-form">
          <div className="form-grid">
            <Form.Item label="Real naqd summa" required initialValue={expectedCash}>
              <Input />
            </Form.Item>
            <Form.Item label="Terminal hisobot summasi" required initialValue={expectedCard}>
              <Input />
            </Form.Item>
            <Form.Item label="Farq sababi">
              <Input placeholder="Farq bo'lsa majburiy" />
            </Form.Item>
          </div>
          <Form.Item label="Kassir izohi">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Space>
            <Button type="primary">Rahbar tasdig&apos;iga yuborish</Button>
            <Button>Draft saqlash</Button>
          </Space>
        </Form>
      </Card>
    </Space>
  );
}
