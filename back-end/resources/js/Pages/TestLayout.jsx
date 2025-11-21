import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function TestLayout() {
  return (
      <div className="flex bg-pink-50 min-h-screen">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Konten utama */}
        <div className="flex-1 ml-20">
          <Navbar />

          <div className="p-6">
            <h1 className="text-3xl font-bold text-pink-700 mb-4">
              Test Halaman Layout
            </h1>
            <p className="text-gray-700">
              Ini adalah halaman untuk menguji Navbar dan Sidebar.
              Pastikan tombol menu berfungsi, animasi sidebar berjalan, dan navbar tampil sempurna.
            </p>
          </div>
        </div>
      </div>
  );
}