import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FaRegUser } from "react-icons/fa";
import { Button } from "../ui";
import { useUserAuth } from "../../hooks/useUserAuth";

function DashboardLayout({ children, activeMenu }) {
  const { user } = useContext(UserContext);
  console.log(user, "user in dashboard layout");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useUserAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="overflow-y-auto bg-gray-50">
      <Navbar
        activeMenu={activeMenu}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      {user && (
        <div className="flex">
          {/* Sidebar */}
          <div
            className={`
            transition-all duration-300 ease-in-out
            ${isSidebarOpen ? "w-64" : "w-0"}
            ${isSidebarOpen ? "opacity-100" : "opacity-0"}
            max-[1080px]:fixed max-[1080px]:inset-y-0 max-[1080px]:left-0 max-[1080px]:z-40
            ${
              isSidebarOpen
                ? "max-[1080px]:translate-x-0"
                : "max-[1080px]:-translate-x-full"
            }
            max-[1080px]:w-64 max-[1080px]:opacity-100
          `}
          >
            <Sidebar />
          </div>

          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 max-[1080px]:block hidden"
              onClick={toggleSidebar}
            />
          )}

          {/* Main Content */}
          <div
            className={`
            flex-1 transition-all duration-300 ease-in-out
            ${isSidebarOpen ? "ml-0" : "ml-0"}
            max-[1080px]:ml-0
          `}
          >
            <div className="">{children}</div>
          </div>
        </div>
      )}
      {!user && (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaRegUser className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to ExpenseTracker
            </h1>
            <p className="text-gray-600 mb-6">
              Please log in to access your dashboard
            </p>

            <Button size="lg">Sign In</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
