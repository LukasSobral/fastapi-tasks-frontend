import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
