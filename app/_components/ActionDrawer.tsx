"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Alert, Button, Drawer, Dropdown, Form, Input, Select, Space } from "antd";
import type { ButtonProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";

export type PanelAction = {
  key: string;
  label: string;
  description?: string;
  danger?: boolean;
  primary?: boolean;
  fields?: ("reason" | "comment" | "target" | "date" | "amount")[];
};

type ActionSubmit = (action: PanelAction, values: Record<string, unknown>) => void;

export function ActionDropdown({
  actions,
  buttonLabel,
  onSubmit,
}: {
  actions: PanelAction[];
  buttonLabel?: string;
  onSubmit?: ActionSubmit;
}) {
  const [activeAction, setActiveAction] = useState<PanelAction | null>(null);

  return (
    <>
      <Dropdown
        trigger={["click"]}
        menu={{
          items: actions.map((action) => ({
            key: action.key,
            label: action.label,
            danger: action.danger,
          })),
          onClick: ({ key }) => setActiveAction(actions.find((action) => action.key === key) ?? null),
        }}
      >
        <Button size="small" icon={<MoreOutlined />}>
          {buttonLabel}
        </Button>
      </Dropdown>
      <ActionDrawer action={activeAction} onClose={() => setActiveAction(null)} onSubmit={onSubmit} />
    </>
  );
}

export function ActionButton({
  action,
  children,
  className,
  icon,
  size,
  onSubmit,
}: {
  action: PanelAction;
  children?: ReactNode;
  className?: ButtonProps["className"];
  icon?: ButtonProps["icon"];
  size?: ButtonProps["size"];
  onSubmit?: ActionSubmit;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className={className} danger={action.danger} icon={icon} size={size} type={action.primary ? "primary" : "default"} onClick={() => setOpen(true)}>
        {children ?? action.label}
      </Button>
      <ActionDrawer action={open ? action : null} onClose={() => setOpen(false)} onSubmit={onSubmit} />
    </>
  );
}

function ActionDrawer({ action, onClose, onSubmit }: { action: PanelAction | null; onClose: () => void; onSubmit?: ActionSubmit }) {
  const [submitted, setSubmitted] = useState(false);
  const [form] = Form.useForm();

  return (
    <Drawer
      title={action?.label}
      width={460}
      open={Boolean(action)}
      onClose={() => {
        setSubmitted(false);
        form.resetFields();
        onClose();
      }}
      destroyOnHidden
    >
      {action ? (
        <Space direction="vertical" size={14} style={{ width: "100%" }}>
          <Alert
            showIcon
            type={action.danger ? "warning" : "info"}
            message={action.description ?? "Bu amal demo workflow sifatida tayyorlandi. Backend ulanganda audit va status o'zgarishi bajariladi."}
          />
          {submitted ? <Alert showIcon type="success" message="Demo amal bajarildi" description="Real backend ulanganda bu yerda status, audit va bog'langan yozuvlar yangilanadi." /> : null}
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
              onSubmit?.(action, values);
              setSubmitted(true);
            }}
          >
            {action.fields?.includes("target") ? (
              <Form.Item label="Yo'nalish / target">
                <Select
                  options={[
                    { label: "Kassa", value: "cashier" },
                    { label: "Shifokor", value: "doctor" },
                    { label: "Laboratoriya", value: "laboratory" },
                    { label: "Diagnostika", value: "diagnostics" },
                    { label: "Hujjatlar", value: "documents" },
                  ]}
                />
              </Form.Item>
            ) : null}
            {action.fields?.includes("date") ? (
              <Form.Item label="Sana / vaqt">
                <Input placeholder="2026-04-28 10:30" />
              </Form.Item>
            ) : null}
            {action.fields?.includes("amount") ? (
              <Form.Item label="Summa">
                <Input placeholder="0" />
              </Form.Item>
            ) : null}
            {action.fields?.includes("reason") ? (
              <Form.Item label="Sabab" required>
                <Input.TextArea rows={3} />
              </Form.Item>
            ) : null}
            {action.fields?.includes("comment") || !action.fields?.length ? (
              <Form.Item label="Izoh">
                <Input.TextArea rows={3} />
              </Form.Item>
            ) : null}
            <Space>
              <Button type="primary" danger={action.danger} htmlType="submit">
                Tasdiqlash
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                  setSubmitted(false);
                  onClose();
                }}
              >
                Bekor qilish
              </Button>
            </Space>
          </Form>
        </Space>
      ) : null}
    </Drawer>
  );
}
