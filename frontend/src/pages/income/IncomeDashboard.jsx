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
import { Button, Modal } from "../../components/ui";
import ModalForm from "../../components/modalform/ModalForm";
import { validateForm } from "../../utils/helper";
import AddIncome from "./AddIncome";

function IncomeDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <DashboardLayout activeMenu="income">
      <div className="p-10 bg-gray-50 h-screen overflow-y-auto ">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your Incomes today.
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Button variant="success" size="sm" onClick={handleModalToggle}>
                <HiPlus className="mr-2" />
                Add Income
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AddIncome isOpen={isModalOpen} onClose={handleModalToggle} />
    </DashboardLayout>
  );
}

export default IncomeDashboard;
