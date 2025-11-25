import React from "react";
import { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Layout from "../components/Layout";
import defaultImage from "../../images/default-menu.png"; // gambar default

export default function Transaksi({ menuItems }) {
    const { props } = usePage();
    const [cart, setCart] = useState([]);
    const [flashMessage, setFlashMessage] = useState({ success: null, error: null });

    const { post, processing } = useForm();

    // Handle flash messages
    useEffect(() => {
        if (props.flash?.success) {
            setFlashMessage({ success: props.flash.success, error: null });
            const timer = setTimeout(() => {
                setFlashMessage({ success: null, error: null });
                setCart([]); // Kosongkan cart setelah sukses
            }, 5000);
            return () => clearTimeout(timer);
        }
        
        if (props.flash?.error) {
            setFlashMessage({ success: null, error: props.flash.error });
        }
    }, [props.flash]);

    const addToCart = (item) => {
        // Cek stok tersedia
        if (item.stock <= 0) {
            alert(`Stok ${item.name} habis!`);
            return;
        }

        setCart(prev => {
            const found = prev.find(i => i.id === item.id);

            if (found) {
                // Cek apakah melebihi stok
                if (found.qty >= item.stock) {
                    alert(`Stok ${item.name} hanya ${item.stock}!`);
                    return prev;
                }
                return prev.map(i =>
                    i.id === item.id ? { ...i, qty: i.qty + 1 } : i
                );
            }

            return [...prev, { 
                ...item, 
                qty: 1 
            }];
        });
    };

    const removeFromCart = (item) => {
        setCart(prev => {
            const found = prev.find(i => i.id === item.id);

            if (!found) return prev;

            if (found.qty === 1) {
                return prev.filter(i => i.id !== item.id);
            }

            return prev.map(i =>
                i.id === item.id ? { ...i, qty: i.qty - 1 } : i
            );
        });
    };

    const createOrder = () => {
        if (cart.length === 0) {
            alert("Keranjang masih kosong!");
            return;
        }

        // Konfirmasi pesanan
        if (!confirm(`Buat pesanan dengan ${cart.reduce((sum, i) => sum + i.qty, 0)} item?`)) {
            return;
        }

        // Kirim ke backend
        post('/transactions', {
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.qty
            }))
        });
    };

    return (
        <Layout>
            <div className="flex w-full h-screen gap-4 p-4">
                {/* Flash Messages */}
                {flashMessage.success && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded shadow-lg z-50">
                        ✅ {flashMessage.success}
                    </div>
                )}
                
                {flashMessage.error && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded shadow-lg z-50">
                        ❌ {flashMessage.error}
                    </div>
                )}

                <div className={`bg-white p-6 rounded-lg shadow-md flex-1 overflow-y-auto transition-all duration-300 
                    ${cart.length > 0 ? "w-[68%]" : "w-full"}`}>

                    <h1 className="font-bold text-pink-500 text-xl mb-4">Menu Transaksi</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
                        {menuItems.map((item, index) => (
                            <div 
                                key={item.id} 
                                onClick={() => addToCart(item)}
                                className={`bg-pink-100 cursor-pointer hover:bg-pink-200 transition rounded-xl shadow p-3 w-36 flex flex-col items-center
                                    ${item.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <img 
                                    src={item.img} 
                                    alt={item.name}
                                    className="w-12 h-12 rounded-lg object-cover" 
                                />
                                <p className="font-bold text-sm mt-1 text-center">{item.name}</p>
                                <p className="text-xs text-gray-600">Rp. {item.price.toLocaleString()}</p>
                                <p className={`text-xs mt-1 ${item.stock <= 0 ? 'text-red-500' : 'text-green-600'}`}>
                                    Stok: {item.stock}
                                </p>
                            </div>
                        ))}
                    </div>

                    {menuItems.length === 0 && (
                        <div className="text-center text-gray-500 mt-8">
                            Belum ada menu yang tersedia. Tambahkan menu di halaman Produksi terlebih dahulu!
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="w-[32%] bg-white rounded-lg shadow-md p-4 flex flex-col">
                        <h2 className="font-bold text-lg mb-4 text-pink-500">Keranjang Pesanan</h2>
                        
                        <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px] pr-2">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-pink-50 border border-pink-500 rounded-lg p-3 shadow-sm">
                                    <img 
                                        src={item.img} 
                                        alt={item.name}
                                        className="w-10 h-10 rounded-md object-cover" 
                                    />

                                    <div className="flex-1">
                                        <p className="font-bold text-sm">{item.name}</p>
                                        <p className="text-xs text-gray-600">
                                            Rp. {item.price.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-green-600">
                                            Stok: {item.stock}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => removeFromCart(item)}
                                            className="px-2 py-1 bg-pink-200 rounded hover:bg-pink-300 transition"
                                        > 
                                            – 
                                        </button>
                                        <span className="px-3 font-semibold">{item.qty}</span>

                                        <button
                                            onClick={() => addToCart(item)}
                                            className="px-2 py-1 bg-pink-200 rounded hover:bg-pink-300 transition"
                                        > 
                                            + 
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-6 bg-pink-50 border-t flex items-center justify-between gap-2">
                            <div>
                                <p className="text-sm text-gray-500">
                                    {cart.reduce((sum, i) => sum + i.qty, 0)} item
                                </p>
                                <p className="text-xl font-bold text-pink-600">
                                    Rp. {cart.reduce((sum, i) => sum + i.price * i.qty, 0).toLocaleString()}
                                </p>
                            </div>

                            <button 
                                onClick={createOrder}
                                disabled={processing}
                                className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition disabled:opacity-50"
                            >
                                {processing ? "Memproses..." : "Buat Pesanan"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}