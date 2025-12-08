import React, { useState } from "react"; 
import Sidebar, { SidebarContext } from "../components/Sidebar"; // Sesuaikan path import
import Navbar from "../components/Navbar"; // Sesuaikan path import
import { usePage } from "@inertiajs/react";

export default function Layout({ children }) {
  // Mengambil data auth user global
  const { auth } = usePage().props ?? { auth: { user: null } };
  const [expanded, setExpanded] = useState(true);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div className="flex h-screen">
        <Sidebar />

        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            expanded ? "pl-56" : "pl-20"
          }`}
        >
          {/* Kuncinya disini: Kita oper data auth.user ke Navbar */}
          <Navbar user={auth?.user ?? null} />

          <main className="bg-pink-100 flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}