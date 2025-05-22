import React, { useState } from "react";
import {
  HiTrendingUp,
  HiPlus,
  HiEye,
  HiCalendar,
  HiCurrencyDollar,
  HiChartBar,
  HiArrowUp,
  HiArrowDown,
} from "react-icons/hi";
import {
  MdCategory,
  MdAccountBalance,
  MdDateRange,
  MdFilterList,
} from "react-icons/md";
import { FaChartLine, FaWallet } from "react-icons/fa";
import DashboardLayout from "../../components/layouts/DashboardLayout";

function IncomeDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data - replace with actual data from your API
  const incomeStats = {
    totalIncome: 15420.5,
    thisMonth: 3840.25,
    lastMonth: 3650.75,
    percentageChange: 5.2,
    transactionCount: 12,
  };

  const recentTransactions = [
    {
      id: 1,
      source: "Salary",
      amount: 2500.0,
      date: "2024-01-15",
      category: "Employment",
      account: "Checking",
    },
    {
      id: 2,
      source: "Freelance Project",
      amount: 850.0,
      date: "2024-01-12",
      category: "Freelance",
      account: "Savings",
    },
    {
      id: 3,
      source: "Investment Dividend",
      amount: 125.5,
      date: "2024-01-10",
      category: "Investment",
      account: "Investment",
    },
    {
      id: 4,
      source: "Rental Income",
      amount: 1200.0,
      date: "2024-01-08",
      category: "Property",
      account: "Checking",
    },
    {
      id: 5,
      source: "Side Business",
      amount: 340.75,
      date: "2024-01-05",
      category: "Business",
      account: "Business",
    },
  ];

  const categoryBreakdown = [
    {
      category: "Employment",
      amount: 2500.0,
      percentage: 65,
      color: "bg-blue-500",
    },
    {
      category: "Freelance",
      amount: 850.0,
      percentage: 22,
      color: "bg-green-500",
    },
    {
      category: "Investment",
      amount: 285.5,
      percentage: 7,
      color: "bg-purple-500",
    },
    {
      category: "Property",
      amount: 204.75,
      percentage: 6,
      color: "bg-orange-500",
    },
  ];

  return (
    <DashboardLayout activeMenu="income">
 
    </DashboardLayout>
  );
}

export default IncomeDashboard;
