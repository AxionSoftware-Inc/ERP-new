import { notFound } from "next/navigation";
import { RoutePlaceholderPage } from "@/components/placeholder/route-placeholder-page";
import { getPhaseOneRoute, phaseOneRoutes } from "../_placeholder-data";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

const dynamicRoutes = new Set([
  "/app/patients/[id]",
  "/app/patients/[id]/overview",
  "/app/patients/[id]/visits",
  "/app/patients/[id]/medical-record",
  "/app/patients/[id]/lab-results",
  "/app/patients/[id]/radiology",
  "/app/patients/[id]/invoices",
  "/app/patients/[id]/documents",
  "/app/patients/[id]/activity",
  "/app/patients/[id]/edit",
  "/app/appointments/[id]",
  "/app/appointments/[id]/edit",
  "/app/visits/[id]",
  "/app/visits/[id]/clinical",
  "/app/visits/[id]/orders",
  "/app/visits/[id]/lab",
  "/app/visits/[id]/radiology",
  "/app/visits/[id]/billing",
  "/app/visits/[id]/documents",
  "/app/visits/[id]/timeline",
  "/app/doctor/visits/[id]",
  "/app/lab/orders/[id]",
  "/app/cashier/invoices/[id]",
]);

export default async function PhaseOnePlaceholderPage({ params }: Props) {
  const { slug } = await params;
  const route = `/app/${slug.join("/")}`;
  const templateRoute = toTemplateRoute(route);
  const exact = phaseOneRoutes.some((item) => item.route === route);
  const dynamic = dynamicRoutes.has(templateRoute);

  if (!exact && !dynamic) notFound();

  const config = getPhaseOneRoute(dynamic ? templateRoute : route);
  return <RoutePlaceholderPage {...config} route={route} />;
}

function toTemplateRoute(route: string): string {
  const parts = route.split("/");
  if (parts.length >= 4) {
    if (parts[2] === "patients") parts[3] = "[id]";
    if (parts[2] === "appointments" && parts[3] !== "calendar" && parts[3] !== "list" && parts[3] !== "new") parts[3] = "[id]";
    if (parts[2] === "visits" && parts[3] !== "new") parts[3] = "[id]";
    if (parts[2] === "doctor" && parts[3] === "visits" && parts[4]) parts[4] = "[id]";
    if (parts[2] === "lab" && parts[3] === "orders" && parts[4]) parts[4] = "[id]";
    if (parts[2] === "cashier" && parts[3] === "invoices" && parts[4]) parts[4] = "[id]";
  }
  return parts.join("/");
}
