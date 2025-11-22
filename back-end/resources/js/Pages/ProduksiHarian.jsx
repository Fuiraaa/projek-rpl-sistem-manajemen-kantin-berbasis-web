import React from "react";
import { useState } from "react";
import kalender from "../../images/kalender.png";
import ayambakar from "../../images/mayambakar.png";
import ayamgoreng from "../../images/mayamgoreng.png";
import ayamkecap from "../../images/mayamkecap.png";
import atiampela from "../../images/matiampela.png";
import telurbalado from "../../images/mtelurbalado.png";
import telurgoreng from "../../images/mtelurgoreng.png";
import sosistelur from "../../images/msosistelur.png";
import pisangcokelat from "../../images/mpisangcokelat.png";
import tempegoreng from "../../images/mtempegoreng.png";
import nasigoreng from "../../images/mnasigoreng.png";
import indomie from "../../images/mindomie.png";
import micelor from "../../images/micelor.png";
import mikariayam from "../../images/mikariayam.png";
import mikriuk from "../../images/migorengkriuk.png";
import mirendang from "../../images/mirendang.png";
import micabeijo from "../../images/micabeijo.png";
import leminerale from "../../images/mleminerale.png";
import goodday from "../../images/mgoodday.png";
import chocolatos from "../../images/mchocolatos.png";
import milo from "../../images/milo.png";
import drinkbengbeng from "../../images/mdrinkbengbeng.png";
import frisianflag from "../../images/mfrisianflag.png";
import tehsisri from "../../images/mtehsisri.png";
import teajus from "../../images/mteajus.png";
import hilo from "../../images/mhilo.png";
import popes from "../../images/mpopes.png";
import add from "../../images/add.png";
import Layout from "../components/Layout";

