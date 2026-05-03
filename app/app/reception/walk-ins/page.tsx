import { redirect } from "next/navigation";

export default function ReceptionWalkInsPage() {
  redirect("/app/reception/queue?view=walkins");
}
