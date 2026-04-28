"use client";

import Link from "next/link";
import { Button, Card, Descriptions, Empty, Space, Steps, Tag, Timeline, Typography } from "antd";
import type { TimelineItemProps } from "antd";
import { ArrowLeftOutlined, PrinterOutlined } from "@ant-design/icons";
import { ActionButton, ActionDropdown } from "../../_components/ActionDrawer";
import { receptionActions } from "../../_lib/panelActions";
import {
  appointmentSourceLabels,
  appointmentTypeLabels,
  formatMoney,
  formatDateTime,
  getReceptionAppointments,
  queueStepLabels,
} from "./receptionData";
import { ReceptionStatusTag } from "./ReceptionStatusTag";
import { ReceptionSubnav } from "./ReceptionSubnav";
import { PaymentStatusTag } from "./PaymentStatusTag";

const { Text, Title } = Typography;

export function ReceptionAppointmentDetail({ appointmentId }: { appointmentId: string }) {
  const appointment = getReceptionAppointments().find((item) => item.id === appointmentId);

  if (!appointment) {
    return (
      <Card>
        <Empty description="Qabul topilmadi" />
      </Card>
    );
  }

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <ReceptionSubnav />
      <div className="erp-ant-page-header">
        <div>
          <Text type="secondary">Qabul tafsiloti</Text>
          <Title level={2}>{appointment.appointmentNumber}</Title>
          <Space wrap>
            <ReceptionStatusTag status={appointment.status} />
            <Tag>{appointmentTypeLabels[appointment.type]}</Tag>
            <Tag>{appointmentSourceLabels[appointment.source]}</Tag>
          </Space>
        </div>
        <Space wrap>
          <Link href="/reception/appointments">
            <Button icon={<ArrowLeftOutlined />}>Ro&apos;yxatga qaytish</Button>
          </Link>
          <Button icon={<PrinterOutlined />}>Chop etish</Button>
          <ActionButton action={receptionActions[0]}>Kelganini belgilash</ActionButton>
          <ActionDropdown actions={receptionActions.slice(1)} />
        </Space>
      </div>

      <Card size="small" title="Qabul ma'lumotlari">
        <Descriptions size="small" bordered column={{ xs: 1, md: 2, xl: 3 }}>
          <Descriptions.Item label="Bemor">
            <Link href={`/patients/${appointment.patientId}`}>{appointment.patientName}</Link>
          </Descriptions.Item>
          <Descriptions.Item label="Telefon">{appointment.patientPhone}</Descriptions.Item>
          <Descriptions.Item label="Shifokor">{appointment.doctorName}</Descriptions.Item>
          <Descriptions.Item label="Xizmat">{appointment.serviceName}</Descriptions.Item>
          <Descriptions.Item label="Sana va vaqt">{formatDateTime(appointment.scheduledAt)}</Descriptions.Item>
          <Descriptions.Item label="Davomiylik">{appointment.durationMinutes} daqiqa</Descriptions.Item>
          <Descriptions.Item label="Navbat">{appointment.queueTicket ?? "Hali berilmagan"}</Descriptions.Item>
          <Descriptions.Item label="Navbat bosqichi">
            {appointment.queueStep ? queueStepLabels[appointment.queueStep] : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="To'lov">
            <PaymentStatusTag status={appointment.paymentStatus} />
          </Descriptions.Item>
          <Descriptions.Item label="Invoice">{appointment.invoiceNumber ?? "-"}</Descriptions.Item>
          <Descriptions.Item label="Qarzdorlik">{formatMoney(appointment.debtAmount)}</Descriptions.Item>
          <Descriptions.Item label="Sabab" span={2}>
            {appointment.reason}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {appointment.patientWarnings.length ? (
        <Card size="small" title="Bemor ogohlantirishlari">
          <Space wrap>
            {appointment.patientWarnings.map((warning) => (
              <Tag color="volcano" key={warning}>
                {warning}
              </Tag>
            ))}
          </Space>
        </Card>
      ) : null}

      <Card size="small" title="Jarayon bosqichlari">
        <Steps
          size="small"
          current={resolveStep(appointment.status)}
          items={[
            { title: "Yaratildi" },
            { title: "Keldi" },
            { title: "To'lov" },
            { title: "Shifokor" },
            { title: "Yakunlandi" },
          ]}
        />
      </Card>

      <Card size="small" title="Timeline">
        <Timeline items={getTimelineItems(appointment)} />
      </Card>
    </Space>
  );
}

function getTimelineItems(appointment: {
  scheduledAt: string;
  checkedInAt?: string;
  startedAt?: string;
  finishedAt?: string;
}): TimelineItemProps[] {
  const items: TimelineItemProps[] = [{ children: `Qabul vaqti: ${formatDateTime(appointment.scheduledAt)}` }];

  if (appointment.checkedInAt) items.push({ children: `Bemor kelgan: ${formatDateTime(appointment.checkedInAt)}` });
  if (appointment.startedAt) items.push({ children: `Qabul boshlangan: ${formatDateTime(appointment.startedAt)}` });
  if (appointment.finishedAt) items.push({ children: `Qabul yakunlangan: ${formatDateTime(appointment.finishedAt)}` });

  return items;
}

function resolveStep(status: string) {
  if (status === "COMPLETED") return 4;
  if (status === "IN_PROGRESS") return 3;
  if (status === "WAITING_DOCTOR") return 3;
  if (status === "WAITING_PAYMENT") return 2;
  if (status === "ARRIVED") return 1;
  return 0;
}