export default function ProduksiHarian() {
    const initialMenuItems = [
        
        { name: "Ayam Bakar", price: 12000, img: ayambakar, qty: 30 },
        { name: "Ayam Goreng", price: 12000, img: ayamgoreng, qty: 30 },
        { name: "Ayam Kecap", price: 12000, img: ayamkecap, qty: 30 },
        { name: "Ati Ampela", price: 10000, img: atiampela, qty: 30 },
        { name: "Telur Balado", price: 10000, img: telurbalado, qty: 30 },
        { name: "Telur Goreng", price: 10000, img: telurgoreng, qty: 30 },
        { name: "Sosis Telur", price: 5000, img: sosistelur, qty: 30 },
        { name: "Pisang Cokelat", price: 1000, img: pisangcokelat, qty: 30 },
        { name: "Tempe Goreng", price: 1000, img: tempegoreng, qty: 30 },
        { name: "Nasi Goreng", price: 10000, img: nasigoreng, qty: 30 },
        { name: "Mi Goreng", price: 7000, img: indomie, qty: 30 },
        { name: "Mi Cellor", price: 7000, img: micelor, qty: 30 },
        { name: "Mi Kari Ayam", price: 7000, img: mikariayam, qty: 30 },
        { name: "Mi Goreng Kriuk", price: 7000, img: mikriuk, qty: 30 },
        { name: "Mi Rendang", price: 7000, img: mirendang, qty: 30 },
        { name: "Mi Cabe Ijo", price: 7000, img: micabeijo, qty: 30 },
        { name: "Le Minerale", price: 5000, img: leminerale, qty: 30 },
        { name: "Good Day", price: 5000, img: goodday, qty: 30 },
        { name: "Chocolatos Drink", price: 5000, img: chocolatos, qty: 30 },
        { name: "Milo", price: 5000, img: milo, qty: 30 },
        { name: "Drink Beng-Beng", price: 5000, img: drinkbengbeng, qty: 30 },
        { name: "Frisian Flag", price: 5000, img: frisianflag, qty: 30 },
        { name: "Teh Sisri", price: 5000, img: tehsisri, qty: 30 },
        { name: "Tea Jus", price: 5000, img: teajus, qty: 30 },
        { name: "Hilo", price: 5000, img: hilo, qty: 30 },
        { name: "Pop Ice", price: 5000, img: popes, qty: 30 },
    ];

    const [menuItems, setMenuItems] = useState(initialMenuItems);
    const [showModal, setShowModal] = useState(false);
    const [newMenu, setNewMenu] = useState({ name: "", price: 0, img: null });

    const handleAddMenu = () => {
        const itemToAdd = { ...newMenu, qty: 0, img: newMenu.img || add };
        setMenuItems([...menuItems, itemToAdd]);
        setNewMenu({ name: "", price: 0, img: null });
        setShowModal(false);
    };

    const handleQtyChange = (index, value) => {
        const updated = [...menuItems];
        updated[index].qty = Number(value);
        setMenuItems(updated);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setNewMenu({ ...newMenu, img: reader.result });
        reader.readAsDataURL(file);
    };

    const totalPorsi = menuItems.reduce((sum, item) => sum + item.qty, 0);

    return (
        <Layout>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 relative h-screen flex flex-col">
            <h1 className="font-bold text-pink-500 text-xl mb-4">Menu Produksi</h1>

            <div className="flex items-center gap-2 mb-4 font-bold">
                <img src={kalender} alt="kalender" className="w-4 h-4 relative top-[1px]" />
                <p>Tanggal Produksi</p>
            </div>

            <div className="bg-white border border-pink-300 mb-4 p-4 rounded-lg shadow-md shadow-pink-200/50">
                <input type="date" defaultValue="" className="rounded px-2 py-1 w-full" />
            </div>

            <div className="flex-1 overflow-y-auto mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5 items-start">
                    {menuItems.map((item, index) => (
                        <div key={index} className="bg-pink-100 rounded-xl shadow p-3 w-36 flex flex-col items-center">
                            <div className="flex flex-col items-center text-center">
                                <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                                <p className="font-bold text-sm mt-1">{item.name}</p>
                                <p className="font-semibold text-xs text-gray-600">Rp. {item.price.toLocaleString()}</p>
                            </div>
                            <input type="number" value={item.qty} onChange={(e) => handleQtyChange(index, e.target.value)}
                                className="bg-gray-200 rounded-lg w-16 p-1 text-center mt-3 text-sm outline-none" />
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

                        <button onClick={() => console.log(menuItems)} className="bg-pink-400 rounded-full px-8 py-3 text-white font-bold hover:bg-pink-500 self-center">
                            Simpan Menu
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-80 shadow-lg flex flex-col">
                        <h2 className="font-bold text-lg mb-4 text-center">Tambah Menu Baru</h2>

                        <input type="text" placeholder="Nama Menu" value={newMenu.name}
                            onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                            className="w-full mb-3 p-2 border rounded" />

                        <input type="number" placeholder="Harga Menu" value={newMenu.price}
                            onChange={(e) => setNewMenu({ ...newMenu, price: Number(e.target.value) })}
                            className="w-full mb-3 p-2 border rounded" />

                        <label className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer mb-3 inline-block text-center">
                            Pilih Gambar
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>

                        {newMenu.img && (
                            <img src={newMenu.img} alt="Preview" className="w-24 h-24 object-cover mb-4 self-center rounded" />)}

                        <div className="flex justify-end gap-2 mt-auto">
                            <button onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
                                Batal
                            </button>

                            <button onClick={handleAddMenu}
                                className="px-4 py-2 rounded bg-pink-500 text-white hover:bg-pink-600">
                                Tambah
                            </button>
                        </div>
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
                            {menuItems.map((item, index) => (
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
                        {menuItems.reduce((sum, item) => sum + item.qty, 0)}
                    </p>
                    <p className="font-bold text-white text-lg mb-4"> Porsi </p>
                </div>
            </div>
        </div>
        </Layout>
    );
}
