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

export default function ChartKeuangan({ data }) {
  
  // Custom Tooltip (Desain Asli Anda)
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-pink-200 shadow-lg rounded-xl z-50">
          <p className="font-bold text-pink-700 mb-2">{label}</p>
          <p className="text-sm text-pink-500 font-medium">
            Masuk: <span className="text-gray-600">Rp {payload[0].value.toLocaleString('id-ID')}</span>
          </p>
          <p className="text-sm text-pink-300 font-medium">
            Keluar: <span className="text-gray-400">Rp {payload[1].value.toLocaleString('id-ID')}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow p-6 flex flex-col h-full min-h-[450px]">
      
      {/* Header */}
      <h2 className="text-[#b44d7a] font-semibold text-lg mb-6">
        Grafik Keuangan
      </h2>

      {/* PERBAIKAN UTAMA DI SINI:
         Kita gunakan 'flex-grow' agar mengisi sisa ruang, 
         TAPI kita kunci dengan 'h-full' dan 'min-h-0' agar ResponsiveContainer bekerja.
      */}
      <div className="flex-grow w-full h-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3d1e5" vertical={false} />
            
            <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                dy={10}
            />
            
            <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => {
                    if (value >= 1000000) return `${value / 1000000}jt`;
                    if (value >= 1000) return `${value / 1000}rb`;
                    return value;
                }} 
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{fill: '#fce7f3', opacity: 0.4}} />
            
            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }}/>

            {/* Batang Pemasukan (Pink Tua) */}
            <Bar 
                name="Pemasukan" 
                dataKey="pemasukan" 
                fill="#ff7db3" 
                radius={[6, 6, 0, 0]} 
                barSize={30} // Ukuran batang dipertegas
            />
            
            {/* Batang Pengeluaran (Pink Muda) */}
            <Bar 
                name="Pengeluaran" 
                dataKey="pengeluaran" 
                fill="#ffd6e7" 
                radius={[6, 6, 0, 0]} 
                barSize={30} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}