import { HiCreditCard, HiEye } from "react-icons/hi";

const RecentTransactions = ({ incomes, onViewAll }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Recent Income</h3>
      <button 
        onClick={onViewAll}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        <HiEye className="h-4 w-4" />
        View All
      </button>
    </div>
    <div className="space-y-3">
      {incomes?.map((income) => (
        <div key={income.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <HiCreditCard className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{income.source}</p>
              <p className="text-sm text-gray-500">{income.category} • {income.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-green-600">+${income.amount.toLocaleString()}</p>
            <span className={`text-xs px-2 py-1 rounded-full ${
              income.status === 'received' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {income.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentTransactions;