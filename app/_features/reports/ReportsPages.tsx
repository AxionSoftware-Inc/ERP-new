"use client";

import Link from "next/link";
import { Card, Col, Progress, Row, Space, Statistic, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  formatMoney,
  getDebtReportRows,
  getDoctorReportRows,
  getRevenueRows,
  getRevenueSummary,
  getServiceReportRows,
} from "./reportsData";
import { ReportsSubnav } from "./ReportsSubnav";

const { Text, Title } = Typography;

export function ReportsOverviewPage() {
  const summary = getRevenueSummary();
  const cards = [
    { title: "Tushum hisoboti", href: "/reports/revenue", description: "Naqd, karta, collection rate va kunlik tushum." },
    { title: "Xizmatlar hisoboti", href: "/reports/services", description: "Xizmatlar kesimida brutto, chegirma va netto." },
    { title: "Shifokorlar hisoboti", href: "/reports/doctors", description: "Qabul soni, yakunlash foizi va komissiya bazasi." },
    { title: "Qarzdorlik hisoboti", href: "/reports/debts", description: "Ochiq invoice, undirilgan foiz va qarz nazorati." },
  ];

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <ReportsSubnav />
      <Header title="Hisobotlar markazi" description="Rahbariyat uchun moliyaviy va operatsion kesimlar." />
      <Row gutter={[10, 10]} className="kpi-strip">
        <Col xs={24} sm={12} lg={6}><Card size="small"><Statistic title="Hisoblangan" value={summary.billed} formatter={(v) => formatMoney(Number(v))} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card size="small"><Statistic title="Undirilgan" value={summary.collected} formatter={(v) => formatMoney(Number(v))} valueStyle={{ color: "#047857" }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card size="small"><Statistic title="Collection rate" value={summary.collectionRate} suffix="%" valueStyle={{ color: summary.collectionRate >= 90 ? "#047857" : "#b45309" }} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card size="small"><Statistic title="Qarzdorlik" value={summary.debt} formatter={(v) => formatMoney(Number(v))} valueStyle={{ color: "#b91c1c" }} /></Card></Col>
      </Row>
      <Row gutter={[10, 10]}>
        {cards.map((card) => (
          <Col xs={24} md={12} xl={6} key={card.href}>
            <Link href={card.href}>
              <section className="surface-panel report-link-panel">
                <strong>{card.title}</strong>
                <Text type="secondary">{card.description}</Text>
              </section>
            </Link>
          </Col>
        ))}
      </Row>
    </Space>
  );
}

export function RevenueReportPage() {
  const summary = getRevenueSummary();
  const rows = getRevenueRows();
  const columns: ColumnsType<(typeof rows)[number]> = [
    { title: "Payment", dataIndex: "paymentNumber", width: 160 },
    { title: "Invoice", dataIndex: "invoiceNumber", width: 155 },
    { title: "Usul", dataIndex: "method", width: 110, render: (value: string) => <Tag>{value}</Tag> },
    { title: "Summa", dataIndex: "amount", width: 130, render: (value: number) => formatMoney(value) },
    { title: "Invoice total", dataIndex: "totalAmount", width: 130, render: (value: number) => formatMoney(value) },
    { title: "Qarz", dataIndex: "debtAmount", width: 120, render: (value: number) => <Tag color={value > 0 ? "red" : "green"}>{formatMoney(value)}</Tag> },
    { title: "Vaqt", dataIndex: "paidAtFormatted", width: 145 },
  ];

  return (
    <ReportTablePage
      title="Tushum hisoboti"
      description="Naqd, karta, undirilgan summa va invoice qarzdorligi."
      metrics={[
        ["Naqd", summary.cash],
        ["Karta", summary.card],
        ["O'rtacha to'lov", summary.averagePayment],
        ["Chegirma", summary.discounts],
      ]}
      columns={columns}
      rows={rows}
    />
  );
}

