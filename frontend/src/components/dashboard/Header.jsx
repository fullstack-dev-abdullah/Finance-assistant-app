import React from "react";
import { Button, Select } from "../ui";
import { HiFilter, HiPlus } from "react-icons/hi";

function Header({ header, description, timeframe, setTimeframe, isAddButton,handleButtonClick,ButtonText }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{header}</h1>
        <p className="text-gray-600">{description}</p>
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

        <Button variant="outline" size="sm">
          <HiFilter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        {isAddButton && (
          <Button variant="success" size="sm" onClick={handleButtonClick}>
            <HiPlus className="mr-2" />
            {ButtonText || "Add"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
