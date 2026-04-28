"use client";

import { Card, Empty, Space, Timeline, Typography } from "antd";
import { formatDateTime, getPatientDetail } from "./patientData";

const { Text, Title } = Typography;

export function PatientMedicalHistoryPage({ patientId }: { patientId: string }) {
  const detail = getPatientDetail(patientId);
  if (!detail) return <Card><Empty description="Bemor topilmadi" /></Card>;
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <div className="erp-ant-page-header reception-command-header">
        <div><Text type="secondary">Medical history</Text><Title level={2}>{detail.patient.fullName}</Title><Text>Shifokor yozuvlari, laboratoriya va diagnostika natijalari.</Text></div>
      </div>
      <Card size="small" title="To'liq tibbiy tarix">
        <Timeline
          items={[
            ...detail.encounters.map((item) => ({ children: `${item.preliminaryDiagnosis} · ${item.treatmentPlan}` })),
            ...detail.labs.map((item) => ({ children: `${formatDateTime(item.orderedAt)} · Lab order ${item.orderNumber} · ${item.status}` })),
            ...detail.diagnostics.map((item) => ({ children: `${formatDateTime(item.scheduledAt)} · Diagnostic · ${item.status}` })),
          ]}
        />
      </Card>
    </Space>
  );
}
