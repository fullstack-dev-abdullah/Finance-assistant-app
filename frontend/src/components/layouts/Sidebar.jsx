import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  HiHome, 
  HiTrendingUp, 
  HiTrendingDown, 
  HiDocumentReport,
  HiCog,
  HiQuestionMarkCircle,
  HiChevronDown,
  HiChevronRight
} from "react-icons/hi";
import { 
  MdAccountBalance, 
  MdCategory, 
  MdReceipt,
  MdSavings,
  MdAnalytics
} from "react-icons/md";
import { FaFileImport, FaFileExport } from "react-icons/fa";
import { sidebarData } from "../../utils/data";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const getIcon = (iconName, size = "h-5 w-5") => {
    const icons = {
      HiHome: <HiHome className={size} />,
      HiTrendingUp: <HiTrendingUp className={size} />,
      HiTrendingDown: <HiTrendingDown className={size} />,
      HiDocumentReport: <HiDocumentReport className={size} />,
      MdAccountBalance: <MdAccountBalance className={size} />,
      MdCategory: <MdCategory className={size} />,
      MdReceipt: <MdReceipt className={size} />,
      MdSavings: <MdSavings className={size} />,
      MdAnalytics: <MdAnalytics className={size} />,
      FaFileImport: <FaFileImport className={size} />,
      FaFileExport: <FaFileExport className={size} />,
      HiCog: <HiCog className={size} />,
      HiQuestionMarkCircle: <HiQuestionMarkCircle className={size} />
    };
    return icons[iconName] || <HiHome className={size} />;
  };

  return (
    <div className="h-screen bg-white border-r border-gray-200 shadow-lg overflow-y-auto">
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <MdAccountBalance className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Financial Hub</h3>
            <p className="text-xs text-gray-500 mt-1">Track & Manage</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarData.sections.map((section) => (
            <div key={section.id} className="mb-6">
              {/* Section Header */}
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">
                  {section.title}
                </h4>
              </div>

              {/* Section Items */}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <div key={item.id}>
                    {/* Main Item */}
                    <div
                      className={`
                        flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200
                        ${isActiveRoute(item.path) 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-3 border-blue-500' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                      onClick={() => {
                        if (item.subItems && item.subItems.length > 0) {
                          handleNavigation(item.path);
                          toggleSection(item.id);
                        } else {
                          handleNavigation(item.path);
                        }
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`
                          ${isActiveRoute(item.path) ? 'text-blue-600' : 'text-gray-500'}
                        `}>
                          {getIcon(item.icon)}
                        </div>
                        <span className="font-medium text-sm">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      
                      {item.subItems && item.subItems.length > 0 && (
                        <div className="ml-2">
                          {expandedSections[item.id] ? (
                            <HiChevronDown className="h-4 w-4 text-gray-400" />
                          ) : (
                            <HiChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Sub Items */}
                    {item.subItems && expandedSections[item.id] && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <div
                            key={subItem.id}
                            className={`
                              flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
                              ${isActiveRoute(subItem.path)
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }
                            `}
                            onClick={() => handleNavigation(subItem.path)}
                          >
                            <div className={`mr-3 ${isActiveRoute(subItem.path) ? 'text-blue-600' : 'text-gray-400'}`}>
                              {getIcon(subItem.icon, "h-4 w-4")}
                            </div>
                            <span className="text-sm">{subItem.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Overview</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">This Month</span>
                <span className="text-sm font-semibold text-green-600">+$2,340</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Expenses</span>
                <span className="text-sm font-semibold text-red-600">-$1,680</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-700">Net</span>
                <span className="text-sm font-bold text-blue-600">$660</span>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="p-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <HiQuestionMarkCircle className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Need Help?</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Get support or learn how to use features
            </p>
            <button className="w-full text-xs bg-white text-gray-700 border border-gray-200 rounded-md py-2 hover:bg-gray-50 transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;