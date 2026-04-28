"use client";

import Link from "next/link";
import { Card, Col, Progress, Row, Space, Statistic, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  appointments,
  dashboardMetrics,
  departments,
  diagnosticOrders,
  labOrders,
  patients,
  paymentInvoiceItems,
  paymentInvoices,
  payments,
  queueTickets,
  services,
} from "../../_data/fakeClinicData";
import { formatDateTime, formatMoney } from "../reception/receptionData";

const { Text, Title } = Typography;

type OperationRow = {
  id: string;
  patientName: string;
  process: string;
  status: string;
  target: string;
  time: string;
};

type ServiceRevenueRow = {
  id: string;
  serviceName: string;
  departmentName: string;
  count: number;
  gross: number;
  discount: number;
  net: number;
};

type DebtRow = {
  id: string;
  invoiceNumber: string;
  patientName: string;
  totalAmount: number;
  debtAmount: number;
  issuedAt: string;
};

type DepartmentLoadRow = {
  id: string;
  departmentName: string;
  waiting: number;
  inProgress: number;
  completed: number;
};

export function DashboardPage() {
  const financial = getFinancialKpis();
  const operationRows: OperationRow[] = appointments.slice(0, 8).map((appointment) => {
    const patient = patients.find((item) => item.id === appointment.patientId);
    const ticket = queueTickets.find((item) => item.appointmentId === appointment.id);
    return {
      id: appointment.id,
      patientName: patient ? `${patient.lastName} ${patient.firstName}` : "-",
      process: appointment.reason,
      status: appointment.status,
      target: ticket?.currentStep ?? "RECEPTION",
      time: appointment.scheduledAt,
    };
  });

  const columns: ColumnsType<OperationRow> = [
    { title: "Bemor", dataIndex: "patientName", width: 190 },
    { title: "Jarayon", dataIndex: "process", width: 260 },
    { title: "Bosqich", dataIndex: "target", width: 130, render: (value: string) => <Tag>{value}</Tag> },
    { title: "Status", dataIndex: "status", width: 150 },
    { title: "Vaqt", dataIndex: "time", width: 145, render: (value: string) => formatDateTime(value) },
  ];
  const serviceColumns: ColumnsType<ServiceRevenueRow> = [
    { title: "Xizmat", dataIndex: "serviceName", width: 230 },
    { title: "Bo'lim", dataIndex: "departmentName", width: 150 },
    { title: "Soni", dataIndex: "count", width: 80 },
    { title: "Brutto", dataIndex: "gross", width: 120, render: (value: number) => formatMoney(value) },
    { title: "Chegirma", dataIndex: "discount", width: 120, render: (value: number) => formatMoney(value) },
    { title: "Netto", dataIndex: "net", width: 120, render: (value: number) => <strong>{formatMoney(value)}</strong> },
  ];
  const debtColumns: ColumnsType<DebtRow> = [
    { title: "Invoice", dataIndex: "invoiceNumber", width: 150 },
    { title: "Bemor", dataIndex: "patientName", width: 190 },
    { title: "Total", dataIndex: "totalAmount", width: 120, render: (value: number) => formatMoney(value) },
    { title: "Qarz", dataIndex: "debtAmount", width: 120, render: (value: number) => <Tag color="red">{formatMoney(value)}</Tag> },
    { title: "Berilgan", dataIndex: "issuedAt", width: 145, render: (value: string) => formatDateTime(value) },
  ];
  const departmentColumns: ColumnsType<DepartmentLoadRow> = [
    { title: "Bo'lim", dataIndex: "departmentName", width: 160 },
    { title: "Kutmoqda", dataIndex: "waiting", width: 100, render: (value: number) => <Tag color={value ? "orange" : "green"}>{value}</Tag> },
    { title: "Jarayonda", dataIndex: "inProgress", width: 100 },
    { title: "Yakunlangan", dataIndex: "completed", width: 110 },
  ];

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Dashboard</Text>
          <Title level={2}>Klinika bosh paneli</Title>
          <Text>Bugungi bemorlar oqimi, tushum, qarzdorlik va klinik jarayonlar.</Text>
        </div>
        <Space wrap>
          <Link href="/reception">Reception</Link>
          <Link href="/doctor">Doctor</Link>
          <Link href="/cashier">Cashier</Link>
        </Space>
      </div>

      <Row gutter={[10, 10]} className="kpi-strip">
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Bugungi bemorlar" value={dashboardMetrics.todayPatients} /></Card></Col>
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Aktiv navbat" value={dashboardMetrics.activeQueue} /></Card></Col>
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Bugungi tushum" value={dashboardMetrics.todayRevenue} formatter={(v) => formatMoney(Number(v))} /></Card></Col>
        <Col xs={24} sm={12} lg={5}><Card size="small"><Statistic title="Qarzdorlik" value={dashboardMetrics.totalDebt} formatter={(v) => formatMoney(Number(v))} valueStyle={{ color: "#b91c1c" }} /></Card></Col>
        <Col xs={24} sm={12} lg={4}><Card size="small"><Statistic title="Ochiq invoice" value={paymentInvoices.filter((item) => item.debtAmount > 0).length} /></Card></Col>
      </Row>

      <Row gutter={[10, 10]} className="kpi-strip">
        <Col xs={24} sm={12} lg={4}><Card size="small"><Statistic title="Hisoblangan" value={financial.grossBilled} formatter={(v) => formatMoney(Number(v))} /></Card></Col>
        <Col xs={24} sm={12} lg={4}><Card size="small"><Statistic title="Undirilgan" value={financial.collected} formatter={(v) => formatMoney(Number(v))} valueStyle={{ color: "#047857" }} /></Card></Col>
        <Col xs={24} sm={12} lg={4}><Card size="small"><Statistic title="Collection rate" value={financial.collectionRate} suffix="%" valueStyle={{ color: financial.collectionRate >= 90 ? "#047857" : "#b45309" }} /></Card></Col>
        <Col xs={24} sm={12} lg={4}><Card size="small"><Statistic title="Chegirma" value={financial.discountAmount} formatter={(v) => formatMoney(Number(v))} valueStyle={{ color: "#b45309" }} /></Card></Col>
        <Col xs={24} sm={12} lg={4}><Card size="small"><Statistic title="O'rtacha chek" value={financial.averageCheck} formatter={(v) => formatMoney(Number(v))} /></Card></Col>
        <Col xs={24} sm={12} lg={4}><Card size="small"><Statistic title="Ochiq qarz" value={financial.openDebtCount} suffix="invoice" valueStyle={{ color: "#b91c1c" }} /></Card></Col>
      </Row>

      <Row gutter={[10, 10]}>
        <Col xs={24} xl={16}>
          <Card size="small" title="Operatsion oqim" className="table-card">
            <Table rowKey="id" size="small" columns={columns} dataSource={operationRows} pagination={false} scroll={{ x: "max-content" }} />
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <section className="surface-panel ops-panel">
            <div className="surface-panel-header">
              <div>
                <strong>Ogohlantirishlar</strong>
                <Text type="secondary">Bugungi nazorat nuqtalari.</Text>
              </div>
            </div>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Tag color="orange">Laboratoriya kutmoqda: {dashboardMetrics.labWaiting}</Tag>
              <Tag color="purple">Diagnostika kutmoqda: {dashboardMetrics.diagnosticWaiting}</Tag>
              <Tag color="red">Qarzdor invoice: {paymentInvoices.filter((item) => item.debtAmount > 0).length}</Tag>
              <div className="finance-mix">
                <span>To&apos;lov yig&apos;ilishi</span>
                <Progress percent={financial.collectionRate} size="small" strokeColor={financial.collectionRate >= 90 ? "#047857" : "#b45309"} />
              </div>
              <div className="finance-mix">
                <span>Naqd / karta</span>
                <Progress
                  percent={financial.cashShare}
                  size="small"
                  success={{ percent: financial.cardShare }}
                  format={() => `${financial.cashShare}% / ${financial.cardShare}%`}
                />
              </div>
            </Space>
          </section>
        </Col>
      </Row>

      <Row gutter={[10, 10]}>
        <Col xs={24} xl={11}>
          <Card size="small" title="Xizmatlar bo'yicha tushum" className="table-card">
            <Table rowKey="id" size="small" columns={serviceColumns} dataSource={getServiceRevenueRows()} pagination={false} scroll={{ x: "max-content" }} />
          </Card>
        </Col>
        <Col xs={24} xl={7}>
          <Card size="small" title="Qarzdorlik nazorati" className="table-card">
            <Table rowKey="id" size="small" columns={debtColumns} dataSource={getDebtRows()} pagination={false} scroll={{ x: "max-content" }} />
          </Card>
        </Col>
        <Col xs={24} xl={6}>
          <Card size="small" title="Bo'lim yuklamasi" className="table-card">
            <Table rowKey="id" size="small" columns={departmentColumns} dataSource={getDepartmentLoadRows()} pagination={false} />
          </Card>
        </Col>
      </Row>
    </Space>
  );
}

