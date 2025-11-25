import React, { useState, useEffect, useMemo } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import kalender from "../../images/kalender.png";
import add from "../../images/add.png";
import Layout from "../components/Layout";

export default function ProduksiHarian({ menus, allProduksi }) {
    const { flash } = usePage().props;
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [showModal, setShowModal] = useState(false);

    // state menyimpan items yang ditampilkan (dibangun dari props)
    const [menuItems, setMenuItems] = useState([]);

    // Form untuk menu baru
    const {
        data: menuData,
        setData: setMenuData,
        post: postMenu,
        processing: menuProcessing,
        errors: menuErrors,
        reset: resetMenu,
    } = useForm({
        nama: "",
        harga: 0,
        gambar: null,
    });

    // Form untuk produksi (kita akan langsung kirim data saat post)
const {
    data: produksiData,
    setData: setProduksiData,
    processing: produksiProcessing,
    post: postProduksi,
    errors: produksiErrors
} = useForm({
    tanggal_produksi: selectedDate,
    items: []
});

    // Build menuItems setiap kali menus OR allProduksi OR selectedDate berubah.
    // Ini menghindari dependency pada menuItems.length yang menyebabkan loop/race.
    useEffect(() => {
        // buat dasar dari menus
        const base = (menus || []).map(menu => ({
            menu_id: menu.menu_id,
            name: menu.nama,
            price: parseFloat(menu.harga),
            img: menu.gambar ? `/${menu.gambar}` : add,
            qty: 0
        }));

        // cari produksi hari ini pada props allProduksi
        const produksiHariIni = (allProduksi || []).find(p => p.tanggal_produksi === selectedDate);

        if (produksiHariIni && produksiHariIni.produksi_detail) {
            const merged = base.map(b => {
                const existing = produksiHariIni.produksi_detail.find(d => d.menu_id === b.menu_id);
                return {
                    ...b,
                    qty: existing ? existing.jumlah_porsi : 0
                };
            });
            setMenuItems(merged);
        } else {
            setMenuItems(base);
        }
    }, [menus, allProduksi, selectedDate]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setMenuData('gambar', file);
    };

    const handleAddMenu = (e) => {
        e.preventDefault();

        // Kirim ke backend tanpa optimistic update.
        // useForm.post akan meng-encode file jika menuData.gambar bertipe File.
        postMenu('/menus', {
            preserveScroll: true,
            onSuccess: () => {
                // Tutup modal, reset form, lalu reload hanya `menus`
                resetMenu();
                setShowModal(false);

                // Minta server mengirim ulang props `menus`
                router.reload({ only: ['menus'] });
            },
            onError: () => {
                alert('Gagal menambah menu. Periksa input.');
            }
        });
    };

    const handleQtyChange = (index, value) => {
        // nilai baru diterapkan langsung di state menuItems (local UI update)
        const updated = menuItems.map((m, i) => i === index ? { ...m, qty: Number(value) } : m);
        setMenuItems(updated);
    };

const handleSaveProduksi = (e) => {
    e.preventDefault();

    const itemsToSave = menuItems
        .filter(item => item.qty > 0)
        .map(item => ({
            menu_id: item.menu_id,
            jumlah_porsi: item.qty
        }));

    if (itemsToSave.length === 0) {
        alert('Tidak ada item yang akan disimpan');
        return;
    }

    // set data form
setProduksiData({
    tanggal_produksi: selectedDate,
    items: itemsToSave
});


    // kirim
    postProduksi('/produksi', {
        preserveScroll: true,
        onSuccess: () => {
            router.reload({ only: ['allProduksi'] });
        },
        onError: () => {
            alert('Gagal menyimpan produksi');
        }
    });
};

    const totalPorsi = menuItems.reduce((sum, item) => sum + Number(item.qty), 0);

    return (
        <Layout>
            {flash && flash.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    {flash.success}
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md mb-6 relative h-screen flex flex-col">
                <h1 className="font-bold text-pink-500 text-xl mb-4">Menu Produksi</h1>

                <div className="flex items-center gap-2 mb-4 font-bold">
                    <img src={kalender} alt="kalender" className="w-4 h-4 relative top-[1px]" />
                    <p>Tanggal Produksi</p>
                </div>

                <div className="bg-white border border-pink-300 mb-4 p-4 rounded-lg shadow-md shadow-pink-200/50">
                    <input 
                        type="date" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="rounded px-2 py-1 w-full" 
                    />
                </div>

                <div className="flex-1 overflow-y-auto mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5 items-start">
                        {menuItems.map((item, index) => (
                            <div key={item.menu_id} className="bg-pink-100 rounded-xl shadow p-3 w-36 flex flex-col items-center">
                                <div className="flex flex-col items-center text-center">
                                    <img 
                                        src={item.img} 
                                        alt={item.name} 
                                        className="w-12 h-12 object-cover rounded-lg" 
                                    />
                                    <p className="font-bold text-sm mt-1">{item.name}</p>
                                    <p className="font-semibold text-xs text-gray-600">Rp. {item.price.toLocaleString()}</p>
                                </div>
                                <input 
                                    type="number" 
                                    value={item.qty} 
                                    onChange={(e) => handleQtyChange(index, e.target.value)}
                                    className="bg-gray-200 rounded-lg w-16 p-1 text-center mt-3 text-sm outline-none" 
                                    min="0"
                                />
                            </div>
                        ))}

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-pink-100 rounded-xl shadow p-3 w-36 h-36 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-200 transition">
                                <img src={add} alt="Tambah Menu" className="w-12 h-12 mb-2" />
                                <p className="text-center text-sm font-bold">
                                    Tambahkan Jenis<br />Menu Baru
                                </p>
                            </button>

                            <button 
                                onClick={handleSaveProduksi} 
                                disabled={produksiProcessing}
                                className="bg-pink-400 rounded-full px-8 py-3 text-white font-bold hover:bg-pink-500 self-center disabled:bg-pink-300"
                            >
                                {produksiProcessing ? 'Menyimpan...' : 'Simpan Menu'}
                            </button>
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-80 shadow-lg flex flex-col">
                            <h2 className="font-bold text-lg mb-4 text-center">Tambah Menu Baru</h2>

                            <form onSubmit={handleAddMenu}>
                                <input 
                                    type="text" 
                                    placeholder="Nama Menu" 
                                    value={menuData.nama}
                                    onChange={(e) => setMenuData('nama', e.target.value)}
                                    className="w-full mb-3 p-2 border rounded" 
                                />
                                {menuErrors.nama && (
                                    <div className="text-red-500 text-sm mb-2">{menuErrors.nama}</div>
                                )}

                                <input 
                                    type="number" 
                                    placeholder="Harga Menu" 
                                    value={menuData.harga}
                                    onChange={(e) => setMenuData('harga', Number(e.target.value))}
                                    className="w-full mb-3 p-2 border rounded" 
                                />
                                {menuErrors.harga && (
                                    <div className="text-red-500 text-sm mb-2">{menuErrors.harga}</div>
                                )}

                                <label className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer mb-3 inline-block text-center">
                                    Pilih Gambar
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleFileChange} 
                                        className="hidden" 
                                    />
                                </label>
                                {menuErrors.gambar && (
                                    <div className="text-red-500 text-sm mb-2">{menuErrors.gambar}</div>
                                )}

                                {menuData.gambar && (
                                    <img 
                                        src={typeof menuData.gambar === 'string' ? menuData.gambar : URL.createObjectURL(menuData.gambar)} 
                                        alt="Preview" 
                                        className="w-24 h-24 object-cover mb-4 self-center rounded" 
                                    />
                                )}

                                <div className="flex justify-end gap-2 mt-auto">
                                    <button 
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                    >
                                        Batal
                                    </button>

                                    <button 
                                        type="submit"
                                        disabled={menuProcessing}
                                        className="px-4 py-2 rounded bg-pink-500 text-white hover:bg-pink-600 disabled:bg-pink-300"
                                    >
                                        {menuProcessing ? 'Menambah...' : 'Tambah'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto mt-4 flex gap-4">
                    <div className="w-1/2">
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
                                {menuItems.filter(item => item.qty > 0).map((item, index) => (
                                    <tr key={index} className="even:bg-gray-50">
                                        <td className="border px-2 py-1">{item.name}</td>
                                        <td className="border px-2 py-1">{item.qty}</td>
                                        <td className="border px-2 py-1">Rp. {item.price.toLocaleString()}</td>
                                        <td className="border px-2 py-1">Rp. {(item.price * item.qty).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="w-1/2 mt-8 w-48 h-32 bg-rose-200 rounded-lg p-4 flex flex-col justify-center items-center">
                        <h2 className="font-bold text-white text-lg mt-8">Total Porsi Hari Ini</h2>
                        <p className="text-6xl text-white font-extrabold">
                            {totalPorsi}
                        </p>
                        <p className="font-bold text-white text-lg mb-4"> Porsi </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
