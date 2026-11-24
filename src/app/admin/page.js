import { redirect } from "next/navigation";
import { Suspense } from "react";
import AdminDashboard from "@/components/AdminDashboard";
import { isAdmin } from "@/lib/auth";
import { groupPortfolio, mergeSite } from "@/lib/data";
import { getExhibitions } from "@/lib/exhibitions";
import { getContactMessages, readStore } from "@/lib/store";

async function Dashboard() {
  if (!(await isAdmin())) redirect("/admin/login");
  const [store, exhibitions, messages] = await Promise.all([
    readStore(),
    getExhibitions(),
    getContactMessages(),
  ]);
  return (
    <AdminDashboard
      portfolio={groupPortfolio(store)}
      site={mergeSite(store.site)}
      exhibitions={exhibitions}
      messages={messages}
    />
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={<p className="label p-10 text-stone">Opening the studio…</p>}
    >
      <Dashboard />
    </Suspense>
  );
}
