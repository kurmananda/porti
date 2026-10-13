export const metadata = {
  title: "Studio admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="flex-1 bg-paper">{children}</div>;
}