export function ServicesReportPage() {
  const rows = getServiceReportRows();
  const columns: ColumnsType<(typeof rows)[number]> = [
    { title: "Xizmat", dataIndex: "serviceName", width: 230 },
    { title: "Bo'lim", dataIndex: "departmentName", width: 160 },
    { title: "Turi", dataIndex: "serviceType", width: 140 },
    { title: "Soni", dataIndex: "quantity", width: 90 },
    { title: "Brutto", dataIndex: "grossAmount", width: 130, render: (value: number) => formatMoney(value) },
    { title: "Chegirma", dataIndex: "discountAmount", width: 130, render: (value: number) => formatMoney(value) },
    { title: "Netto", dataIndex: "netAmount", width: 130, render: (value: number) => <strong>{formatMoney(value)}</strong> },
  ];

  return <ReportTablePage title="Xizmatlar hisoboti" description="Xizmatlar kesimida sotuv, chegirma va netto tushum." columns={columns} rows={rows} />;
}

export function DoctorsReportPage() {
  const rows = getDoctorReportRows();
  const columns: ColumnsType<(typeof rows)[number]> = [
    { title: "Shifokor", dataIndex: "doctorName", width: 190 },
    { title: "Mutaxassislik", dataIndex: "specialty", width: 180 },
    { title: "Qabul", dataIndex: "appointments", width: 90 },
    { title: "Yakunlangan", dataIndex: "completed", width: 110 },
    { title: "Completion", dataIndex: "conversionRate", width: 120, render: (value: number) => <Progress percent={value} size="small" /> },
    { title: "Tushum bazasi", dataIndex: "revenueBase", width: 140, render: (value: number) => formatMoney(value) },
    { title: "Komissiya taxmin", dataIndex: "commissionEstimate", width: 150, render: (value: number) => formatMoney(value) },
  ];

  return <ReportTablePage title="Shifokorlar hisoboti" description="Qabul samaradorligi, tushum bazasi va komissiya taxmini." columns={columns} rows={rows} />;
}

export function DebtsReportPage() {
  const rows = getDebtReportRows();
  const columns: ColumnsType<(typeof rows)[number]> = [
    { title: "Invoice", dataIndex: "invoiceNumber", width: 160 },
    { title: "Total", dataIndex: "totalAmount", width: 130, render: (value: number) => formatMoney(value) },
    { title: "To'langan", dataIndex: "paidAmount", width: 130, render: (value: number) => formatMoney(value) },
    { title: "Qarz", dataIndex: "debtAmount", width: 130, render: (value: number) => <Tag color="red">{formatMoney(value)}</Tag> },
    { title: "Undirilgan", dataIndex: "paidPercent", width: 130, render: (value: number) => <Progress percent={value} size="small" /> },
    { title: "Berilgan", dataIndex: "issuedAtFormatted", width: 145 },
  ];

  return <ReportTablePage title="Qarzdorlik hisoboti" description="Ochiq invoice va undirilishi kerak bo'lgan summalar." columns={columns} rows={rows} />;
}

function Header({ title, description }: { title: string; description: string }) {
  return (
    <div className="erp-ant-page-header reception-command-header">
      <div>
        <Text type="secondary">Reports</Text>
        <Title level={2}>{title}</Title>
        <Text>{description}</Text>
      </div>
    </div>
  );
}

function ReportTablePage<T extends { id: string }>({
  title,
  description,
  metrics,
  columns,
  rows,
}: {
  title: string;
  description: string;
  metrics?: [string, number][];
  columns: ColumnsType<T>;
  rows: T[];
}) {
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <ReportsSubnav />
      <Header title={title} description={description} />
      {metrics?.length ? (
        <Row gutter={[10, 10]} className="kpi-strip">
          {metrics.map(([label, value]) => (
            <Col xs={24} sm={12} lg={6} key={label}>
              <Card size="small"><Statistic title={label} value={value} formatter={(v) => formatMoney(Number(v))} /></Card>
            </Col>
          ))}
        </Row>
      ) : null}
      <Card size="small" className="table-card">
        <Table rowKey="id" size="small" columns={columns} dataSource={rows} scroll={{ x: "max-content" }} pagination={{ pageSize: 20 }} />
      </Card>
    </Space>
  );
}