function getFinancialKpis() {
  const grossBilled = paymentInvoices.reduce((sum, invoice) => sum + invoice.subtotal, 0);
  const netBilled = paymentInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  const collected = payments.filter((payment) => payment.status === "COMPLETED").reduce((sum, payment) => sum + payment.amount, 0);
  const discountAmount = paymentInvoices.reduce((sum, invoice) => sum + invoice.discountAmount, 0);
  const debt = paymentInvoices.reduce((sum, invoice) => sum + invoice.debtAmount, 0);
  const cash = payments.filter((payment) => payment.method === "CASH").reduce((sum, payment) => sum + payment.amount, 0);
  const card = payments.filter((payment) => payment.method === "CARD").reduce((sum, payment) => sum + payment.amount, 0);

  return {
    grossBilled,
    netBilled,
    collected,
    debt,
    discountAmount,
    collectionRate: netBilled ? Math.round((collected / netBilled) * 100) : 0,
    averageCheck: payments.length ? Math.round(collected / payments.length) : 0,
    openDebtCount: paymentInvoices.filter((invoice) => invoice.debtAmount > 0).length,
    cashShare: collected ? Math.round((cash / collected) * 100) : 0,
    cardShare: collected ? Math.round((card / collected) * 100) : 0,
  };
}

