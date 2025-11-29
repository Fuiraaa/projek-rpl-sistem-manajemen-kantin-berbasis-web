import { FiMenu } from "react-icons/fi";
import { createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import appIcon from "../assets/icon.png";
import DashboardIcon from "../assets/dash.png";
import Food from "../assets/mdi_food.png";
import Keuangan from "../assets/keuangan.png";
import Transaksi from "../assets/transaksi.png";
import Riwayat from "../assets/riwayat.png";
import Settings from "../assets/settings.png";
import Logout from "../assets/logout.png";

export const SidebarContext = createContext();

export default function Sidebar() {
  const { expanded, setExpanded } = useContext(SidebarContext);
  const sidebarWidthClasses = expanded ? "w-56" : "w-20";
  const headerJustification = expanded ? "justify-between" : "justify-center";

  return (
    <aside className={`h-screen transition-all duration-300 ${sidebarWidthClasses} fixed left-0 top-0 bg-pink-300 overflow-visible z-[1000]`}>
      <nav className="h-full text-white flex flex-col bg-pink-300 border-r shadow-sm overflow-visible">
        <div className={`p-4 pb-2 mb-4 flex items-center ${headerJustification}`}>
          <img src={appIcon} className={`transition-all ${expanded ? "w-12" : "w-0"}`} alt="App Icon"/>
          <button onClick={() => setExpanded(!expanded)}
           className="p-1.5 rounded-lg transition-colors">
            <FiMenu className="w-6 h-6 text-white hover:bg-pink-100 p-0.5 rounded"/>
          </button>
        </div>
       
        <ul className="flex-1 px-3 mt-2">
          <SidebarItem icon={<img src={DashboardIcon} className="w-6" />} text="Dashboard" to="/" />
          <SidebarItem icon={<img src={Food} className="w-6" />} text="Produksi Harian" to="/ProduksiHarian" />
          <SidebarItem icon={<img src={Transaksi} className="w-6" />} text="Transaksi" to="/Transaksi" />
          <SidebarItem icon={<img src={Riwayat} className="w-6" />} text="Riwayat" to="/Riwayat" />
          <SidebarItem icon={<img src={Keuangan} className="w-6" />} text="Laporan Keuangan" to="/laporan" />
        </ul>

        
        <div className="p-3 border-t border-white space-y-1">
          <SidebarItem icon={<img src={Settings} className="w-6" />} text="Settings" to="/Setting" />
          <SidebarItem icon={<img src={Logout} className="w-6" />} text="Logout"/>
        </div>
      </nav>
    </aside>
  );
}


export function SidebarItem({ icon, text, to }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer group overflow-visible">
      <span
        className={`absolute inset-0 bg-gradient-to-r from-[#D26881] to-[#FFA3A3] scale-x-0 origin-left transition-transform duration-300 rounded-md
          ${isActive ? "scale-x-100" : ""} group-hover:scale-x-100`}></span>

      <Link to={to} className="relative flex items-center w-full z-10">
        {icon}
        <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
            expanded ? "max-w-full ml-3 opacity-100" : "max-w-0 opacity-0 ml-0"
          }`} >
          {text}
        </span>
      </Link>

      {!expanded && (
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-1 rounded-md
        bg-pink-100 text-pink-800 text-sm shadow-lg opacity-0 pointer-events-none
        transition-all duration-200 group-hover:opacity-100 group-hover:pointer-events-auto z-[1001]">
          {text}
        </div>
      )}
    </li>
  );
}
