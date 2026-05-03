# Clinic ERP / HIS Components

## Purpose

This document defines the shared frontend component system for the clinic ERP/HIS.

The system must be built from reusable, workflow-aware, operator-first components.

Pages should not create unique layouts from scratch. They must compose shared components.

---

# Component Principles

## 1. Build shared components before module pages

Before implementing Reception, Doctor, Lab, Cashier, or other pages, build the shared UI foundation.

Initial shared components:

```txt
AppShell
Sidebar
Topbar
WorkspaceHeader
SummaryStrip
QueueSection
OperatorCaseRow
StatusBadge
DetailWorkspace
StickyCommandBar
RightContextRail
Timeline
DataTableShell
EmptyState
```

---

## 2. Components must be data-contract friendly

Components should receive props shaped like future API responses.

Do not hardcode clinic-specific mock data inside components.

Good:

```tsx
<OperatorCaseRow item={visit} />
```

Bad:

```tsx
<OperatorCaseRow patientName="Aliyev Sardor" status="Waiting" />
```

---

## 3. Components must be dense by default

Use compact spacing, clear typography, and practical layout.

Avoid:
- Huge decorative cards
- Marketing UI
- Random gradients
- Excessive icons
- Large empty spaces

---

## 4. Components must support workflow-aware actions

Components that show operational records must support:

```txt
status badge
next action
primary CTA
secondary actions
disabled action reason
target route
```

---

# Layout Components

## 1. AppShell

**Purpose:**  
Global authenticated app layout.

**Used by:**
- All `/app/*` routes

**Responsibilities:**
- Render topbar
- Render sidebar
- Render page content
- Support collapsed sidebar
- Support role-aware navigation later

**Suggested file:**

```txt
components/layout/app-shell.tsx
```

**Props:**

```ts
type AppShellProps = {
  children: React.ReactNode
  currentUser?: UserSummary
  currentBranch?: BranchSummary
}
```

**Layout:**

```txt
Topbar
Sidebar + main content
```

**Rules:**
- Do not put page-specific logic here.
- Keep it stable.
- All authenticated pages should use it.
- Sidebar should be collapsible.
- Main content should support full-width dense pages.

---

## 2. Sidebar

**Purpose:**  
Primary module navigation.

**Suggested file:**

```txt
components/layout/sidebar.tsx
```

**Props:**

```ts
type SidebarNavItem = {
  label: string
  href: string
  icon?: React.ReactNode
  group?: "clinical" | "business" | "management" | "system"
  badgeCount?: number
  roles?: string[]
}

type SidebarProps = {
  items: SidebarNavItem[]
  activePath?: string
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}
```

**Default groups:**

```txt
Clinical
Business
Management
System
```

**Rules:**
- Active route must be obvious.
- Items should be grouped.
- RBAC filtering can be added later.
- Do not show all nested routes in sidebar.
- Sidebar should link to workspace/root pages.

---

## 3. Topbar

**Purpose:**  
Global search, branch context, notifications, user controls.

**Suggested file:**

```txt
components/layout/topbar.tsx
```

**Props:**

```ts
type TopbarProps = {
  title?: string
  breadcrumb?: {
    label: string
    href?: string
  }[]
  currentBranch?: BranchSummary
  currentUser?: UserSummary
  notificationCount?: number
  onSearch?: (query: string) => void
}
```

**Elements:**

```txt
Page/module title
Global search
Branch selector
Notifications
User menu
```

**Rules:**
- Compact height.
- Global search should be visible.
- Branch selector should be visible if branch exists.
- Avoid large header duplication with page header.

---

# Workspace Components

## 4. WorkspaceHeader

**Purpose:**  
Top section of operational workspace pages.

**Used by:**
- Reception
- Doctor
- Lab
- Cashier
- Nursing
- Radiology
- Pharmacy
- Inventory
- HR
- Finance

**Suggested file:**

```txt
components/workspace/workspace-header.tsx
```

**Props:**

```ts
type WorkspaceHeaderProps = {
  title: string
  subtitle?: string
  branch?: BranchSummary
  department?: DepartmentSummary
  meta?: {
    label: string
    value: string
  }[]
  primaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
}
```

**Rules:**
- Compact.
- Title and purpose must be clear.
- Primary CTA on the right.
- Do not use hero-style header.

---

## 5. SummaryStrip

**Purpose:**  
Show operational counters below workspace header.

**Suggested file:**

