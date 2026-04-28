"use client";

import { Card, Space, Switch, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { roles } from "../../_data/fakeClinicData";

const { Text, Title } = Typography;

const modules = ["dashboard", "reception", "patients", "doctor", "laboratory", "diagnostics", "cashier", "reports", "settings", "access", "audit"];
const permissions = ["view", "create", "update", "approve", "export"];

type Row = {
  id: string;
  module: string;
  [key: string]: string | boolean;
};

export function PermissionsMatrixPage() {
  const activeRoles = roles.slice(0, 5);
  const rows: Row[] = modules.map((module) => {
    const row: Row = { id: module, module };
    activeRoles.forEach((role) => {
      permissions.forEach((permission) => {
        row[`${role.code}-${permission}`] = resolveDefault(role.code, module, permission);
      });
    });
    return row;
  });

  const columns: ColumnsType<Row> = [
    { title: "Modul", dataIndex: "module", width: 150, fixed: "left", render: (value: string) => <Tag>{value}</Tag> },
    ...activeRoles.map((role) => ({
      title: role.code,
      children: permissions.map((permission) => ({
        title: permission,
        dataIndex: `${role.code}-${permission}`,
        width: 82,
        render: (value: boolean) => <Switch checked={value} size="small" />,
      })),
    })),
  ];

  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <div className="erp-ant-page-header reception-command-header">
        <div>
          <Text type="secondary">Access</Text>
          <Title level={2}>Ruxsatlar matritsasi</Title>
          <Text>Rollar kesimida view, create, update, approve va export ruxsatlari.</Text>
        </div>
      </div>
      <Card size="small" className="table-card">
        <Table rowKey="id" size="small" columns={columns} dataSource={rows} scroll={{ x: "max-content" }} pagination={false} />
      </Card>
    </Space>
  );
}

function resolveDefault(role: string, module: string, permission: string) {
  if (role === "DIRECTOR") return true;
  if (role === "REGISTRAR") return ["reception", "patients"].includes(module) && permission !== "approve";
  if (role === "DOCTOR") return ["doctor", "patients", "laboratory", "diagnostics"].includes(module) && ["view", "create", "update"].includes(permission);
  if (role === "CASHIER") return ["cashier", "reports"].includes(module) && permission !== "approve";
  if (role === "LAB_TECHNICIAN") return module === "laboratory" && ["view", "create", "update", "approve"].includes(permission);
  return permission === "view";
}
