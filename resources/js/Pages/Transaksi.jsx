import React, { useState, useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import Layout from "../components/Layout";
import { Package, Calendar, CheckCircle } from "lucide-react"; // Icon pelengkap untuk state loading/empty

export default function TransaksiIndex() {
    const { produksi_harian, auth, flash } = usePage().props;

    // --- STATE & LOGIC (DARI KODE PERTAMA) ---
    const [cart, setCart] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [availableMenu, setAvailableMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form data inertia
    const { data, setData } = useForm({
        produksi_harian_id: "",
        tanggal_transaksi: selectedDate,
        items: []
    });

    // --- EFFECT: Update Tanggal & Filter Stok ---
    useEffect(() => {
        setData("tanggal_transaksi", selectedDate);
    }, [selectedDate]);

    useEffect(() => {
        setLoading(true);
        const produksiHariIni = (produksi_harian || []).find(ph => ph.tanggal_produksi === selectedDate);

        if (produksiHariIni) {
            setAvailableMenu(produksiHariIni.produksi_detail || []);
            setData("produksi_harian_id", produksiHariIni.produksi_harian_id);
        } else {
            setAvailableMenu([]);
            setData("produksi_harian_id", "");
        }

        setCart([]); // Reset keranjang saat ganti tanggal
        
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);

    }, [selectedDate, produksi_harian]);

    // --- CART HANDLERS ---
    const getCartQty = (itemId) => {
        const item = cart.find(i => i.produksi_detail_id === itemId);
        return item ? item.qty : 0;
    };

    const addToCart = (item) => {
        const currentQty = getCartQty(item.produksi_detail_id);
        if (currentQty >= item.jumlah_tersisa) return; // Cegah melebihi stok

        setCart((prev) => {
            const exist = prev.find((i) => i.produksi_detail_id === item.produksi_detail_id);
            if (exist) {
                return prev.map((i) =>
                    i.produksi_detail_id === item.produksi_detail_id ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const removeFromCart = (item) => {
        setCart((prev) => {
            const exist = prev.find((i) => i.produksi_detail_id === item.produksi_detail_id);
            if (!exist) return prev;
            if (exist.qty === 1) {
                return prev.filter((i) => i.produksi_detail_id !== item.produksi_detail_id);
            }
            return prev.map((i) =>
                i.produksi_detail_id === item.produksi_detail_id ? { ...i, qty: i.qty - 1 } : i
            );
        });
    };

    // --- SUBMIT HANDLER ---
    const submit = async () => {
        if (cart.length === 0) return alert('Keranjang kosong!');
        if (!data.produksi_harian_id) return alert('Data stok tidak valid!');

        setSubmitting(true);

        const formData = {
            produksi_harian_id: data.produksi_harian_id,
            tanggal_transaksi: selectedDate,
            items: cart.map((item) => ({
                produksi_detail_id: item.produksi_detail_id,
                nama_menu: item.nama_menu,
                harga_satuan: item.harga,
                jumlah: item.qty,
            })),
        };

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
            const response = await fetch('/transaksi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'X-Timezone-Offset': selectedDate
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();

            if (response.ok) {
                setCart([]);
                router.reload({ only: ['produksi_harian', 'flash'] });
                // Alert akan dihandle oleh Flash Message di UI
            } else {
                alert('Gagal: ' + (result.message || 'Error'));
            }
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan jaringan');
        } finally {
            setSubmitting(false);
        }
    };

    // Hitung Total
    const totalItem = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalHarga = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);

    return (
        <Layout>
             {/* Flash Message Logic */}
             {flash && flash.success && (
                <div className="fixed top-5 right-5 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center gap-2 shadow-lg animate-fade-in-down">
                    <CheckCircle size={18} />
                    {flash.success}
                </div>
            )}

            <div className="flex w-full h-[calc(100vh-100px)] gap-4 p-4">

                {/* --- BAGIAN KIRI: MENU --- */}
                <div className={`bg-white p-6 rounded-lg shadow-md flex-1 overflow-hidden flex flex-col transition-all duration-300 ${cart.length > 0 ? "w-[68%]" : "w-full"}`}>
                    
                    {/* Header Kecil untuk Date Picker (Agar logika backend jalan) */}
                    <div className="mb-4 flex justify-between items-center border-b pb-2">
                        <h2 className="font-bold text-gray-700">Daftar Menu</h2>
                        <input 
                            type="date" 
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1 text-gray-600 focus:outline-none focus:border-pink-400"
                        />
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto pr-2">
                        {loading ? (
                            <div className="h-full flex flex-col items-center justify-center text-pink-300">
                                <Package className="w-10 h-10 animate-bounce mb-2" />
                                <span className="text-sm font-medium">Memuat Menu...</span>
                            </div>
                        ) : availableMenu.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                                <Calendar className="w-12 h-12 mb-2 text-gray-300" />
                                <p className="text-sm">Tidak ada stok pada tanggal ini.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
                                {availableMenu.map((item, index) => {
                                    const isOutOfStock = item.jumlah_tersisa <= 0;
                                    
                                    return (
                                        <div 
                                            key={index} 
                                            onClick={() => !isOutOfStock && addToCart(item)}
                                            className={`bg-pink-100 transition rounded-xl shadow p-3 w-36 flex flex-col items-center
                                                ${isOutOfStock ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer hover:bg-pink-200'}
                                            `}
                                        >
                                            {/* Gambar Dynamic dari Storage */}
                                            {item.gambar ? (
                                                <img src={`/storage/${item.gambar}`} className="w-12 h-12 rounded-lg object-cover" alt={item.nama_menu} />
                                            ) : (
                                                <div className="w-12 h-12 rounded-lg bg-pink-200 flex items-center justify-center text-[10px] text-pink-500">No IMG</div>
                                            )}

                                            <p className="font-bold text-sm mt-1 text-center leading-tight truncate w-full">{item.nama_menu}</p>
                                            
                                            <div className="flex flex-col items-center mt-1">
                                                <p className="text-xs text-gray-600">Rp. {item.harga.toLocaleString()}</p>
                                                <p className={`text-[10px] ${isOutOfStock ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                                                    Stok: {item.jumlah_tersisa}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* --- BAGIAN KANAN: CART (Muncul jika cart > 0) --- */}
                {cart.length > 0 && (
                    <div className="w-[32%] bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
                        
                        {/* List Item Cart */}
                        <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-2 mb-4">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-pink-50 border border-pink-500 rounded-lg p-3 shadow-sm">
                                    
                                    {item.gambar ? (
                                        <img src={`/storage/${item.gambar}`} className="w-10 h-10 rounded-md object-cover" alt={item.nama_menu} />
                                    ) : (
                                        <div className="w-10 h-10 rounded-md bg-pink-200" />
                                    )}

                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-bold text-sm truncate">{item.nama_menu}</p>
                                        <p className="text-xs text-gray-600">
                                            Rp. {item.harga.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => removeFromCart(item)}
                                            className="px-2 py-1 bg-pink-200 rounded hover:bg-pink-300 transition text-pink-800 font-bold"
                                        > – </button>
                                        
                                        <span className="px-3 text-sm font-bold">{item.qty}</span>

                                        <button
                                            onClick={() => addToCart(item)}
                                            disabled={item.qty >= item.jumlah_tersisa}
                                            className="px-2 py-1 bg-pink-200 rounded hover:bg-pink-300 transition text-pink-800 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                        > + </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Cart */}
                        <div className="pt-4 bg-pink-50 border-t flex items-center justify-between gap-2 p-3 rounded-b-lg">
                            <div>
                                <p className="text-sm text-gray-500">
                                    {totalItem} item
                                </p>
                                <p className="text-xl font-bold text-pink-600">
                                    Rp. {totalHarga.toLocaleString()}
                                </p>
                            </div>

                            <button 
                                onClick={submit}
                                disabled={submitting}
                                className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition disabled:bg-gray-400 shadow-md"
                            >
                                {submitting ? 'Proses...' : 'Buat Pesanan'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}