import React from 'react';
import { Card } from '../ui';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon, 
  color = 'blue',
  subtitle 
}) => {
  const colorVariants = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };
  
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-12 h-12 bg-gradient-to-br ${colorVariants[color]} rounded-lg flex items-center justify-center`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <span className="text-sm text-gray-500">{title}</span>
      </div>
      
      <div className="mb-2">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      
      {change && (
        <div className="flex items-center text-sm">
          {changeType === 'positive' ? (
            <HiArrowUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <HiArrowDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`font-medium ${changeColors[changeType]}`}>{change}</span>
          <span className="text-gray-500 ml-1">vs last month</span>
        </div>
      )}
    </Card>
  );
};

export default StatsCard;