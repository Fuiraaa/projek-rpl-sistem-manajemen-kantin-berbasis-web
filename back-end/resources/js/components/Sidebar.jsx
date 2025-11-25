import { FiMenu } from "react-icons/fi";
import React, { createContext, useContext, useState } from "react";
import { Link, router } from "@inertiajs/react";

import appIcon from "../../images/icon.png";
import DashboardIcon from "../../images/dash.png";
import Food from "../../images/mdi_food.png";
import Keuangan from "../../images/keuangan.png";
import Transaksi from "../../images/transaksi.png";
import RiwayatIcon from "../../images/riwayat.png";
import Settings from "../../images/settings.png";
import Logout from "../../images/logout.png";

export const SidebarContext = createContext();

export default function Sidebar() {
  const { expanded, setExpanded } = useContext(SidebarContext);

  const sidebarWidthClasses = expanded ? "w-56" : "w-20";
  const headerJustification = expanded ? "justify-between" : "justify-center";
  
const handleLogout = () => {
  console.log('Logout clicked');
  window.location.href = '/logout';
};

  return (
    <aside
      className={`h-screen transition-all duration-300 ${sidebarWidthClasses} fixed left-0 top-0 bg-pink-300`}
    >
      <nav className="h-full text-white flex flex-col bg-pink-300 border-r shadow-sm">

        {/* Header */}
        <div className={`p-4 pb-2 mb-4 flex items-center ${headerJustification}`}>
          <img
            src={appIcon}
            className={`transition-all ${expanded ? "w-12" : "w-0"}`}
            alt="App Icon"
          />
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg transition-colors"
          >
            <FiMenu className="w-6 h-6 text-white hover:bg-pink-100 p-0.5 rounded" />
          </button>
        </div>

        {/* Menu utama */}
        <ul className="flex-1 px-3 mt-2">
          <SidebarItem href="/dashboard" icon={<img src={DashboardIcon} className="w-6" />} text="Dashboard" />
          <SidebarItem href="/produksi" icon={<img src={Food} className="w-6" />} text="Produksi Harian" />
          <SidebarItem href="/transaksi" icon={<img src={Transaksi} className="w-6" />} text="Transaksi" />
          <SidebarItem href="/riwayat" icon={<img src={RiwayatIcon} className="w-6" />} text="Riwayat" />
          <SidebarItem href="/keuangan" icon={<img src={Keuangan} className="w-6" />} text="Laporan Keuangan" />
        </ul>

        {/* Menu bawah */}
        <div className="p-3 border-t border-white space-y-1">
          <SidebarItem href="/setting" icon={<img src={Settings} className="w-6" />} text="Settings" />
          <SidebarItem onClick={handleLogout} icon={<img src={Logout} className="w-6" />} text="Logout" />
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, href, onClick }) {
  const { expanded } = useContext(SidebarContext);
  
  const Component = onClick ? 'button' : Link;
  const componentProps = onClick ? { onClick } : { href };

  return (
    <li>
      <Component
        {...componentProps}
        className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer group w-full text-left"
      >
        {/* Background hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-[#D26881] to-[#FFA3A3] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 rounded-md"></span>

        <div className="relative flex items-center w-full">
          {icon}
          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
              expanded ? "max-w-full ml-3 opacity-100" : "max-w-0 opacity-0 ml-0"
            }`}
          >
            {text}
          </span>
        </div>

        {!expanded && (
          <div
            className="absolute left-full rounded-md px-2 py-1 ml-6 bg-pink-100 text-pink-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50"
          >
            {text}
          </div>
        )}
      </Component>
    </li>
  );
}