import React from "react";
import userIcon from "../assets/user.png";
import editIcon from "../assets/edit-03.png";

export default function Profile() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl ml-8 mt-2 p-2 mb-36">
      <div className="bg-white p-4 shadow rounded-lg w-full">
        <h1 className="text-lg text-pink-600 font-semibold mb-3"> Informasi Profil </h1>

        <img src={userIcon} alt="User Icon" className="w-10 h-10 rounded-full border border-pink-300 mb-3"/>

        <button className="flex items-center gap-1 text-black text-sm font-semibold px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-200 transition mb-3">
          Ganti Profil
          <img src={editIcon} alt="Edit Icon" className="w-3" />
        </button>

        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <p className="text-sm text-black font-semibold mb-1">Nama Awal</p>
            <input type="text" placeholder="Masukkan awal nama Anda" className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
          </div>

          <div>
            <p className="text-sm text-black font-semibold mb-1">Nama Belakang</p>
            <input type="text" placeholder="Masukkan nama belakang Anda" className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
          </div>

          <div>
            <p className="text-sm text-black font-semibold mb-1">Email</p>
            <input type="email" placeholder="Masukkan email Anda" className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-black font-semibold mb-1">Gender</p>
            <input type="text" placeholder="Masukkan jenis kelamin Anda" className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
          </div>

          <div>
            <p className="text-sm text-black font-semibold mb-1">Tanggal Lahir</p>
            <input type="date" className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="text-pink-600 text-sm font-semibold px-3 py-1 rounded hover:bg-pink-50 transition">
            Perbarui
          </button>
          <button className="text-pink-600 text-sm font-semibold underline px-3 py-1 rounded hover:bg-pink-50 transition">
            Batalkan
          </button>
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded-lg w-full">
        <div className="flex items-center mb-3">
          <h1 className="text-lg text-pink-600 font-semibold">Informasi Kontak</h1>

          <button className="ml-auto flex items-center gap-1 text-black text-sm font-semibold px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-200 transition">
            Edit
            <img src={editIcon} alt="Edit Icon" className="w-3" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <p className="text-sm text-black font-semibold mb-1">Nomor Telepon</p>
            <input type="text" placeholder="Masukkan nomor telepon Anda" className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
          </div>

          <div>
            <p className="text-sm text-black font-semibold mb-1">Negara</p>
            <input type="text" placeholder="Masukkan negara kebangsaan Anda"  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
          </div>

          <div>
            <p className="text-sm text-black font-semibold mb-1">Alamat</p>
            <input type="text" placeholder="Masukkan alamat Anda" className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
          </div>
        </div>
      </div>
    </div>
  );
}
