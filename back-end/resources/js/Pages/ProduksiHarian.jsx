import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import add from "../../images/add.png";
import kalender from "../../images/kalender.png";
import { useForm, usePage } from "@inertiajs/react";

export default function ProduksiHarian({ initialMenus }) {
    const { props } = usePage();
    
    const { data, setData, post, processing, errors } = useForm({
        menus: (initialMenus || []).map(item => ({
            id: item.id,
            name: item.nama,
            price: item.harga,
            qty: item.quantity,
            img: item.gambar || add
        }))
    });

    const [showModal, setShowModal] = useState(false);
    const [newMenu, setNewMenu] = useState({ name: "", price: 0, img: null });
    const [flashMessage, setFlashMessage] = useState({ success: null, error: null });

    // Handle flash messages dari Inertia
    useEffect(() => {
        if (props.flash?.success) {
            setFlashMessage({ success: props.flash.success, error: null });
            const timer = setTimeout(() => {
                setFlashMessage({ success: null, error: null });
            }, 5000);
            return () => clearTimeout(timer);
        }
        
        if (props.flash?.error) {
            setFlashMessage({ success: null, error: props.flash.error });
        }
    }, [props.flash]);

    // Ubah quantity menu
    const handleQtyChange = (index, value) => {
        const updated = [...data.menus];
        updated[index].qty = Number(value);
        setData("menus", updated);
    };

    // Tambah menu baru
    const handleAddMenu = () => {
        if (!newMenu.name.trim()) {
            alert("Nama menu harus diisi!");
            return;
        }
        
        if (newMenu.price <= 0) {
            alert("Harga menu harus lebih dari 0!");
            return;
        }

        setData("menus", [...data.menus, { 
            ...newMenu, 
            qty: 0, 
            img: newMenu.img || add,
            id: null
        }]);
        setNewMenu({ name: "", price: 0, img: null });
        setShowModal(false);
    };

    // Upload gambar menu baru
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
            alert("File harus berupa gambar!");
            return;
        }
        
        if (file.size > 2 * 1024 * 1024) {
            alert("Ukuran gambar maksimal 2MB!");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => setNewMenu({ ...newMenu, img: reader.result });
        reader.readAsDataURL(file);
    };

    // Simpan ke backend
    const submit = (e) => {
        e.preventDefault();

        console.log("Data yang dikirim:", data.menus);

        const hasValidQuantity = data.menus.some(item => item.qty > 0);
        if (!hasValidQuantity) {
            alert("Minimal ada 1 menu dengan quantity lebih dari 0!");
            return;
        }

        post("/produksi/save", {
            menus: data.menus.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                qty: item.qty,
                img: item.img
            }))
        });
    };

    // Hitung total porsi
    const totalPorsi = data.menus.reduce((sum, item) => sum + item.qty, 0);
    const totalNilaiProduksi = data.menus.reduce((sum, item) => sum + (item.price * item.qty), 0);

    return (
        <Layout>
            <div className="flex w-full h-screen gap-4 p-4">
                <div className="bg-white p-6 rounded-lg shadow-md flex-1 overflow-y-auto">
                    <h1 className="font-bold text-pink-500 text-xl mb-4">Menu Produksi</h1>

                    {/* Flash Messages */}
                    {flashMessage.success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            ✅ {flashMessage.success}
                        </div>
                    )}
                    
                    {flashMessage.error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            ❌ {flashMessage.error}
                        </div>
                    )}

                    {/* Error Messages dari validation */}
                    {errors.menus && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            ❌ {errors.menus}
                        </div>
                    )}

                    <div className="flex items-center gap-2 mb-4 font-bold">
                        <img src={kalender} alt="kalender" className="w-4 h-4 relative top-[1px]" />
                        <p>Tanggal Produksi</p>
                    </div>

                    <div className="bg-white border border-pink-300 mb-4 p-4 rounded-lg shadow-md shadow-pink-200/50">
                        <input 
                            type="date" 
                            className="rounded px-2 py-1 w-full border border-gray-300" 
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-">
                        {data.menus.map((item, index) => (
                            <div key={item.id || `new-${index}`} 
                                className="bg-pink-100 rounded-xl shadow p-3 w-36 flex flex-col items-center">
                                
                                <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                                <p className="font-bold text-sm mt-1">{item.name}</p>
                                <p className="text-xs text-gray-600">Rp. {item.price.toLocaleString()}</p>
                                
                                <input
                                    type="number"
                                    value={item.qty}
                                    onChange={(e) => handleQtyChange(index, e.target.value)}
                                    min="0"
                                    className="bg-gray-200 rounded-lg w-16 p-1 text-center mt-3 text-sm outline-none border border-gray-300"
                                />
                            </div>
                        ))}

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-pink-100 cursor-pointer hover:bg-pink-200 transition rounded-xl shadow p-3 w-36 flex flex-col items-center justify-center"
                        >
                            <img src={add} alt="Tambah Menu" className="w-12 h-12 mb-2" />
                            <p className="text-center text-sm font-bold">Tambah Menu Baru</p>
                        </button>
                    </div>

                    {/* Ringkasan Produksi */}
                    <div className="mt-6">
                        <h2 className="font-bold mb-2">Ringkasan Produksi</h2>
                        <table className="w-full table-auto border-collapse text-xs">
                            <thead>
                                <tr className="bg-pink-100">
                                    <th className="border px-2 py-1">Nama Menu</th>
                                    <th className="border px-2 py-1">Jumlah</th>
                                    <th className="border px-2 py-1">Harga</th>
                                    <th className="border px-2 py-1">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.menus.map((item, index) => (
                                    <tr key={index} className="even:bg-gray-50">
                                        <td className="border px-2 py-1">{item.name}</td>
                                        <td className="border px-2 py-1">{item.qty}</td>
                                        <td className="border px-2 py-1">Rp. {item.price.toLocaleString()}</td>
                                        <td className="border px-2 py-1">Rp. {(item.price * item.qty).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-4 flex justify-between items-center">
                            <div className="font-bold text-lg">
                                Total Porsi: <span className="text-pink-500">{totalPorsi}</span>
                            </div>
                            <div className="font-bold text-lg">
                                Total Nilai: <span className="text-green-600">Rp. {totalNilaiProduksi.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={submit}
                        disabled={processing}
                        className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition mt-6 w-full"
                    >
                        {processing ? "Menyimpan..." : "Simpan Produksi"}
                    </button>
                </div>
            </div>

            {/* Modal tambah menu */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-80 shadow-lg flex flex-col">
                        <h2 className="font-bold text-lg mb-4 text-center text-pink-500">Tambah Menu Baru</h2>
                        
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Nama Menu</label>
                            <input
                                type="text"
                                placeholder="Masukkan nama menu"
                                value={newMenu.name}
                                onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Harga Menu</label>
                            <input
                                type="number"
                                placeholder="Masukkan harga"
                                value={newMenu.price}
                                onChange={(e) => setNewMenu({ ...newMenu, price: Number(e.target.value) })}
                                min="0"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Gambar Menu</label>
                            <label className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer mb-3 inline-block text-center w-full hover:bg-pink-600 transition">
                                Pilih Gambar
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                    className="hidden" 
                                />
                            </label>
                        </div>
                        
                        {newMenu.img && (
                            <div className="mb-4 self-center">
                                <p className="text-sm text-center mb-2">Preview:</p>
                                <img 
                                    src={newMenu.img} 
                                    alt="Preview" 
                                    className="w-24 h-24 object-cover rounded border border-gray-300" 
                                />
                            </div>
                        )}
                        
                        <div className="flex justify-end gap-2 mt-4">
                            <button 
                                onClick={() => setShowModal(false)} 
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={handleAddMenu} 
                                className="px-4 py-2 rounded bg-pink-500 text-white hover:bg-pink-600 transition"
                            >
                                Tambah Menu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}