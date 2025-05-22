
import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputField = ({
  label,
  icon,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  delay = '0',
  animate,
  showPasswordToggle,
  showPassword,
  setShowPassword,
}) => (
  <div
    className={`transition-all duration-500 delay-[${delay}ms] ${
      animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'
    }`}
  >
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="pl-12 pr-10 w-full py-2.5 sm:py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
        placeholder={placeholder}
      />
      {showPasswordToggle && (
        <div
          className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <FaEyeSlash className="text-gray-500 hover:text-indigo-600" />
          ) : (
            <FaEye className="text-gray-500 hover:text-indigo-600" />
          )}
        </div>
      )}
    </div>
  </div>
);

export default InputField;