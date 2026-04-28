"use client";

import { Button, DatePicker, Drawer, Form, Input, Select, Space } from "antd";

export function QuickPatientDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer title="Tez bemor yaratish" width={520} open={open} onClose={onClose} destroyOnHidden>
      <Form layout="vertical" className="dense-form">
        <Form.Item label="Familiya" required>
          <Input placeholder="Aliyev" />
        </Form.Item>
        <Form.Item label="Ism" required>
          <Input placeholder="Sardor" />
        </Form.Item>
        <Form.Item label="Telefon" required>
          <Input placeholder="+998 90 000 00 00" />
        </Form.Item>
        <Form.Item label="Jins">
          <Select
            options={[
              { label: "Erkak", value: "MALE" },
              { label: "Ayol", value: "FEMALE" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Tug'ilgan sana">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Allergiya / ogohlantirish">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Space>
          <Button type="primary">Saqlash va tanlash</Button>
          <Button onClick={onClose}>Bekor qilish</Button>
        </Space>
      </Form>
    </Drawer>
  );
}
