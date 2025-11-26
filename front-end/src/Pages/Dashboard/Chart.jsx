import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";

const lineData = [
  { name: "Senin", keuntungan: 1000000 },
  { name: "Selasa", keuntungan: 1500000 },
  { name: "Rabu", keuntungan: 2000000 },
  { name: "Kamis", keuntungan: 3000000 },
  { name: "Jumat", keuntungan: 2500000 }
];

const pieData = [
  { name: "Ayam Bakar", value: 28, color: "#FF6BA5" },
  { name: "Ayam Goreng", value: 24, color: "#FF9EC2" },
  { name: "Ayam Kecap", value: 21, color: "#FFC7D8" },
  { name: "Telur Balado", value: 18, color: "#FFB6C1" },
  { name: "Telur Goreng", value: 9, color: "#FFE5EC" }
];

const DashboardCharts = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="bg-white rounded-xl p-4 shadow-md flex-1 min-w-[300px]">

        <div className="flex justify-between items-center mb-3">
          <div className="text-pink-500 font-semibold">
            Total Pendapatan Mingguan
          </div>

          <div className="flex items-center gap-4 relative">
            <input id="date" type="date" className="w-full bg-pink-50 border border-pink-300 rounded px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400" />
          </div>
        </div>

        <LineChart width={400} height={260} data={lineData} margin={{ left: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis ticks={[ 1000000, 1500000, 2000000, 2500000, 3000000, 3500000]}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="keuntungan" stroke="#2A64D9" activeDot={{ r: 8 }}/>
        </LineChart>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md flex-1 min-w-[300px]">
        <div className="flex justify-between items-center mb-3">
          <div className="text-pink-500 font-semibold">
            Menu Terlaris
          </div>

          <div className="flex items-center gap-4 relative">
            <input id="date" type="date" className="w-full bg-pink-50 border border-pink-300 rounded px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400" />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <PieChart width={230} height={230} margin={{ right: 10 }}>
            <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3} >
              {pieData.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>
          </PieChart>

          <div className="flex flex-col gap-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} ></span>
                <span className="text-gray-600">{item.name}</span>
                <span className="font-semibold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardCharts;
