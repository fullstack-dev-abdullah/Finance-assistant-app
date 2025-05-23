import React, { useState } from "react";
import { Modal } from "../../components/ui";
import ModalForm from "../../components/modalform/ModalForm";
import { validateForm } from "../../utils/helper";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosinstance";
import { API_ENDPOINTS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const AddIncome = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [incomeFormData, setIncomeFormData] = useState({
    source: "",
    amount: "",
    date: "",
    category: "employment",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // Handle form changes
  const handleIncomeChange = (e) => {
    const { name, value } = e.target;
    setIncomeFormData((prev) => ({ ...prev, [name]: value }));
    console.log(incomeFormData, "incomeFormData");

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleIncomeSubmit = async () => {
    if (Object.keys(validateForm(incomeFormData)).length > 0) {
      setErrors(validateForm(incomeFormData));
      return;
    }

    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.INCOME.ADD_INCOME,
        {
          ...incomeFormData,
        }
      );

      console.log(response, "response");
      if (response.status === 201) {
        // Handle success
        toast.success("Income added successfully!");
      } else {
        // Handle error
        toast.error("Failed to add income.");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        // Handle unauthorized access
        toast.error(error.response.data.message);
      } else {
        // Handle timeout error
        toast.error("Something went wrong, please try again.");
      }
    }
    // Reset form and close modal
    setIncomeFormData({
      source: "",
      amount: "",
      date: "",
      category: "employment",
      description: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <div>
      <DashboardLayout activeMenu="income">
        <div className="">
          <Modal isOpen={isOpen} title="Add Income" onClose={onClose}>
            <ModalForm
              type="income"
              formData={incomeFormData}
              handleChange={handleIncomeChange}
              errors={errors}
              onSubmit={handleIncomeSubmit}
              onCancel={onClose}
            />
          </Modal>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default AddIncome;