```txt
components/workspace/summary-strip.tsx
```

**Props:**

```ts
type SummaryStripProps = {
  items: WorkspaceSummaryItem[]
  onItemClick?: (key: string) => void
}
```

**Item type:**

```ts
type WorkspaceSummaryItem = {
  key: string
  label: string
  count: number
  tone?: "neutral" | "info" | "warning" | "success" | "danger" | "accent"
  href?: string
}
```

**Rules:**
- Use 4–6 items max per workspace where possible.
- Make counters clickable when useful.
- Urgent/delayed items should be visually stronger.
- Keep height compact.

---

## 6. QueueSection

**Purpose:**  
Group operational rows by status/queue.

**Suggested file:**

```txt
components/workspace/queue-section.tsx
```

**Props:**

```ts
type QueueSectionProps<T> = {
  title: string
  description?: string
  count?: number
  items: T[]
  renderItem: (item: T) => React.ReactNode
  emptyTitle?: string
  emptyDescription?: string
  maxVisibleItems?: number
  viewAllHref?: string
}
```

**Rules:**
- Most urgent queue should appear first.
- Empty state must be meaningful.
- Do not render generic “No data”.
- Should support dense rows.

---

## 7. OperatorCaseRow

**Purpose:**  
Standard row for operational queues.

**Used by:**
- Reception queues
- Doctor queues
- Lab queues
- Cashier queues
- Radiology queues
- Procedure queues
- Pharmacy queues

**Suggested file:**

```txt
components/workspace/operator-case-row.tsx
```

**Generic row model:**

```ts
type OperatorCaseRowAction = {
  label: string
  href?: string
  onClick?: () => void
  disabled?: boolean
  reason?: string
  variant?: "primary" | "secondary" | "danger"
}

type OperatorCaseRowProps = {
  identity: {
    title: string
    subtitle?: string
    href?: string
  }
  reference?: string
  context?: string
  primaryBadge?: StatusBadgeData
  secondaryBadge?: StatusBadgeData
  nextAction?: NextActionData
  primaryAction?: OperatorCaseRowAction
  secondaryActions?: OperatorCaseRowAction[]
  meta?: {
    label: string
    value: string
  }[]
}
```

**Required displayed content:**

```txt
Identity
Case reference
Context
Primary status badge
Secondary badge optional
Next action
Primary CTA
```

**Rules:**
- One primary CTA only.
- Secondary actions go into menu.
- Row must be readable in under 2 seconds.
- Use shared `StatusBadge`.
- Never hardcode status tone here.
- Should work for visit, lab order, invoice, appointment, task.

---

## 8. WorkspaceRightPanel

**Purpose:**  
Show supporting operational context on workspace pages.

**Suggested file:**

```txt
components/workspace/workspace-right-panel.tsx
```

**Props:**

```ts
type WorkspaceRightPanelSection = {
  title: string
  items: React.ReactNode[]
  emptyTitle?: string
  emptyDescription?: string
}

type WorkspaceRightPanelProps = {
  sections: WorkspaceRightPanelSection[]
}
```

**Examples:**

Reception:
```txt
Fast patient search
Today's appointments
Recent registrations
Delayed cases
```

Doctor:
```txt
Today's appointments
Urgent cases
Recent results
```

Cashier:
```txt
Shift total
Payment method split
Recent payments
High priority unpaid
```

**Rules:**
- Right panel must help decisions.
- Do not put decorative cards here.
- Keep compact.

---

# Status and Action Components

## 9. StatusBadge

**Purpose:**  
Render consistent status labels and tones.

**Suggested file:**

```txt
components/status/status-badge.tsx
```

**Props:**

```ts
type StatusBadgeProps = {
  badge: StatusBadgeData
  size?: "sm" | "md"
}
```

**Badge type:**

```ts
type StatusBadgeData = {
  label: string
  tone: "neutral" | "info" | "warning" | "success" | "danger" | "accent"
}
```

**Rules:**
- Do not calculate label in the component.
- Label and tone come from workflow helpers or API.
- Same status must look the same everywhere.
- Keep badges compact.

---

## 10. NextActionLabel

**Purpose:**  
Show the next action text consistently.

**Suggested file:**

```txt
components/status/next-action-label.tsx
```

**Props:**

```ts
type NextActionLabelProps = {
  action?: NextActionData
  prefix?: string
}
```

**Example rendering:**

```txt
Next: Start consultation
Next: Collect sample
Next: Record payment
```

