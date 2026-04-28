"use client";

import Link from "next/link";
import { Button, Card, Descriptions, Empty, Space, Steps, Tag, Typography } from "antd";
import { FileDoneOutlined, PrinterOutlined } from "@ant-design/icons";
import { ActionButton } from "../../_components/ActionDrawer";
import { doctorActions } from "../../_lib/panelActions";
import { getDoctorAppointmentDetail } from "./doctorData";
import { DoctorSubnav } from "./DoctorSubnav";

const { Text, Title } = Typography;

export function DoctorFinishPage({ appointmentId }: { appointmentId: string }) {
  const detail = getDoctorAppointmentDetail(appointmentId);

  if (!detail) {
    return (
      <Card>
        <Empty description="Qabul topilmadi" />
      </Card>
    );
  }

  const { appointment, encounter } = detail;

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <DoctorSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Qabul yakunlash</Text>
          <Title level={2}>{appointment.patientName}</Title>
          <Text>Yakuniy tashxis, tavsiyalar, orderlar va hujjatlarni tekshirish.</Text>
        </div>
        <Space wrap>
          <Button icon={<PrinterOutlined />}>Chop etish</Button>
          <ActionButton action={{ ...doctorActions[4], primary: true }} icon={<FileDoneOutlined />}>Yakunlash va lock</ActionButton>
        </Space>
      </div>

      <Card size="small" title="Yakuniy tekshiruv">
        <Steps
          size="small"
          current={2}
          items={[
            { title: "Tibbiy yozuv" },
            { title: "Orderlar" },
            { title: "Retsept" },
            { title: "Hujjat" },
            { title: "Lock" },
          ]}
        />
      </Card>

      <Card size="small" title="Qabul xulosasi">
        <Descriptions bordered size="small" column={{ xs: 1, md: 2 }}>
          <Descriptions.Item label="Dastlabki tashxis">{encounter?.preliminaryDiagnosis ?? "-"}</Descriptions.Item>
          <Descriptions.Item label="Yakuniy tashxis">{encounter?.finalDiagnosis ?? "-"}</Descriptions.Item>
          <Descriptions.Item label="ICD">{encounter?.icdCode ?? "-"}</Descriptions.Item>
          <Descriptions.Item label="Takroriy qabul">{encounter?.followUpDate ?? "-"}</Descriptions.Item>
          <Descriptions.Item label="Davolash rejasi" span={2}>{encounter?.treatmentPlan ?? "-"}</Descriptions.Item>
          <Descriptions.Item label="Tavsiyalar" span={2}>{encounter?.recommendations ?? "-"}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card size="small" title="Bog'langan ishlar">
        <Space wrap>
          <Tag color="blue">Lab order: {detail.patientLabOrders.length}</Tag>
          <Tag color="purple">Diagnostika: {detail.patientDiagnosticOrders.length}</Tag>
          <Tag color="green">Retsept: {detail.patientPrescriptions.length}</Tag>
          <Tag>Hujjat: {detail.patientDocuments.length}</Tag>
        </Space>
      </Card>

      <Link href={`/doctor/appointments/${appointment.id}`}>
        <Button>Qabul oynasiga qaytish</Button>
      </Link>
    </Space>
  );
}
