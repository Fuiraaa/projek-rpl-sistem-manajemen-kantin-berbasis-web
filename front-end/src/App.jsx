import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar, { SidebarContext } from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Laporan from "./pages/LaporanKeuangan/Lapkeu";
import ProduksiHarian from "./pages/ProduksiHarian";
import Riwayat from "./pages/Riwayat";
import Transaksi from "./pages/Transaksi";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";

export default function App() {
  const [expanded, setExpanded] = useState(true);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <Router>
        <div className="flex h-screen">
          <Sidebar />

          <div className={`flex-1 flex flex-col transition-all duration-300 ${expanded ? "pl-56" : "pl-20"}`}>
            <Navbar />

            <main className="bg-pink-100 flex-1 p-6 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/ProduksiHarian" element={<ProduksiHarian />} />
                <Route path="/Riwayat" element={<Riwayat />} />
                <Route path="/Transaksi" element={<Transaksi />} />
                <Route path="/Setting" element={<Setting />} />
                <Route path="/Laporan" element={<Laporan />} />
                <Route path="/Profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </SidebarContext.Provider>
  );
}
