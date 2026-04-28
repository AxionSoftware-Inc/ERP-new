import { Tag } from "antd";
import type { DiagnosticOrder } from "../../_data/fakeClinicData";
import { diagnosticStatusColors, diagnosticStatusLabels } from "./diagnosticsData";

export function DiagnosticStatusTag({ status }: { status: DiagnosticOrder["status"] }) {
  return <Tag color={diagnosticStatusColors[status]}>{diagnosticStatusLabels[status]}</Tag>;
}
