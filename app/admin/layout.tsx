import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:block">
        <div className="p-6 text-2xl font-bold border-b border-slate-800">
          Admin Panel
        </div>
        <nav className="p-4 space-y-2">
          <div className="p-3 bg-blue-600 rounded-lg cursor-pointer">Dashboard</div>
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition">Harytlar</div>
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition">Sargytlar</div>
          <div className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition text-red-400">Log out</div>
        </nav>
      </aside>

      {/* Esasy Bölüm */}
      <main className="flex-1">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">Hoş geldiňiz, Admin!</h1>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">A</div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
