"use client";

import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    borderRadius: 6,
    colorPrimary: "#0f766e",
    fontSize: 13,
    controlHeight: 34,
    controlHeightSM: 28,
  },
  components: {
    Card: {
      paddingLG: 16,
    },
    Table: {
      cellPaddingBlockSM: 8,
      cellPaddingInlineSM: 10,
      headerBg: "#f8fafc",
      headerColor: "#475569",
    },
  },
};

export function AntdProvider({ children }: { children: React.ReactNode }) {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
