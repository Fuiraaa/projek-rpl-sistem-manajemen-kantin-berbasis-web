import { useState } from "react";
import Sidebar, { SidebarContext } from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Riwayat from "./pages/Riwayat";

export default function App() {
  const [expanded, setExpanded] = useState(true);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div className="flex h-screen">
        <Sidebar />

        <div className={`flex-1 flex flex-col transition-all duration-300 ${expanded ? "pl-56" : "pl-20"}`}>
          <Navbar />

          <main className="bg-pink-100 flex-1 p-6 overflow-auto">
            <Riwayat />
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
