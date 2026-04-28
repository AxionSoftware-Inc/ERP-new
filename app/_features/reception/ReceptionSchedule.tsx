"use client";

import Link from "next/link";
import { Button, Card, DatePicker, Select, Space, Tag, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { formatTime, getDoctorOptions, getReceptionAppointments } from "./receptionData";
import { ReceptionStatusTag } from "./ReceptionStatusTag";
import { ReceptionSubnav } from "./ReceptionSubnav";

const { Text, Title } = Typography;

export function ReceptionSchedule() {
  const rows = getReceptionAppointments();

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <ReceptionSubnav />
      <div className="erp-ant-page-header">
        <div>
          <Text type="secondary">Registratura</Text>
          <Title level={2}>Qabul jadvali</Title>
          <Text>Shifokorlar kesimida band va bo&apos;sh vaqtlarni ko&apos;rish.</Text>
        </div>
        <Link href="/reception/appointments/new">
          <Button type="primary" icon={<PlusOutlined />}>
            Qabul qo&apos;shish
          </Button>
        </Link>
      </div>

      <Card size="small">
        <Space wrap>
          <DatePicker placeholder="Sana" />
          <Select allowClear placeholder="Shifokor" style={{ width: 240 }} options={getDoctorOptions()} />
          <Select
            allowClear
            placeholder="Ko'rinish"
            style={{ width: 160 }}
            options={[
              { label: "Kunlik", value: "day" },
              { label: "Haftalik", value: "week" },
              { label: "Shifokor bo'yicha", value: "doctor" },
            ]}
          />
          <Button>Bugun</Button>
        </Space>
      </Card>

      <Card size="small" className="table-card">
        <div className="schedule-grid">
          {rows.map((appointment) => (
            <Link className="schedule-slot" href={`/reception/appointments/${appointment.id}`} key={appointment.id}>
              <strong>{formatTime(appointment.scheduledAt)}</strong>
              <span>{appointment.patientName}</span>
              <small>{appointment.doctorName}</small>
              <div>
                <ReceptionStatusTag status={appointment.status} />
                <Tag>{appointment.queueTicket ?? "Navbat yo'q"}</Tag>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </Space>
  );
}
