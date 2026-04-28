"use client";

import Link from "next/link";
import { useState } from "react";
import { Alert, Button, Card, DatePicker, Form, Input, Select, Space, Tag, TimePicker, Typography } from "antd";
import { SaveOutlined, UserAddOutlined } from "@ant-design/icons";
import { formatMoney, getAvailableSlots, getDoctorOptions, getPatientOptions, getServiceOptions } from "./receptionData";
import { ReceptionSubnav } from "./ReceptionSubnav";
import { QuickPatientDrawer } from "./QuickPatientDrawer";

const { Text, Title } = Typography;

export function NewAppointmentForm() {
  const [quickPatientOpen, setQuickPatientOpen] = useState(false);
  const slots = getAvailableSlots();

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <ReceptionSubnav />
      <div className="erp-ant-page-header">
        <div>
          <Text type="secondary">Registratura</Text>
          <Title level={2}>Yangi qabul yaratish</Title>
          <Text>Bemor, shifokor, xizmat, sana va vaqtni tanlab qabul yaratish.</Text>
        </div>
        <Space>
          <Button icon={<UserAddOutlined />} onClick={() => setQuickPatientOpen(true)}>
            Tez bemor
          </Button>
          <Link href="/reception/appointments">
            <Button>Qabullar ro&apos;yxati</Button>
          </Link>
        </Space>
      </div>

      <Alert
        type="info"
        showIcon
        message="Hozircha demo forma"
        description="Bu bosqichda forma fake data bilan ishlaydi. Backend ulanganda band vaqt, to'lov qoidasi va audit validatsiyalari qo'shiladi."
      />

      <Card size="small" title="Qabul ma'lumotlari">
        <Form layout="vertical" className="dense-form">
          <div className="form-grid">
            <Form.Item label="Bemor" name="patientId" rules={[{ required: true, message: "Bemor tanlang" }]}>
              <Select
                showSearch
                placeholder="Bemor tanlash"
                options={getPatientOptions()}
                optionFilterProp="label"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <div className="select-footer-action">
                      <Button type="link" icon={<UserAddOutlined />} onClick={() => setQuickPatientOpen(true)}>
                        Yangi bemor qo&apos;shish
                      </Button>
                    </div>
                  </>
                )}
              />
            </Form.Item>

            <Form.Item label="Shifokor" name="doctorProfileId" rules={[{ required: true, message: "Shifokor tanlang" }]}>
              <Select showSearch placeholder="Shifokor tanlash" options={getDoctorOptions()} optionFilterProp="label" />
            </Form.Item>

            <Form.Item label="Xizmat" name="serviceId" rules={[{ required: true, message: "Xizmat tanlang" }]}>
              <Select showSearch placeholder="Xizmat tanlash" options={getServiceOptions()} optionFilterProp="label" />
            </Form.Item>

            <Form.Item label="Sana" name="date" rules={[{ required: true, message: "Sana tanlang" }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Vaqt" name="time" rules={[{ required: true, message: "Vaqt tanlang" }]}>
              <TimePicker format="HH:mm" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Qabul turi" name="type" initialValue="FIRST_VISIT">
              <Select
                options={[
                  { label: "Birinchi qabul", value: "FIRST_VISIT" },
                  { label: "Takroriy qabul", value: "FOLLOW_UP" },
                  { label: "Shoshilinch", value: "URGENT" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Manba" name="source" initialValue="WALK_IN">
              <Select
                options={[
                  { label: "Joyida", value: "WALK_IN" },
                  { label: "Telefon", value: "PHONE" },
                  { label: "Online", value: "ONLINE" },
                  { label: "Shifokor yo'llanmasi", value: "DOCTOR_REFERRAL" },
                ]}
              />
            </Form.Item>
          </div>

          <section className="form-section">
            <div className="form-section-header">
              <strong>Bo&apos;sh slotlar va band vaqtlar</strong>
              <span>Shifokor jadvali bo&apos;yicha tanlash uchun.</span>
            </div>
            <div className="slot-grid">
              {slots.map((slot) => (
                <button className={slot.status === "FREE" ? "slot-button free" : "slot-button booked"} key={slot.time} type="button">
                  <strong>{slot.time}</strong>
                  <span>{slot.status === "FREE" ? "Bo'sh" : slot.patientName}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="form-section compact">
            <div className="form-section-header">
              <strong>To&apos;lov va navbat qoidasi</strong>
              <span>Reception qabulni qayerga yuborishini oldindan ko&apos;radi.</span>
            </div>
            <Space wrap>
              <Tag color="orange">Oldindan to&apos;lov talab qilinadi</Tag>
              <Tag>Terapevt qabuli: {formatMoney(150000)}</Tag>
              <Tag>Navbat boshlanishi: Kassa</Tag>
            </Space>
          </section>

          <section className="form-section compact">
            <div className="form-section-header">
              <strong>Reception handoff</strong>
              <span>Qabul saqlangandan keyingi yo&apos;nalish.</span>
            </div>
            <Space wrap>
              <Tag color="blue">Invoice yaratish</Tag>
              <Tag color="orange">Kassa navbati</Tag>
              <Tag color="green">To&apos;lovdan keyin shifokor navbati</Tag>
              <Tag>Audit: qabul yaratildi</Tag>
            </Space>
          </section>

          <Form.Item label="Sabab yoki izoh" name="reason">
            <Input.TextArea rows={4} placeholder="Bemor murojaati sababi" />
          </Form.Item>

          <div className="sticky-actions">
            <Space>
              <Button type="primary" icon={<SaveOutlined />}>
                Saqlash
              </Button>
              <Button>Saqlash va to&apos;lovga yuborish</Button>
              <Link href="/reception">
                <Button>Bekor qilish</Button>
              </Link>
            </Space>
          </div>
        </Form>
      </Card>

      <QuickPatientDrawer open={quickPatientOpen} onClose={() => setQuickPatientOpen(false)} />
    </Space>
  );
}
