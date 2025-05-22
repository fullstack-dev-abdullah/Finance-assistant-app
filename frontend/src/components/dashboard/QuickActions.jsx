import React from 'react';
import { Card, Button } from '../ui';
import { 
  HiPlus, 
  HiTrendingUp, 
  HiTrendingDown, 
  HiChartBar,
  HiDocumentReport 
} from 'react-icons/hi';
import { MdCategory, MdAccountBalance } from 'react-icons/md';

const QuickActions = ({ onAddIncome, onAddExpense, onViewReports, onManageCategories, onManageAccounts }) => {
  const actions = [
    {
      label: 'Add Income',
      icon: HiTrendingUp,
      onClick: onAddIncome,
      variant: 'success',
      description: 'Record new income'
    },
    {
      label: 'Add Expense',
      icon: HiTrendingDown,
      onClick: onAddExpense,
      variant: 'danger',
      description: 'Record new expense'
    },
    {
      label: 'View Reports',
      icon: HiDocumentReport,
      onClick: onViewReports,
      variant: 'primary',
      description: 'Financial insights'
    },
    {
      label: 'Categories',
      icon: MdCategory,
      onClick: onManageCategories,
      variant: 'outline',
      description: 'Manage categories'
    },
    {
      label: 'Accounts',
      icon: MdAccountBalance,
      onClick: onManageAccounts,
      variant: 'outline',
      description: 'Manage accounts'
    },
    {
      label: 'Analytics',
      icon: HiChartBar,
      onClick: () => {},
      variant: 'secondary',
      description: 'View analytics'
    }
  ];
  
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        <p className="text-gray-600 text-sm">Frequently used actions</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <button
              key={index}
              onClick={action.onClick}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow">
                <Icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </div>
              <span className="text-sm font-medium text-gray-900 mb-1">{action.label}</span>
              <span className="text-xs text-gray-500 text-center">{action.description}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickActions;
