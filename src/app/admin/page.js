import { redirect } from "next/navigation";
import { Suspense } from "react";
import AdminDashboard from "@/components/AdminDashboard";
import { isAdmin } from "@/lib/auth";
import { groupPortfolio, mergeSite } from "@/lib/data";
import { readStore } from "@/lib/store";

async function Dashboard() {
  if (!(await isAdmin())) redirect("/admin/login");
  // Read the file directly so the admin never sees a cached copy.
  const store = await readStore();
  return (
    <AdminDashboard portfolio={groupPortfolio(store)} site={mergeSite(store.site)} />
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
