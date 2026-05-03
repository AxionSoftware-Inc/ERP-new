import { redirect } from "next/navigation";

export default function ReceptionDelayedPage() {
  redirect("/app/reception/queue?view=delayed");
}
