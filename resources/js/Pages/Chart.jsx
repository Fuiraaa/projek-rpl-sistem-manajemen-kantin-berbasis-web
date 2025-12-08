import React from "react";
import { router } from "@inertiajs/react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

// Warna Pink Palette untuk Pie Chart
const PIE_COLORS = ["#FF6BA5", "#FF9EC2", "#FFC7D8", "#FFB6C1", "#FFE5EC"];

const DashboardCharts = ({ data, filterDate, topMenu, weeklyFilterDate, dailyFilterDate }) => {
  
  // Tentukan tanggal aktif: Gunakan tanggal spesifik jika ada, fallback ke filterDate global
  const currentWeeklyDate = weeklyFilterDate || filterDate;
  const currentDailyDate = dailyFilterDate || filterDate;

  // 1. Handle Ganti Tanggal Chart Kiri (Mingguan)
  const handleWeeklyDateChange = (e) => {
    router.get('/dashboard', { 
        date_weekly: e.target.value, // Kirim parameter khusus chart kiri
        date_daily: currentDailyDate // Pertahankan tanggal chart kanan
    }, { preserveState: true, preserveScroll: true });
  };

  // 2. Handle Ganti Tanggal Chart Kanan (Harian)
  const handleDailyDateChange = (e) => {
    router.get('/dashboard', { 
        date_daily: e.target.value, // Kirim parameter khusus chart kanan
        date_weekly: currentWeeklyDate // Pertahankan tanggal chart kiri
    }, { preserveState: true, preserveScroll: true });
  };

  // 3. Custom Tooltip untuk Line Chart (Format Rupiah)
  const CustomTooltipLine = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-blue-100 shadow-lg rounded-xl">
          <p className="font-bold text-gray-700 text-sm mb-1">{label}</p>
          <p className="text-xs text-gray-500">
            Pendapatan: <span className="font-bold text-blue-600">Rp {Number(payload[0].value).toLocaleString('id-ID')}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // 4. Olah Data Pie Chart (Ubah Kuantitas ke Persentase)
  let pieData = [];
  if (topMenu && topMenu.length > 0) {
    // Hitung total semua item terjual dari top 5 menu ini
    const totalSales = topMenu.reduce((acc, curr) => acc + Number(curr.total_terjual), 0);

    pieData = topMenu.map((menu, index) => {
        const qty = Number(menu.total_terjual);
        // Hitung persentase (qty / total * 100), bulatkan 1 desimal
        const percentage = totalSales > 0 ? ((qty / totalSales) * 100).toFixed(1) : 0;
        
        return {
            name: menu.nama,
            value: qty, // Nilai asli (untuk ukuran slice pie chart)
            percent: percentage, // Nilai persentase (untuk label legenda)
            color: PIE_COLORS[index % PIE_COLORS.length]
        };
    });
  }

  return (
    // UBAH GRID: Gunakan grid-cols-2 agar lebarnya seimbang 50:50 di desktop
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      
      {/* --- KIRI: LINE CHART (PENDAPATAN MINGGUAN) --- */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 w-full">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="text-pink-500 font-semibold">
            <h3 className="font-bold text-lg text-pink-700">Total Pendapatan Mingguan</h3>
          </div>
          <div className="relative">
            <input 
              id="date-weekly" 
              type="date" 
              value={currentWeeklyDate} // Gunakan state tanggal mingguan
              onChange={handleWeeklyDateChange} // Gunakan handler khusus mingguan
              className="bg-pink-50 border border-pink-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 shadow-sm" 
            />
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#9ca3af', fontSize: 12}} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#9ca3af', fontSize: 12}} 
                tickFormatter={(val) => `${val/1000}k`} 
              />
              <Tooltip content={<CustomTooltipLine />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line 
                type="monotone" 
                name="Keuntungan"
                dataKey="keuntungan" 
                stroke="#2A64D9" 
                strokeWidth={3}
                activeDot={{ r: 8 }} 
                dot={{ r: 4, fill: '#2A64D9', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- KANAN: PIE CHART (MENU TERLARIS) --- */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 w-full flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="text-pink-500 font-semibold">
            <h3 className="font-bold text-lg text-pink-700">Menu Terlaris</h3>
          </div>
          
          <div className="relative">
             <input 
              id="date-pie" 
              type="date" 
              value={currentDailyDate} // Gunakan state tanggal harian
              onChange={handleDailyDateChange} // Gunakan handler khusus harian
              className="bg-pink-50 border border-pink-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 shadow-sm" 
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 items-center justify-center flex-grow">
          
          {/* 1. Grafik Lingkaran */}
          <div className="w-[220px] h-[220px] flex-shrink-0 relative">
             {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={pieData} 
                      dataKey="value" 
                      nameKey="name" 
                      innerRadius={65} 
                      outerRadius={95} 
                      paddingAngle={3}
                      stroke="none"
                    >
                      {pieData.map((item, index) => (
                        <Cell key={`cell-${index}`} fill={item.color} />
                      ))}
                    </Pie>
                    {/* Tooltip menampilkan jumlah asli */}
                    <Tooltip 
                      formatter={(value, name, props) => [`${value} Porsi (${props.payload.percent}%)`, 'Terjual']}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
             ) : (
               <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm italic border-2 border-dashed border-gray-100 rounded-full bg-gray-50">
                  Data Kosong
               </div>
             )}
          </div>

          {/* 2. Legenda Custom (List di Samping dengan Persentase) */}
          <div className="flex flex-col gap-3 w-full sm:w-auto">
            {pieData.length > 0 ? pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between gap-4 text-sm w-full">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: item.color }} ></span>
                    <span className="text-gray-600 font-medium truncate max-w-[140px]" title={item.name}>
                        {item.name}
                    </span>
                </div>
                {/* TAMPILKAN PERSENTASE DI SINI */}
                <span className="font-bold text-gray-800 bg-gray-50 px-2 py-0.5 rounded text-xs ml-auto">
                    {item.percent}%
                </span>
              </div>
            )) : (
                <p className="text-sm text-gray-400 text-center">Belum ada penjualan hari ini.</p>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default DashboardCharts;