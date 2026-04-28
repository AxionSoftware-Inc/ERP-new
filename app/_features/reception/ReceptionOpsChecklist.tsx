"use client";

import { Alert, List, Space, Tag, Typography } from "antd";
import { ActionButton } from "../../_components/ActionDrawer";
import { receptionActions } from "../../_lib/panelActions";
import { getReceptionMetrics } from "./receptionData";

const { Text } = Typography;

export function ReceptionOpsChecklist() {
  const metrics = getReceptionMetrics();
  const items = [
    {
      title: "To'lov kutayotgan bemorlar",
      count: metrics.waitingPayment,
      tone: metrics.waitingPayment > 0 ? "orange" : "green",
      action: "Kassaga yuborish",
      panelAction: receptionActions[1],
    },
    {
      title: "Shifokor kutayotgan bemorlar",
      count: metrics.waitingDoctor,
      tone: metrics.waitingDoctor > 0 ? "blue" : "green",
      action: "Navbatni tekshirish",
      panelAction: receptionActions[2],
    },
    {
      title: "Follow-up qo'ng'iroqlar",
      count: metrics.callFollowUps,
      tone: metrics.callFollowUps > 0 ? "volcano" : "green",
      action: "Qo'ng'iroqlar",
      panelAction: { ...receptionActions[0], label: "Qo'ng'iroq qayd qilish" },
    },
    {
      title: "No-show nazorati",
      count: metrics.noShow,
      tone: metrics.noShow > 0 ? "red" : "green",
      action: "Qayta yozish",
      panelAction: receptionActions[3],
    },
  ];

  return (
    <section className="surface-panel ops-panel">
      <div className="surface-panel-header">
        <div>
          <strong>Front desk nazorat</strong>
          <Text type="secondary">Registrator smena davomida e&apos;tibor beradigan ishlar.</Text>
        </div>
      </div>
      <Alert
        showIcon
        type="warning"
        message="Qabulni shifokorga yuborishdan oldin to'lov va navbat holatini tekshiring."
        className="compact-alert"
      />
      <List
        size="small"
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            actions={[
              <ActionButton action={item.panelAction} size="small" key={item.action}>
                {item.action}
              </ActionButton>,
            ]}
          >
            <Space>
              <Tag color={item.tone}>{item.count}</Tag>
              <span>{item.title}</span>
            </Space>
          </List.Item>
        )}
      />
    </section>
  );
}
