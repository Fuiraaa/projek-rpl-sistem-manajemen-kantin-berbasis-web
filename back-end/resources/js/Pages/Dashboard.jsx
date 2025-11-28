import React from "react";
import StatsGrid from "./StatsGrid";
import Chart from "./Chart";
import BagianBawah from "./BagianBawah";
import Layout from "../components/Layout";

const Dashboard = () => {
  return (
    <Layout>
    <div className="space-y-6">
      <StatsGrid />
      <Chart />
      <BagianBawah />
    </div>
    </Layout>
  );
};

export default Dashboard;
