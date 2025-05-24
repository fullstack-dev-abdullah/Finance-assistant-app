import React, { useState } from "react";
import { Modal } from "../../components/ui";
import ModalForm from "../../components/modalform/ModalForm";
import { validateForm } from "../../utils/helper";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosinstance";
import { API_ENDPOINTS } from "../../utils/apiPaths";

const AddExpense = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [expenseFormData, setexpenseFormData] = useState({
    source: "",
    amount: "",
    date: "",
    category: "food",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // Handle form changes
  const handleIncomeChange = (e) => {
    const { name, value } = e.target;
    setexpenseFormData((prev) => ({ ...prev, [name]: value }));
    console.log(expenseFormData, "expenseFormData");

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleIncomeSubmit = async () => {
    if (Object.keys(validateForm(expenseFormData)).length > 0) {
      setErrors(validateForm(expenseFormData));
      return;
    }

    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.EXPENSE.ADD_EXPENSE,
        {
          ...expenseFormData,
        }
      );

      console.log(response, "response");
      if (response.status === 201) {
        // Handle success
        toast.success("Expense added successfully!");
      } else {
        // Handle error
        toast.error("Failed to add Expense.");
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
    setexpenseFormData({
      source: "",
      amount: "",
      date: "",
      category: "food",
      description: "",
    });
    setErrors({});
    onClose();
  };
  return (
    <div className="">
      <Modal isOpen={isOpen} title="Add Expense" onClose={onClose}>
        <ModalForm
          type="expense"
          formData={expenseFormData}
          handleChange={handleIncomeChange}
          errors={errors}
          onSubmit={handleIncomeSubmit}
          onCancel={onClose}
        />
      </Modal>
    </div>
  );
};

export default AddExpense;
