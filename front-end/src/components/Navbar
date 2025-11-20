import { useContext, useState } from "react";
import { SidebarContext } from "./Sidebar";

import SearchIcon from "../assets/search.png";
import UserIcon from "../assets/user.png";
import BellIcon from "../assets/bell.png";

export default function Navbar({ onSearch }) {
  const { expanded } = useContext(SidebarContext);
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setKeyword(value);
    if (onSearch) onSearch(value);
  };

  return (
    <div className="bg-pink-100 flex items-center justify-between px-6 py-4 shadow-md">
      <h1 className="text-2xl font-bold text-pink-700">Kantin Agus</h1>

      <div className="flex-1 max-w-xs mx-6 relative">
        <input type="search" placeholder="Cari sesuatu..."
          value={keyword}
          onChange={handleSearch}
          className="w-full py-2 pl-4 pr-10 bg-white rounded-full border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition duration-200 text-black"/>

        <img src={SearchIcon} alt="Search Icon" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"/>
      </div>

      <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-lg shadow-md border border-pink-100 hover:shadow-lg transition duration-200">
        <img src={UserIcon} alt="User Icon" className="w-8 h-8 rounded-full border border-pink-300"/>

        <div className="text-sm text-gray-700 leading-tight">
          <p className="font-semibold">User</p>
          <p className="text-gray-500 text-xs">Penjualan Kantin Agus</p>
        </div>

        <img src={BellIcon} alt="Notifikasi"className="w-5 h-5 opacity-70 ml-2"/>
      </div>
    </div>
  );
}
