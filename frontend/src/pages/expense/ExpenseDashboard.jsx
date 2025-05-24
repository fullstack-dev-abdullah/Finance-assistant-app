import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Button } from "../../components/ui";
import { HiPlus } from "react-icons/hi";
import AddExpense from "./AddExpense";

const ExpenseDashboard = () => {
     const [isModalOpen, setIsModalOpen] = useState(false);
    
      const handleModalToggle = () => {
        setIsModalOpen((prev) => !prev);
      };
  return (
    <DashboardLayout activeMenu="expense">
      <div className="p-10 bg-gray-50 h-screen overflow-y-auto ">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Expense Overview
              </h1>
              <p className="text-gray-600">
                Track and manage your expense sources
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Button variant="success" size="sm" onClick={handleModalToggle}>
                <HiPlus className="mr-2" />
                Add Expense
              </Button>
            </div>
          </div>
        </div>
      </div>
     <AddExpense isOpen={isModalOpen} onClose={handleModalToggle} />

    </DashboardLayout>
  );
};

export default ExpenseDashboard;