**Rules:**
- If no action exists, show terminal/empty state gracefully.
- Do not show fake actions.

---

## 11. ActionButton

**Purpose:**  
Shared workflow-aware action button.

**Suggested file:**

```txt
components/actions/action-button.tsx
```

**Props:**

```ts
type ActionButtonProps = {
  action: OperatorCaseRowAction
  size?: "sm" | "md"
}
```

**Rules:**
- Disabled actions should expose reason via tooltip or helper text.
- Dangerous actions must use danger variant.
- If `href` exists, render link-style button.
- If `onClick` exists, render button.

---

# Detail Page Components

## 12. DetailWorkspace

**Purpose:**  
Reusable shell for entity detail pages.

**Used by:**
- Visit detail
- Patient detail
- Appointment detail
- Lab order detail
- Radiology order detail
- Invoice detail
- Staff detail
- Inventory item detail

**Suggested file:**

```txt
components/detail/detail-workspace.tsx
```

**Props:**

```ts
type DetailWorkspaceProps = {
  header: React.ReactNode
  commandBar?: React.ReactNode
  children: React.ReactNode
  rightRail?: React.ReactNode
  timeline?: React.ReactNode
}
```

**Layout:**

```txt
Header
Sticky command bar
Main content + right rail
Timeline
```

**Rules:**
- Must be dense.
- Right rail collapses on smaller screens.
- Command bar should remain near top.
- Should not include domain-specific logic.

---

## 13. DetailHeader

**Purpose:**  
Compact identity header for detail pages.

**Suggested file:**

```txt
components/detail/detail-header.tsx
```

**Props:**

```ts
type DetailHeaderMetaItem = {
  label: string
  value: string
}

type DetailHeaderProps = {
  title: string
  subtitle?: string
  badges?: StatusBadgeData[]
  meta?: DetailHeaderMetaItem[]
  primaryAction?: OperatorCaseRowAction
}
```

**Examples:**

Visit:
```txt
Aliyev Sardor
VIS-2026-00091 · Cardiology · Dr. Akmal Rahimov
Badge: Waiting for doctor
```

Invoice:
```txt
INV-2026-00112
Aliyev Sardor · VIS-2026-00091
Badge: Partially paid
```

**Rules:**
- Compact height.
- Identity must be obvious.
- Status badges visible.
- No hero layout.

---

## 14. StickyCommandBar

**Purpose:**  
Show valid actions for the current entity/status.

**Suggested file:**

```txt
components/detail/sticky-command-bar.tsx
```

**Props:**

```ts
type StickyCommandBarProps = {
  primaryAction?: OperatorCaseRowAction
  actions?: OperatorCaseRowAction[]
  dangerActions?: OperatorCaseRowAction[]
}
```

**Rules:**
- Primary action first.
- Show only valid actions.
- Dangerous actions visually separated.
- Should be sticky below detail header when possible.
- Do not show impossible workflow actions.

---

## 15. RightContextRail

**Purpose:**  
Show compact supporting context for detail pages.

**Suggested file:**

```txt
components/detail/right-context-rail.tsx
```

**Props:**

```ts
type RightContextRailSection = {
  title: string
  content: React.ReactNode
}

type RightContextRailProps = {
  sections: RightContextRailSection[]
}
```

**Examples:**

Visit:
```txt
Patient summary
Invoice summary
Linked lab/radiology
Alerts
```

Patient:
```txt
Contact
Risk flags
Current balance
Active visit
```

Invoice:
```txt
Patient
Visit
Cashier shift
Audit info
```

**Rules:**
- Must support compact section cards.
- No decorative content.
- Should collapse on narrow screens.

---

## 16. Timeline

**Purpose:**  
Show chronological activity.

**Suggested file:**

```txt
components/detail/timeline.tsx
```

**Props:**

```ts
type TimelineProps = {
  events: TimelineEvent[]
  compact?: boolean
}
```

**Rules:**
- Show actor, time, title, optional description.
- Chronological order, newest first or oldest first depending page convention.
- Use consistent date formatting.
- Empty state must explain no activity yet.

---

## 17. DetailSection

**Purpose:**  
Reusable compact content section inside detail pages.

**Suggested file:**

```txt
components/detail/detail-section.tsx
```

**Props:**

```ts
type DetailSectionProps = {
  title: string
  description?: string
  actions?: React.ReactNode
  children: React.ReactNode
}
```

