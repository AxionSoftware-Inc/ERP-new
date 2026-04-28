"use client";

import Link from "next/link";
import { Alert, Button, Card, Col, DatePicker, Descriptions, Empty, Form, Input, Row, Select, Space, Tag, Timeline, Typography } from "antd";
import { ExperimentOutlined, FileDoneOutlined, MedicineBoxOutlined, SaveOutlined, ScanOutlined } from "@ant-design/icons";
import { ActionButton } from "../../_components/ActionDrawer";
import { doctorActions } from "../../_lib/panelActions";
import { getDoctorAppointmentDetail } from "./doctorData";
import { DoctorStatusTag } from "./DoctorStatusTag";
import { DoctorSubnav } from "./DoctorSubnav";

const { Text, Title } = Typography;

export function DoctorEncounterPage({ appointmentId }: { appointmentId: string }) {
  const detail = getDoctorAppointmentDetail(appointmentId);

  if (!detail) {
    return (
      <Card>
        <Empty description="Qabul topilmadi" />
      </Card>
    );
  }

  const { appointment, patient, encounter } = detail;

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <DoctorSubnav />
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Doctor qabul oynasi</Text>
          <Title level={2}>{appointment.patientName}</Title>
          <Space wrap>
            <DoctorStatusTag status={appointment.status} />
            {appointment.patientWarnings.map((warning) => (
              <Tag color="volcano" key={warning}>{warning}</Tag>
            ))}
          </Space>
        </div>
        <Space wrap>
          <ActionButton action={doctorActions[1]} icon={<ExperimentOutlined />}>Lab order</ActionButton>
          <ActionButton action={doctorActions[2]} icon={<ScanOutlined />}>Diagnostika</ActionButton>
          <ActionButton action={doctorActions[3]} icon={<MedicineBoxOutlined />}>Retsept</ActionButton>
          <Link href={`/doctor/appointments/${appointment.id}/finish`}>
            <Button type="primary" icon={<FileDoneOutlined />}>Yakunlash</Button>
          </Link>
        </Space>
      </div>

      <Row gutter={[10, 10]}>
        <Col xs={24} xl={6}>
          <section className="surface-panel">
            <div className="surface-panel-header">
              <div>
                <strong>Bemor summary</strong>
                <Text type="secondary">{patient?.patientNumber}</Text>
              </div>
            </div>
            <Descriptions size="small" column={1}>
              <Descriptions.Item label="Telefon">{patient?.phone}</Descriptions.Item>
              <Descriptions.Item label="Yosh">{appointment.patientAge}</Descriptions.Item>
              <Descriptions.Item label="Qon guruhi">{patient?.bloodType ?? "-"}</Descriptions.Item>
              <Descriptions.Item label="Sabab">{appointment.reason}</Descriptions.Item>
            </Descriptions>
          </section>

          <section className="surface-panel stacked-panel">
            <div className="surface-panel-header">
              <div>
                <strong>Oxirgi tarix</strong>
                <Text type="secondary">Qabul, lab va diagnostika.</Text>
              </div>
            </div>
            <Timeline
              items={[
                ...detail.patientEncounters.map((item) => ({
                  children: `${item.preliminaryDiagnosis} · ${item.status}`,
                })),
                ...detail.latestLabResults.map((item) => ({
                  children: `${item.testName}: ${item.value} ${item.unit}`,
                })),
                ...detail.diagnosticResults.map((item) => ({
                  children: item.conclusion,
                })),
              ]}
            />
          </section>
        </Col>

        <Col xs={24} xl={18}>
          <Card size="small" title="Tibbiy yozuv">
            <Alert
              showIcon
              type={encounter?.status === "LOCKED" ? "warning" : "info"}
              message={encounter?.status === "LOCKED" ? "Bu qabul lock qilingan" : "Draft yozuv autosave uchun tayyorlanadi"}
              className="compact-alert"
            />
            <Form layout="vertical" className="dense-form">
              <div className="form-grid two-col">
                <Form.Item label="Shikoyatlar" initialValue={encounter?.chiefComplaint}>
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Anamnez" initialValue={encounter?.anamnesis}>
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Obyektiv ko'rik" initialValue={encounter?.objectiveExam}>
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Dastlabki tashxis" initialValue={encounter?.preliminaryDiagnosis}>
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Yakuniy tashxis" initialValue={encounter?.finalDiagnosis}>
                  <Input />
                </Form.Item>
                <Form.Item label="ICD kod" initialValue={encounter?.icdCode}>
                  <Select
                    showSearch
                    placeholder="ICD kod"
                    options={[
                      { label: "I10 - Essensial gipertenziya", value: "I10" },
                      { label: "J06.9 - O'tkir respirator infeksiya", value: "J06.9" },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Davolash rejasi" initialValue={encounter?.treatmentPlan}>
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Tavsiyalar" initialValue={encounter?.recommendations}>
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Takroriy qabul sanasi" initialValue={encounter?.followUpDate}>
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </div>

              <div className="sticky-actions">
                <Space>
                  <ActionButton action={{ ...doctorActions[0], label: "Draft saqlash", primary: true }} icon={<SaveOutlined />}>Draft saqlash</ActionButton>
                  <ActionButton action={doctorActions[1]}>Lab order</ActionButton>
                  <ActionButton action={doctorActions[2]}>Diagnostika order</ActionButton>
                  <ActionButton action={doctorActions[3]}>Retsept</ActionButton>
                  <Link href="/doctor">
                    <Button>Orqaga</Button>
                  </Link>
                </Space>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
