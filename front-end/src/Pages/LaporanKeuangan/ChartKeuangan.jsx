import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ChartKeuangan() {
  const data = [
    { name: "Jan", pemasukan: 48, pengeluaran: 26 },
    { name: "Feb", pemasukan: 49, pengeluaran: 27 },
    { name: "Mar", pemasukan: 50, pengeluaran: 28 },
    { name: "Apr", pemasukan: 52, pengeluaran: 29 },
    { name: "Mei", pemasukan: 55, pengeluaran: 24 },
    { name: "Jun", pemasukan: 41, pengeluaran: 23 },
    { name: "Jul", pemasukan: 30, pengeluaran: 16 },
    { name: "Ags", pemasukan: 40, pengeluaran: 30 },
    { name: "Sept", pemasukan: 49, pengeluaran: 27 },
    { name: "Okt", pemasukan: 53, pengeluaran: 29 },
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow p-6 flex flex-col">
      {/* Title */}
      <h2 className="text-[#b44d7a] font-semibold text-lg mb-4">
        Grafik Keuangan
      </h2>

      {/* Chart auto full height */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={5}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3d1e5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="center"
            />

            <Bar dataKey="pemasukan" fill="#ff7db3" radius={[6, 6, 0, 0]} />
            <Bar dataKey="pengeluaran" fill="#ffd6e7" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