**Rules:**
- Compact padding.
- Clear section title.
- Optional actions on right.
- Avoid nested giant cards.

---

# Table Components

## 18. DataTableShell

**Purpose:**  
Reusable shell for list pages.

**Suggested file:**

```txt
components/table/data-table-shell.tsx
```

**Props:**

```ts
type DataTableColumn<T> = {
  key: string
  header: string
  render: (item: T) => React.ReactNode
  width?: string
}

type DataTableShellProps<T> = {
  title?: string
  description?: string
  items: T[]
  columns: DataTableColumn<T>[]
  searchPlaceholder?: string
  filters?: React.ReactNode
  primaryAction?: OperatorCaseRowAction
  emptyTitle?: string
  emptyDescription?: string
  onRowClick?: (item: T) => void
}
```

**Rules:**
- Dense table rows.
- Use shared badges.
- Provide search/filter area.
- No generic “No data”.
- Do not show every backend field.

---

## 19. FilterBar

**Purpose:**  
Reusable filters for lists/reports.

**Suggested file:**

```txt
components/table/filter-bar.tsx
```

**Props:**

```ts
type FilterBarProps = {
  children: React.ReactNode
  onReset?: () => void
}
```

**Rules:**
- Compact.
- Common filters: date, status, department, doctor, branch.
- Reset filters should be easy.

---

# Form Components

## 20. FormSection

**Purpose:**  
Group fields in create/edit forms.

**Suggested file:**

```txt
components/forms/form-section.tsx
```

**Props:**

```ts
type FormSectionProps = {
  title: string
  description?: string
  children: React.ReactNode
}
```

**Rules:**
- Use compact spacing.
- Keep related fields together.
- Avoid long ungrouped forms.

---

## 21. FormActions

**Purpose:**  
Standard bottom actions for forms.

**Suggested file:**

```txt
components/forms/form-actions.tsx
```

**Props:**

```ts
type FormActionsProps = {
  primaryLabel: string
  secondaryLabel?: string
  onPrimary?: () => void
  onSecondary?: () => void
  loading?: boolean
  disabled?: boolean
}
```

**Rules:**
- Primary action on right.
- Secondary/cancel nearby.
- Sticky footer can be used for long forms.

---

## 22. PatientQuickSearch

**Purpose:**  
Reusable fast patient search box.

**Suggested file:**

```txt
components/patients/patient-quick-search.tsx
```

**Props:**

```ts
type PatientQuickSearchProps = {
  patients: PatientListItem[]
  onSelect: (patient: PatientListItem) => void
  placeholder?: string
}
```

**Used by:**
- Reception
- Appointments
- Visits
- Patient search
- Right panels

**Rules:**
- Search by name, phone, patient code.
- Show compact patient results.
- Must support empty state.

---

# Domain Summary Components

## 23. PatientMiniCard

**Purpose:**  
Compact patient context card.

**Suggested file:**

```txt
components/patients/patient-mini-card.tsx
```

**Props:**

```ts
type PatientMiniCardProps = {
  patient: PatientSummary | Patient
  balance?: Money
  riskFlags?: string[]
  href?: string
}
```

**Displayed fields:**

```txt
Patient name
Patient code
Age/gender
Phone
Risk flags optional
Balance optional
```

---

## 24. VisitMiniCard

**Purpose:**  
Compact visit context card.

**Suggested file:**

```txt
components/visits/visit-mini-card.tsx
```

**Props:**

```ts
type VisitMiniCardProps = {
  visit: VisitSummary | Visit
  href?: string
}
```

**Displayed fields:**

```txt
Visit code
Patient
Doctor/department
Workflow badge
Next action
```

---

## 25. InvoiceSummaryCard

**Purpose:**  
Compact invoice/payment summary.

**Suggested file:**

```txt
components/billing/invoice-summary-card.tsx
```

**Props:**

```ts
type InvoiceSummaryCardProps = {
  invoice: InvoiceSummary | Invoice
  href?: string
}
```

**Displayed fields:**

```txt
Invoice code
Total
Paid
Balance
Status badge
Next action
```

---

## 26. LabOrderMiniCard

**Purpose:**  
Compact lab order context card.

**Suggested file:**

```txt
components/lab/lab-order-mini-card.tsx
```

**Props:**

```ts
type LabOrderMiniCardProps = {
  order: LabOrderSummary | LabOrder
  href?: string
}
```

**Displayed fields:**

