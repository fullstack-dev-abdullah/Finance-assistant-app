import Chart from "../dashboard/Chart";

const SourceStreams = ({ data, title, type, chartData }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {data?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-gray-700">{item.category}</span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                ${item.amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">{item.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Income Streams Pie Chart */}
    <Chart
      type="pie"
      data={chartData}
      title="Income Distribution"
      xDataKey="month"
      yDataKey="income"
      height={250}
    />
  </div>
);

export default SourceStreams;
