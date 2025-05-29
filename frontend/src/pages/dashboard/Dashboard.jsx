import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import {
  HiCurrencyDollar,
  HiTrendingUp,
  HiTrendingDown,
  HiChartBar,
  HiCalendar,
  HiFilter,
} from "react-icons/hi";
import { MdAccountBalance, MdCategory } from "react-icons/md";

import StatsCard from "../../components/dashboard/StatsCard";
import QuickActions from "../../components/dashboard/QuickActions";
import CategoryBreakdown from "../../components/dashboard/CategoryBreakdown";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import Chart from "../../components/dashboard/Chart";

import { Button, Card, Select } from "../../components/ui";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import axiosInstance from "../../utils/axiosinstance";
import { API_ENDPOINTS } from "../../utils/apiPaths";
function Dashboard() {
  useUserAuth();
  // This hook checks if the user is authenticated and redirects to login if not

  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("month");
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          API_ENDPOINTS.DASHBOARD.GET_DASHBOARD_DATA
        );
        if (response.status === 200) {
          setDashboardData(response.data.data);
        } else {
          toast.error("Failed to load dashboard data");
          console.error("Dashboard data fetch error:", response.statusText);
        }
      } catch (error) {
        toast.error("Failed to load dashboard data");
        console.error("Dashboard data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeframe]);

  const handleQuickAction = (action) => {
    switch (action) {
      case "add-income":
        navigate("/income/add");
        break;
      case "add-expense":
        navigate("/expenses/add");
        break;
      case "view-reports":
        navigate("/reports");
        break;
      case "manage-categories":
        navigate("/categories");
        break;
      case "manage-accounts":
        navigate("/accounts");
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout activeMenu="dashboard">
      <div className="p-10 bg-gray-50 h-screen overflow-y-auto ">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your finances today.
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Select
                options={[
                  { value: "week", label: "This Week" },
                  { value: "month", label: "This Month" },
                  { value: "quarter", label: "This Quarter" },
                  { value: "year", label: "This Year" },
                ]}
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="min-w-32"
              />

              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success("Filter applied!")}
              >
                <HiFilter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Balance"
              value={`$${dashboardData?.stats.totalBalance.toLocaleString()}`}
              change={`+${dashboardData?.stats.monthlyChange}%`}
              changeType="positive"
              icon={HiCurrencyDollar}
              color="blue"
              subtitle="Available funds"
            />

            <StatsCard
              title="Total Income"
              value={`$${dashboardData?.stats.totalIncome.toLocaleString()}`}
              change="+8.2%"
              changeType="positive"
              icon={HiTrendingUp}
              color="green"
              subtitle="This month"
            />

            <StatsCard
              title="Total Expenses"
              value={`$${dashboardData?.stats.totalExpenses.toLocaleString()}`}
              change="-3.1%"
              changeType="positive"
              icon={HiTrendingDown}
              color="red"
              subtitle="This month"
            />

            <StatsCard
              title="Transactions"
              value={dashboardData?.stats.transactionCount}
              icon={HiChartBar}
              color="purple"
              subtitle="This month"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Financial Overview Chart */}
          <div className="lg:col-span-2">
            <Chart
              type="line"
              data={dashboardData?.chartData.monthly}
              title="Income vs Expenses Trend"
              xDataKey="name"
              yDataKey="income"
              height={350}
            />
          </div>

          {/* Quick Actions */}
          <QuickActions
            onAddIncome={() => handleQuickAction("add-income")}
            onAddExpense={() => handleQuickAction("add-expense")}
            onViewReports={() => handleQuickAction("view-reports")}
            onManageCategories={() => handleQuickAction("manage-categories")}
            onManageAccounts={() => handleQuickAction("manage-accounts")}
          />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onViewAll={() => navigate("/transactions")}
            />
          </div>

          {/* Category Breakdown */}
          <div className="space-y-6">
            <CategoryBreakdown
              data={dashboardData?.categoryBreakdown.income}
              title="Top Income Categories"
              type="income"
            />

            <CategoryBreakdown
              data={dashboardData?.categoryBreakdown.expenses}
              title="Top Expense Categories"
              type="expense"
            />
          </div>
        </div>

        {/* Monthly Summary Card */}
        <div className="mt-8 mb-20">
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Monthly Summary
              </h2>
              <div className="flex items-center text-sm text-gray-500 mt-2 sm:mt-0">
                <HiCalendar className="h-4 w-4 mr-1" />
                {moment().format("MMMM YYYY")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  +${(dashboardData?.stats.totalIncome || 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Income</div>
              </div>

              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-2">
                  -${(dashboardData?.stats.totalExpenses || 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Expenses</div>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  $
                  {(
                    (dashboardData?.stats.totalIncome || 0) -
                    (dashboardData?.stats.totalExpenses || 0)
                  ).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Net Income</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
