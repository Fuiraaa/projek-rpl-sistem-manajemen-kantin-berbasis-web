import React, { useRef, useState } from "react"; // Tambahkan useRef, useState
import Layout from "../components/Layout";
import userIcon from "../../images/user.png";
import editIcon from "../../images/edit-03.png";
import { useForm, router } from "@inertiajs/react"; // Tambahkan router jika perlu
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile({ user, profile, contact }) {
  // Ref untuk input file tersembunyi
  const fileInputRef = useRef(null);
  
  // State untuk preview gambar lokal sebelum di-upload
  const [previewImage, setPreviewImage] = useState(null);

  const { data, setData, post, processing, errors } = useForm({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    email: user?.email || "",
    gender: profile?.gender || "",
    birth_date: profile?.birth_date || "",
    phone: contact?.phone || "",
    country: contact?.country || "",
    address: contact?.address || "",
    photo: null, // <--- Tambahkan field photo
    _method: 'POST', // Penting untuk upload file di Laravel via Inertia
  });

  // Handle saat file dipilih
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("photo", file); // Masukkan ke form data Inertia
      // Buat URL sementara untuk preview
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const submit = (e) => {
    e.preventDefault();

    post("/profile/update", {
      forceFormData: true, // WAJIB: Agar Inertia mengirim sebagai FormData (multipart)
      onSuccess: () => {
        toast.success("Profil berhasil diperbarui!");
      },
      onError: () => {
        toast.error("Terjadi kesalahan, silakan coba lagi.");
      },
    });
  };

  // Logika URL Gambar: Prioritas 1. Preview (saat ganti), 2. Dari Database, 3. Default
  const profileImageUrl = previewImage 
    ? previewImage 
    : (profile?.profile_picture ? `/storage/${profile.profile_picture}` : userIcon);

  return (
    <Layout>
      <div className="flex flex-col gap-6 w-full max-w-6xl ml-8 mt-2 p-2 mb-36">
        <div className="bg-white p-4 shadow rounded-lg w-full">
          <h1 className="text-lg text-pink-600 font-semibold mb-3">
            Informasi Profil
          </h1>

          {/* Tampilan Gambar Profil */}
          <img
            src={profileImageUrl} // Gunakan variabel logika gambar di atas
            alt="User Icon"
            className="w-20 h-20 rounded-full border border-pink-300 mb-3 object-cover" // Ubah ukuran sedikit agar pas
          />

          {/* Input File Tersembunyi */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />

          {/* Tombol Ganti Profil */}
          <button 
            type="button" // Pastikan type button agar tidak submit form
            onClick={() => fileInputRef.current.click()} // Trigger input file
            className="flex items-center gap-1 text-black text-sm font-semibold px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-200 transition mb-3"
          >
            Ganti Profil
            <img src={editIcon} alt="Edit Icon" className="w-3" />
          </button>

          {/* Tampilkan Error jika file tidak valid */}
          {errors.photo && (
             <div className="text-red-500 text-sm mb-2">{errors.photo}</div>
          )}

          <form onSubmit={submit}>
            {/* ... SISA FORM (Input Nama, Email, dll) TETAP SAMA SEPERTI KODE ASLI ANDA ... */}
            {/* Pastikan kode di bawah tombol Ganti Profil sampai tag </form> penutup tetap ada */}
            <div className="grid grid-cols-3 gap-3 mb-3">
                 {/* ... input first_name, last_name, email ... */}
                 <div>
                    <p className="text-sm text-black font-semibold mb-1">Nama Awal</p>
                    <input type="text" value={data.first_name} onChange={(e) => setData("first_name", e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
                    {errors.first_name && <div className="text-red-500 text-sm">{errors.first_name}</div>}
                 </div>
                 {/* ... dst (copy paste sisa input field dari file asli Anda) ... */}
                 
                 {/* Saya persingkat disini agar tidak terlalu panjang, tapi intinya masukkan sisa form input Anda disini */}
                 <div>
                    <p className="text-sm text-black font-semibold mb-1">Nama Belakang</p>
                    <input type="text" value={data.last_name} onChange={(e) => setData("last_name", e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
                 </div>
                 <div>
                    <p className="text-sm text-black font-semibold mb-1">Email</p>
                    <input type="email" value={data.email} onChange={(e) => setData("email", e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
                 </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                 <div>
                    <p className="text-sm text-black font-semibold mb-1">Gender</p>
                    <input type="text" value={data.gender} onChange={(e) => setData("gender", e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
                 </div>
                 <div>
                    <p className="text-sm text-black font-semibold mb-1">Tanggal Lahir</p>
                    <input type="date" value={data.birth_date} onChange={(e) => setData("birth_date", e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
                 </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button type="submit" disabled={processing} className="text-pink-600 text-sm font-semibold px-3 py-1 rounded hover:bg-pink-50 transition">Perbarui</button>
              <button type="button" onClick={() => window.location.reload()} className="text-pink-600 text-sm font-semibold px-3 py-1 rounded hover:bg-pink-50 transition">Batalkan</button>
            </div>
          </form>
        </div>
        
        {/* SECTION KONTAK TETAP SAMA */}
        <div className="bg-white p-4 shadow rounded-lg w-full">
           {/* ... Copy paste isi form kontak dari file asli Anda ... */}
             <div className="flex items-center mb-3">
                <h1 className="text-lg text-pink-600 font-semibold">Informasi Kontak</h1>
             </div>
             <form onSubmit={submit}>
                <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                        <p className="text-sm text-black font-semibold mb-1">Nomor Telepon</p>
                        <input type="text" value={data.phone} onChange={(e) => setData("phone", e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
                    </div>
                    <div>
                        <p className="text-sm text-black font-semibold mb-1">Negara</p>
                        <input type="text" value={data.country} onChange={(e) => setData("country", e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
                    </div>
                    <div>
                        <p className="text-sm text-black font-semibold mb-1">Alamat</p>
                        <input type="text" value={data.address} onChange={(e) => setData("address", e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"/>
                    </div>
                </div>
             </form>
        </div>

      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Layout>
  );
}