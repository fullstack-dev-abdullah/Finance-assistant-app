import React from 'react';
import { Card } from '../ui';

const CategoryBreakdown = ({ data = [], title = "Category Breakdown", type = "income" }) => {
  const getColorForIndex = (index) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    return colors[index % colors.length];
  };
  
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${getColorForIndex(index)}`}></div>
              <span className="text-sm font-medium text-gray-700">{item.category}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                ${item.amount.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">
                {total > 0 ? Math.round((item.amount / total) * 100) : 0}%
              </div>
            </div>
          </div>
        ))}
        
        {data.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
      </div>
    </Card>
  );
};
export default CategoryBreakdown;
