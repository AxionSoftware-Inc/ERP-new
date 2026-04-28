"use client";

import Link from "next/link";
import { Empty, Space, Tag, Typography } from "antd";
import type { AppointmentStatus } from "../../_data/fakeClinicData";
import { getReceptionAppointments, queueStepLabels } from "./receptionData";
import { ReceptionStatusTag } from "./ReceptionStatusTag";
import { PaymentStatusTag } from "./PaymentStatusTag";

const { Text } = Typography;

const columns: { title: string; statuses: AppointmentStatus[] }[] = [
  { title: "To'lov kutmoqda", statuses: ["WAITING_PAYMENT"] },
  { title: "Shifokor kutmoqda", statuses: ["WAITING_DOCTOR"] },
  { title: "Jarayonda", statuses: ["IN_PROGRESS"] },
  { title: "Yakunlangan", statuses: ["COMPLETED"] },
];

export function WorkflowBoard() {
  const appointments = getReceptionAppointments();

  return (
    <div className="workflow-lanes">
      {columns.map((column) => {
        const rows = appointments.filter((appointment) => column.statuses.includes(appointment.status));

        return (
          <section className="workflow-lane" key={column.title}>
            <header>
              <strong>{column.title}</strong>
              <Tag>{rows.length}</Tag>
            </header>
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              {rows.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Yozuv yo'q" /> : null}
              {rows.map((appointment) => (
                <div className="workflow-item" key={appointment.id}>
                  <Space direction="vertical" size={4} style={{ width: "100%" }}>
                    <Link href={`/reception/appointments/${appointment.id}`}>{appointment.patientName}</Link>
                    <Text type="secondary">{appointment.serviceName}</Text>
                    <Space wrap>
                      <ReceptionStatusTag status={appointment.status} />
                      <PaymentStatusTag status={appointment.paymentStatus} />
                      {appointment.queueStep ? <Tag>{queueStepLabels[appointment.queueStep]}</Tag> : null}
                    </Space>
                  </Space>
                </div>
              ))}
            </Space>
          </section>
        );
      })}
    </div>
  );
}