```txt
Lab order code
Test names
Priority
Status badge
Next action
```

---

# Feedback Components

## 27. EmptyState

**Purpose:**  
Meaningful empty states.

**Suggested file:**

```txt
components/feedback/empty-state.tsx
```

**Props:**

```ts
type EmptyStateProps = {
  title: string
  description?: string
  action?: OperatorCaseRowAction
}
```

**Rules:**
- Never use generic “No data”.
- Explain operational meaning.
- CTA only if useful.

---

## 28. LoadingState

**Purpose:**  
Consistent skeleton/loading state.

**Suggested file:**

```txt
components/feedback/loading-state.tsx
```

**Props:**

```ts
type LoadingStateProps = {
  variant?: "workspace" | "table" | "detail" | "section"
}
```

**Rules:**
- Prefer skeletons over spinners.
- Full-page spinner only for initial app boot.

---

## 29. ErrorState

**Purpose:**  
Consistent recoverable error state.

**Suggested file:**

```txt
components/feedback/error-state.tsx
```

**Props:**

```ts
type ErrorStateProps = {
  title: string
  description?: string
  retryLabel?: string
  onRetry?: () => void
  debugCode?: string
}
```

**Rules:**
- Say what failed.
- Provide retry when possible.
- Do not show raw stack traces to operators.

---

# Component Implementation Priority

## Phase A — Layout foundation

Implement first:

```txt
AppShell
Sidebar
Topbar
```

## Phase B — Workflow workspace foundation

Implement second:

```txt
WorkspaceHeader
SummaryStrip
QueueSection
OperatorCaseRow
WorkspaceRightPanel
StatusBadge
NextActionLabel
ActionButton
```

## Phase C — Detail foundation

Implement third:

```txt
DetailWorkspace
DetailHeader
StickyCommandBar
RightContextRail
Timeline
DetailSection
```

## Phase D — Lists and forms

Implement fourth:

```txt
DataTableShell
FilterBar
FormSection
FormActions
PatientQuickSearch
```

## Phase E — Domain mini cards and feedback

Implement fifth:

```txt
PatientMiniCard
VisitMiniCard
InvoiceSummaryCard
LabOrderMiniCard
EmptyState
LoadingState
ErrorState
```

---

# Suggested Folder Structure

```txt
components/
  layout/
    app-shell.tsx
    sidebar.tsx
    topbar.tsx

  workspace/
    workspace-header.tsx
    summary-strip.tsx
    queue-section.tsx
    operator-case-row.tsx
    workspace-right-panel.tsx

  status/
    status-badge.tsx
    next-action-label.tsx

  actions/
    action-button.tsx

  detail/
    detail-workspace.tsx
    detail-header.tsx
    sticky-command-bar.tsx
    right-context-rail.tsx
    timeline.tsx
    detail-section.tsx

  table/
    data-table-shell.tsx
    filter-bar.tsx

  forms/
    form-section.tsx
    form-actions.tsx

  patients/
    patient-quick-search.tsx
    patient-mini-card.tsx

  visits/
    visit-mini-card.tsx

  billing/
    invoice-summary-card.tsx

  lab/
    lab-order-mini-card.tsx

  feedback/
    empty-state.tsx
    loading-state.tsx
    error-state.tsx
```

---

# Implementation Rules for Codex

When Codex implements components:

1. Use TypeScript.
2. Use existing project UI stack: Tailwind and shadcn/ui if available.
3. Keep components presentation-focused.
4. Do not fetch data inside shared components.
5. Do not hardcode mock records inside components.
6. Put domain mapping in `lib/workflow`, not inside UI components.
7. Keep props explicit and typed.
8. Use compact enterprise layout.
9. Do not create large marketing cards.
10. Prefer composition over one giant component.
11. Components must work with mock data and later real API data.
12. Use consistent naming and folder structure.
13. Avoid unnecessary animation in operational pages.
14. Every operational row must show status and next action.
15. Every detail page must support command bar and right rail.

---

# First Codex Task After This Document

After this document exists, the first real implementation task should be:

```txt
Create the shared component foundation described in docs/clinic-erp-components.md.

Implement only:
- AppShell
- Sidebar
- Topbar
- WorkspaceHeader
- SummaryStrip
- QueueSection
- StatusBadge
- NextActionLabel
- ActionButton
- EmptyState

Do not implement module pages yet.
Do not create backend code.
Use compact enterprise styling.
Use TypeScript props as described in the document.
```