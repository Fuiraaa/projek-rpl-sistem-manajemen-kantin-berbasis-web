import React from "react";
import Layout from "../components/Layout";
import userIcon from "../../images/user.png";
import editIcon from "../../images/edit-03.png";
import { useForm } from "@inertiajs/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile({ user, profile, contact }) {
  // Setup form state dengan useForm Inertia
  const { data, setData, post, processing, errors } = useForm({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    email: user?.email || "",
    gender: profile?.gender || "",
    birth_date: profile?.birth_date || "",
    phone: contact?.phone || "",
    country: contact?.country || "",
    address: contact?.address || "",
  });

  const submit = (e) => {
  e.preventDefault();

  post("/profile/update", {
    onSuccess: () => {
      toast.success("Profil berhasil diperbarui!"); // notifikasi
    },
    onError: () => {
      toast.error("Terjadi kesalahan, silakan coba lagi."); // opsional
    },
  });
};

  return (
    <Layout>
      <div className="flex flex-col gap-6 w-full max-w-6xl ml-8 mt-2 p-2 mb-36">
        {/* Profil Section */}
        <div className="bg-white p-4 shadow rounded-lg w-full">
          <h1 className="text-lg text-pink-600 font-semibold mb-3">
            Informasi Profil
          </h1>

          <img
            src={userIcon}
            alt="User Icon"
            className="w-10 h-10 rounded-full border border-pink-300 mb-3"
          />

          <button className="flex items-center gap-1 text-black text-sm font-semibold px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-200 transition mb-3">
            Ganti Profil
            <img src={editIcon} alt="Edit Icon" className="w-3" />
          </button>

          <form onSubmit={submit}>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <p className="text-sm text-black font-semibold mb-1">
                  Nama Awal
                </p>
                <input
                  type="text"
                  value={data.first_name}
                  onChange={(e) => setData("first_name", e.target.value)}
                  placeholder="Masukkan awal nama Anda"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                />
                {errors.first_name && (
                  <div className="text-red-500 text-sm">{errors.first_name}</div>
                )}
              </div>

              <div>
                <p className="text-sm text-black font-semibold mb-1">
                  Nama Belakang
                </p>
                <input
                  type="text"
                  value={data.last_name}
                  onChange={(e) => setData("last_name", e.target.value)}
                  placeholder="Masukkan nama belakang Anda"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                />
                {errors.last_name && (
                  <div className="text-red-500 text-sm">{errors.last_name}</div>
                )}
              </div>

              <div>
                <p className="text-sm text-black font-semibold mb-1">Email</p>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  placeholder="Masukkan email Anda"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-black font-semibold mb-1">Gender</p>
                <input
                  type="text"
                  value={data.gender}
                  onChange={(e) => setData("gender", e.target.value)}
                  placeholder="Masukkan jenis kelamin Anda"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <p className="text-sm text-black font-semibold mb-1">
                  Tanggal Lahir
                </p>
                <input
                  type="date"
                  value={data.birth_date}
                  onChange={(e) => setData("birth_date", e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                disabled={processing}
                className="text-pink-600 text-sm font-semibold px-3 py-1 rounded hover:bg-pink-50 transition"
              >
                Perbarui
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="text-pink-600 text-sm font-semibold px-3 py-1 rounded hover:bg-pink-50 transition"
              >
                Batalkan
              </button>
            </div>
          </form>
        </div>

        {/* Kontak Section */}
        <div className="bg-white p-4 shadow rounded-lg w-full">
          <div className="flex items-center mb-3">
            <h1 className="text-lg text-pink-600 font-semibold">Informasi Kontak</h1>
          </div>

          <form onSubmit={submit}>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <p className="text-sm text-black font-semibold mb-1">Nomor Telepon</p>
                <input
                  type="text"
                  value={data.phone}
                  onChange={(e) => setData("phone", e.target.value)}
                  placeholder="Masukkan nomor telepon Anda"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <p className="text-sm text-black font-semibold mb-1">Negara</p>
                <input
                  type="text"
                  value={data.country}
                  onChange={(e) => setData("country", e.target.value)}
                  placeholder="Masukkan negara kebangsaan Anda"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <p className="text-sm text-black font-semibold mb-1">Alamat</p>
                <input
                  type="text"
                  value={data.address}
                  onChange={(e) => setData("address", e.target.value)}
                  placeholder="Masukkan alamat Anda"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
      position="top-right"
      autoClose={3000} // 3 detik
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    </Layout>
  );
}
