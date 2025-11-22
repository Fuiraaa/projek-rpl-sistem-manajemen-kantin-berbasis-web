import React from "react";
import { useState } from "react";
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
import Layout from "../components/Layout";

export default function ProduksiHarian() {

    const menuItems = [
        { name: "Ayam Bakar", price: 12000, img: ayambakar },
        { name: "Ayam Goreng", price: 12000, img: ayamgoreng },
        { name: "Ayam Kecap", price: 12000, img: ayamkecap },
        { name: "Ati Ampela", price: 10000, img: atiampela },
        { name: "Telur Balado", price: 10000, img: telurbalado },
        { name: "Telur Goreng", price: 10000, img: telurgoreng },
        { name: "Sosis Telur", price: 5000, img: sosistelur },
        { name: "Pisang Cokelat", price: 1000, img: pisangcokelat },
        { name: "Tempe Goreng", price: 1000, img: tempegoreng },
        { name: "Nasi Goreng", price: 10000, img: nasigoreng },
        { name: "Mi Goreng", price: 7000, img: indomie },
        { name: "Mi Cellor", price: 7000, img: micelor },
        { name: "Mi Kari Ayam", price: 7000, img: mikariayam },
        { name: "Mi Goreng Kriuk", price: 7000, img: mikriuk },
        { name: "Mi Rendang", price: 7000, img: mirendang },
        { name: "Mi Cabe Ijo", price: 7000, img: micabeijo },
        { name: "Le Minerale", price: 5000, img: leminerale },
        { name: "Good Day", price: 5000, img: goodday },
        { name: "Chocolatos Drink", price: 5000, img: chocolatos },
        { name: "Milo", price: 5000, img: milo },
        { name: "Drink Beng-Beng", price: 5000, img: drinkbengbeng },
        { name: "Frisian Flag", price: 5000, img: frisianflag },
        { name: "Teh Sisri", price: 5000, img: tehsisri },
        { name: "Tea Jus", price: 5000, img: teajus },
        { name: "Hilo", price: 5000, img: hilo },
        { name: "Pop Ice", price: 5000, img: popes },
    ];

    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart(prev => {
            const found = prev.find(i => i.name === item.name);

            if (found) {
                return prev.map(i =>
                    i.name === item.name ? { ...i, qty: i.qty + 1 } : i
                );
            }

            return [...prev, { ...item, qty: 1 }];
        });
    };

    const removeFromCart = (item) => {
        setCart(prev => {
            const found = prev.find(i => i.name === item.name);

            if (!found) return prev;

            if (found.qty === 1) {
                return prev.filter(i => i.name !== item.name);
            }

            return prev.map(i =>
                i.name === item.name ? { ...i, qty: i.qty - 1 } : i
            );
        });
    };

    return (
        <Layout>
        <div className="flex w-full h-screen gap-4 p-4">

            <div className={`bg-white p-6 rounded-lg shadow-md flex-1 overflow-y-auto transition-all duration-300 
                ${cart.length > 0 ? "w-[68%]" : "w-full"}`}>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
                    {menuItems.map((item, index) => (
                        <div key={index} onClick={() => addToCart(item)}
                            className="bg-pink-100 cursor-pointer hover:bg-pink-200 transition rounded-xl shadow p-3 w-36 flex flex-col items-center">

                            <img src={item.img} className="w-12 h-12 rounded-lg" />
                            <p className="font-bold text-sm mt-1">{item.name}</p>
                            <p className="text-xs text-gray-600">Rp. {item.price.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>

            {cart.length > 0 && (
                <div className="w-[32%] bg-white rounded-lg shadow-md p-4 flex flex-col">
                    <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px] pr-2">
                        {cart.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-pink-50 border border-pink-500 rounded-lg p-3 shadow-sm">
                                <img src={item.img} className="w-10 h-10  rounded-md" />

                                <div className="flex-1">
                                    <p className="font-bold text-sm">{item.name}</p>
                                    <p className="text-xs text-gray-600">
                                        Rp. {item.price.toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => removeFromCart(item)}
                                        className="px-2 py-1 bg-pink-200 rounded"> – </button>
                                    <span className="px-3">{item.qty}</span>

                                    <button
                                        onClick={() => addToCart(item)}
                                        className="px-2 py-1 bg-pink-200 rounded"> + </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mb-4 pt-6 bg-pink-50 border-t flex items-center justify-between gap-2">

                        <div>
                            <p className="text-sm text-gray-500">
                                {cart.reduce((sum, i) => sum + i.qty, 0)} item
                            </p>
                            <p className="text-xl font-bold text-pink-600">
                                Rp. {cart.reduce((sum, i) => sum + i.price * i.qty, 0).toLocaleString()}
                            </p>
                        </div>

                        <button className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition">
                            Buat Pesanan
                        </button>
                    </div>
                </div>
            )}

        </div>
        </Layout>
    );
}
