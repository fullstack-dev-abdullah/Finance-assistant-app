import React, { useState } from "react";
import {
  HiTrendingUp,
  HiCalendar,
  HiCurrencyDollar,
  HiChartBar,
} from "react-icons/hi";
import { GoGoal } from "react-icons/go";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { getCurrentMonth } from "../../utils/helper";
import AddIncome from "./AddIncome";
import Header from "../../components/dashboard/Header";
import StatsCard from "../../components/dashboard/StatsCard";
import Chart from "../../components/dashboard/Chart";
import QuickActions from "../../components/income-expense/QuickActions";
import RecentTransactions from "../../components/income-expense/RecentTransactions";
import SourceStreams from "../../components/income-expense/sourceStreams";
// Mock data for demonstration
const mockIncomeData = {
  stats: {
    totalIncome: 125000,
    monthlyTarget: 15000,
    targetProgress: 87.5,
    averageMonthly: 12500,
    growthRate: 12.3,
    incomeStreams: 5,
  },
  chartData: {
    monthly: [
      { month: "Jan", income: 11000, target: 15000 },
      { month: "Feb", income: 12500, target: 15000 },
      { month: "Mar", income: 14200, target: 15000 },
      { month: "Apr", income: 13800, target: 15000 },
      { month: "May", income: 15100, target: 15000 },
      { month: "Jun", income: 13500, target: 15000 },
    ],
  },
  recentIncomes: [
    {
      id: 1,
      source: "Primary Salary",
      amount: 5000,
      date: "2024-05-30",
      category: "Salary",
      status: "received",
    },
    {
      id: 2,
      source: "Freelance Project",
      amount: 2500,
      date: "2024-05-28",
      category: "Freelance",
      status: "pending",
    },
    {
      id: 3,
      source: "Investment Returns",
      amount: 800,
      date: "2024-05-25",
      category: "Investment",
      status: "received",
    },
    {
      id: 4,
      source: "Side Business",
      amount: 1200,
      date: "2024-05-23",
      category: "Business",
      status: "received",
    },
  ],
  incomeStreams: [
    { category: "Salary", amount: 65000, percentage: 52, color: "bg-blue-500" },
    {
      category: "Freelance",
      amount: 28000,
      percentage: 22.4,
      color: "bg-green-500",
    },
    {
      category: "Investment",
      amount: 18000,
      percentage: 14.4,
      color: "bg-purple-500",
    },
    {
      category: "Business",
      amount: 14000,
      percentage: 11.2,
      color: "bg-orange-500",
    },
  ],
};

function IncomeDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incomeData] = useState(mockIncomeData);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <DashboardLayout activeMenu="income">
      <div className="p-10 bg-gray-50 h-screen overflow-y-auto ">
        {/* Header Section */}
        <div className="mb-8">
          <Header
            header={"Income Dashboard 💰"}
            description={`Track and manage your income streams effectively.`}
            isAddButton={true}
            handleButtonClick={handleModalToggle}
            ButtonText={"Add Income"}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Income"
            value={`${incomeData.stats.totalIncome.toLocaleString()}`}
            change={`+${incomeData.stats.growthRate}%`}
            changeType="positive"
            icon={HiCurrencyDollar}
            color="blue"
            subtitle="This year"
          />

          <StatsCard
            title="Monthly Target"
            value={`${incomeData.stats.monthlyTarget.toLocaleString()}`}
            icon={GoGoal}
            color="green"
            subtitle="Current goal"
            progress={incomeData.stats.targetProgress}
          />

          <StatsCard
            title="Monthly Average"
            value={`${incomeData.stats.averageMonthly.toLocaleString()}`}
            change="+5.2%"
            changeType="positive"
            icon={HiTrendingUp}
            color="purple"
            subtitle="Last 6 months"
          />

          <StatsCard
            title="Income Streams"
            value={incomeData.stats.incomeStreams}
            icon={HiChartBar}
            color="orange"
            subtitle="Active sources"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Income Trend Chart */}
          <div className="xl:col-span-2">
            <Chart
              data={incomeData.chartData.monthly}
              title="Income vs Target Trend"
              height={350}
              type="bar"
              xDataKey="month"
              yDataKey="income"
            />
          </div>

          {/* Quick Actions */}
          <QuickActions
            onAddIncome={() => handleQuickAction("add-income")}
            onSetTarget={() => handleQuickAction("set-target")}
            onViewReports={() => handleQuickAction("view-reports")}
            onManageStreams={() => handleQuickAction("manage-streams")}
            onViewAnalytics={() => handleQuickAction("view-analytics")}
          />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Recent Income */}
          <div className="xl:col-span-2">
            <RecentTransactions
              incomes={incomeData.recentIncomes}
              onViewAll={() => handleQuickAction("view-all-income")}
            />
          </div>

          {/* Income Streams Breakdown */}
          <div>
            <SourceStreams
              data={incomeData.incomeStreams}
              title="Income Streams"
              type="income"
              chartData={incomeData.chartData.monthly}
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Monthly Performance
              </h2>
              <div className="flex items-center text-sm text-gray-500 mt-2 sm:mt-0">
                <HiCalendar className="h-4 w-4 mr-1" />
                {getCurrentMonth()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ${incomeData.stats.monthlyTarget.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Monthly Target</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  $
                  {Math.round(
                    (incomeData.stats.monthlyTarget *
                      incomeData.stats.targetProgress) /
                      100
                  ).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Current Progress</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {incomeData.stats.targetProgress.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Target Completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddIncome isOpen={isModalOpen} onClose={handleModalToggle} />
    </DashboardLayout>
  );
}

export default IncomeDashboard;
