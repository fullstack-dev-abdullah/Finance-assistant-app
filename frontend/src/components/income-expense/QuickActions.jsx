import { HiChartBar, HiChartPie, HiCog, HiPlus } from "react-icons/hi";

const QuickActions = ({ onAddIncome, onSetTarget, onViewReports, onManageStreams, onViewAnalytics }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
    <div className="space-y-3">
      <button 
        onClick={onAddIncome}
        className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
      >
        <HiPlus className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
        <span className="text-blue-700 font-medium">Add New Income</span>
      </button>
      
      <button 
        onClick={onSetTarget}
        className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
      >
        <HiChartBar className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform" />
        <span className="text-green-700 font-medium">Set Income Target</span>
      </button>
      
      <button 
        onClick={onViewReports}
        className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
      >
        <HiChartBar className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform" />
        <span className="text-purple-700 font-medium">View Reports</span>
      </button>
      
      <button 
        onClick={onManageStreams}
        className="w-full flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group"
      >
        <HiCog className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform" />
        <span className="text-orange-700 font-medium">Manage Streams</span>
      </button>
      
      <button 
        onClick={onViewAnalytics}
        className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
      >
        <HiChartPie className="h-5 w-5 text-gray-600 group-hover:scale-110 transition-transform" />
        <span className="text-gray-700 font-medium">View Analytics</span>
      </button>
    </div>
  </div>
);

export default QuickActions;