function getServiceRevenueRows(): ServiceRevenueRow[] {
  const grouped = new Map<string, ServiceRevenueRow>();

  paymentInvoiceItems.forEach((item) => {
    const service = services.find((entry) => entry.id === item.serviceId);
    const department = departments.find((entry) => entry.id === service?.departmentId);
    const current = grouped.get(item.serviceId) ?? {
      id: item.serviceId,
      serviceName: service?.name ?? item.serviceId,
      departmentName: department?.name ?? "-",
      count: 0,
      gross: 0,
      discount: 0,
      net: 0,
    };

    current.count += item.quantity;
    current.gross += item.unitPrice * item.quantity;
    current.discount += item.discountAmount;
    current.net += item.totalPrice;
    grouped.set(item.serviceId, current);
  });

  return [...grouped.values()].sort((a, b) => b.net - a.net);
}

function getDebtRows(): DebtRow[] {
  return paymentInvoices
    .filter((invoice) => invoice.debtAmount > 0)
    .map((invoice) => {
      const patient = patients.find((item) => item.id === invoice.patientId);
      return {
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        patientName: patient ? `${patient.lastName} ${patient.firstName}` : "-",
        totalAmount: invoice.totalAmount,
        debtAmount: invoice.debtAmount,
        issuedAt: invoice.issuedAt,
      };
    });
}

function getDepartmentLoadRows(): DepartmentLoadRow[] {
  return [
    {
      id: "reception",
      departmentName: "Registratura",
      waiting: appointments.filter((item) => ["SCHEDULED", "CONFIRMED", "ARRIVED"].includes(item.status)).length,
      inProgress: appointments.filter((item) => ["WAITING_PAYMENT", "WAITING_DOCTOR"].includes(item.status)).length,
      completed: appointments.filter((item) => item.status === "COMPLETED").length,
    },
    {
      id: "lab",
      departmentName: "Laboratoriya",
      waiting: labOrders.filter((item) => ["ORDERED", "WAITING_SAMPLE", "WAITING_PAYMENT"].includes(item.status)).length,
      inProgress: labOrders.filter((item) => ["SAMPLE_COLLECTED", "IN_PROGRESS", "READY_FOR_APPROVAL"].includes(item.status)).length,
      completed: labOrders.filter((item) => ["APPROVED", "DELIVERED"].includes(item.status)).length,
    },
    {
      id: "diagnostics",
      departmentName: "Diagnostika",
      waiting: diagnosticOrders.filter((item) => ["ORDERED", "WAITING_PAYMENT", "SCHEDULED"].includes(item.status)).length,
      inProgress: diagnosticOrders.filter((item) => ["IN_PROGRESS", "READY"].includes(item.status)).length,
      completed: diagnosticOrders.filter((item) => ["APPROVED", "DELIVERED"].includes(item.status)).length,
    },
  ];
}
