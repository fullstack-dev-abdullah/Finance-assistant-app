import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { HiMenu, HiX, HiBell, HiUser, HiCog, HiLogout } from "react-icons/hi";
import { FiUser } from "react-icons/fi";

import { IoWallet } from "react-icons/io5";

function Navbar({ activeMenu, isSidebarOpen, toggleSidebar }) {
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="cursor-pointer p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 "
            >
              {isSidebarOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>

            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <IoWallet className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">
                  ExpenseTracker
                </h1>
                <p className="text-xs text-gray-500">Manage your finances</p>
              </div>
            </div>
          </div>

          {/* Center - Active Menu Title */}
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">
              {activeMenu || "Dashboard"}
            </h2>
          </div>

          {/* Right side - User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none cursor-pointer">
                  <HiBell className="h-6 w-6" />
                  <span className="absolute top-1 right-1 block h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-3 p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 cursor-pointer ">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full">
                      <FiUser className="h-5 w-5 text-white" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.email || "user@example.com"}
                      </p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                        <HiUser className="h-4 w-4 mr-3" />
                        Profile
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                        <HiCog className="h-4 w-4 mr-3" />
                        Settings
                      </button>
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <HiLogout className="h-4 w-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200">
                  Sign In
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
