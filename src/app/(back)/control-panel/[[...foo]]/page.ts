import { link } from "@/lib/router/router";
import { redirect } from "next/navigation";

export default function Page() {
    redirect(link("front.cp.dashboard.index"));
}
