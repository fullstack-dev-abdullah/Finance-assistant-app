import React from 'react';
import { Card, Badge } from '../ui';
import { HiTrendingUp, HiTrendingDown, HiEye } from 'react-icons/hi';
import { MdCategory, MdAccountBalance } from 'react-icons/md';
import moment from 'moment';

const RecentTransactions = ({ transactions = [], onViewAll }) => {
  const getTransactionIcon = (type) => {
    return type === 'income' ? HiTrendingUp : HiTrendingDown;
  };
  
  const getAmountColor = (type) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  };
  
  const getAmountPrefix = (type) => {
    return type === 'income' ? '+' : '-';
  };
  
  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
        <button 
          onClick={onViewAll}
          className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          <HiEye className="h-4 w-4 mr-1" />
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {transactions.map((transaction) => {
          const Icon = getTransactionIcon(transaction.type);
          
          return (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${
                  transaction.type === 'income' 
                    ? 'from-green-500 to-green-600' 
                    : 'from-red-500 to-red-600'
                } rounded-lg flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">{transaction.source || transaction.description}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <MdCategory className="h-4 w-4 mr-1" />
                      {transaction.category}
                    </span>
                    <span className="flex items-center">
                      <MdAccountBalance className="h-4 w-4 mr-1" />
                      {transaction.account}
                    </span>
                    <span>{moment(transaction.date).format('MMM DD')}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`text-lg font-bold ${getAmountColor(transaction.type)}`}>
                  {getAmountPrefix(transaction.type)}${transaction.amount.toLocaleString()}
                </span>
                {transaction.recurring && (
                  <Badge variant="info" size="sm" className="ml-2">
                    Recurring
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
        
        {transactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No recent transactions</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecentTransactions;