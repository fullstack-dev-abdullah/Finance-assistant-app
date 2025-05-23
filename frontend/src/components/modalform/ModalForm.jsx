import React from "react";
import Input from "../ui/Input";
import { Button } from "../ui";

function ModalForm({
  type = "income", // 'income' or 'expense'
  formData,
  handleChange,
  errors = {},
  onSubmit,
  onCancel,
}) {
  // Configuration based on form type
  const config = {
    income: {
      title: "Add New Income",
      sourceLabel: "Income Source",
      sourcePlaceholder: "e.g., Salary, Freelance, Business",
      amountLabel: "Income Amount",
      categories: [
        { value: "employment", label: "Employment" },
        { value: "business", label: "Business" },
        { value: "investment", label: "Investment" },
        { value: "rental", label: "Rental" },
        { value: "freelance", label: "Freelance" },
        { value: "other", label: "Other" },
      ],
      submitText: "Add Income",
      amountColor: "text-green-600",
    },
    expense: {
      title: "Add New Expense",
      sourceLabel: "Expense Description",
      sourcePlaceholder: "e.g., Groceries, Rent, Utilities",
      amountLabel: "Expense Amount",
      categories: [
        { value: "food", label: "Food & Dining" },
        { value: "transportation", label: "Transportation" },
        { value: "housing", label: "Housing" },
        { value: "utilities", label: "Utilities" },
        { value: "healthcare", label: "Healthcare" },
        { value: "entertainment", label: "Entertainment" },
        { value: "shopping", label: "Shopping" },
        { value: "education", label: "Education" },
        { value: "other", label: "Other" },
      ],
      submitText: "Add Expense",
      amountColor: "text-red-600",
    },
  };

  const currentConfig = config[type];

  return (
    <div className="space-y-4">
      {/* Source/Description Field */}
      <Input
        label={currentConfig.sourceLabel}
        name="source"
        value={formData.source || ""}
        onChange={handleChange}
        placeholder={currentConfig.sourcePlaceholder}
        error={errors.source}
      />

      {/* Amount Field */}
      <Input
        label={currentConfig.amountLabel}
        name="amount"
        type="number"
        step="0.01"
        value={formData.amount || ""}
        onChange={handleChange}
        placeholder="0.00"
        error={errors.amount}
      />

      {/* Date Field */}
      <Input
        label="Date"
        name="date"
        type="date"
        value={formData.date || ""}
        onChange={handleChange}
        error={errors.date}
      />

      {/* Category Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={formData.category || currentConfig.categories[0].value}
          onChange={handleChange}
          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white ${
            errors.category ? "border-red-300" : "border-gray-300"
          }`}
        >
          {currentConfig.categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-sm text-red-600">{errors.category}</p>
        )}
      </div>

      {/* Description Field */}
      <Input
        label="Additional Notes (Optional)"
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        placeholder="Additional details..."
        error={errors.description}
      />

      {/* Form Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className={`flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl`}
        >
          {currentConfig.submitText}
        </Button>
      </div>
    </div>
  );
}

export default ModalForm;
