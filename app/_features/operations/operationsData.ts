export const inventoryItems = [
  { id: "inv-item-001", sku: "MED-GLOVE-M", name: "Steril qo'lqop M", category: "Consumable", unit: "box", stock: 18, minStock: 25, expiryDate: "2026-09-30", status: "LOW_STOCK" },
  { id: "inv-item-002", sku: "LAB-TUBE-EDTA", name: "EDTA probirka", category: "Lab", unit: "pcs", stock: 420, minStock: 100, expiryDate: "2027-01-20", status: "OK" },
  { id: "inv-item-003", sku: "DIS-SYR-5ML", name: "Shprits 5 ml", category: "Consumable", unit: "pcs", stock: 65, minStock: 80, expiryDate: "2026-06-15", status: "LOW_STOCK" },
  { id: "inv-item-004", sku: "REAG-GLU", name: "Glucose reagent", category: "Reagent", unit: "kit", stock: 9, minStock: 6, expiryDate: "2026-05-25", status: "EXPIRING" },
];

export const stockMovements = [
  { id: "mov-001", itemName: "EDTA probirka", type: "IN", quantity: 200, department: "Laboratoriya", actor: "lab.gulnoza", createdAt: "2026-04-27T08:40:00+05:00" },
  { id: "mov-002", itemName: "Steril qo'lqop M", type: "OUT", quantity: 4, department: "Terapiya", actor: "doctor.aziza", createdAt: "2026-04-27T09:12:00+05:00" },
  { id: "mov-003", itemName: "Glucose reagent", type: "OUT", quantity: 1, department: "Laboratoriya", actor: "lab.gulnoza", createdAt: "2026-04-27T10:08:00+05:00" },
];

export const purchaseRequests = [
  { id: "pr-001", number: "PR-20260427-001", department: "Laboratoriya", requester: "Gulnoza Rasulova", requiredDate: "2026-04-29", status: "PENDING_APPROVAL", reason: "Glyukoza reagent zaxirasi kamaygan" },
  { id: "pr-002", number: "PR-20260427-002", department: "Terapiya", requester: "Aziza Karimova", requiredDate: "2026-05-02", status: "APPROVED", reason: "Shprits va qo'lqop zaxirasi" },
];

export const purchaseOrders = [
  { id: "po-001", number: "PO-20260427-001", supplierName: "MedSupply Group", amount: 2_400_000, orderedAt: "2026-04-27", expectedAt: "2026-04-30", status: "ORDERED" },
  { id: "po-002", number: "PO-20260426-001", supplierName: "LabTech Service", amount: 1_150_000, orderedAt: "2026-04-26", expectedAt: "2026-04-28", status: "PARTIALLY_RECEIVED" },
];

export const suppliers = [
  { id: "sup-001", name: "MedSupply Group", phone: "+998 90 700 10 10", email: "sales@medsupply.uz", taxId: "309001234", debt: 0, status: "ACTIVE" },
  { id: "sup-002", name: "LabTech Service", phone: "+998 90 711 20 20", email: "order@labtech.uz", taxId: "309005678", debt: 650_000, status: "ACTIVE" },
];

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("uz-UZ", { dateStyle: "short" }).format(new Date(value));
}
