import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint, TableRow } from '@/data/dashboard';

type MembershipMetricsWidgetProps = {
  chartData: ChartDataPoint[];
  membershipTableRows: TableRow[];
  membershipMonthLabels: string[];
  productTableRows: TableRow[];
  productMonthLabels: string[];
  loading?: boolean;
};

const MembershipMetricsWidget = ({ 
  chartData, 
  membershipTableRows,
  membershipMonthLabels,
  productTableRows,
  productMonthLabels,
  loading = false 
}: MembershipMetricsWidgetProps) => {
  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip for the stacked chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border border-primary-200 bg-cream-100 p-3 shadow-lg">
          <p className="text-sm font-medium text-primary-800 mb-2">{data.month}</p>
          <p className="text-sm text-primary-600">
            Memberships: <span className="font-semibold">{formatCurrency(data.membershipRevenue || 0)}</span>
          </p>
          <p className="text-sm text-primary-600">
            Others: <span className="font-semibold">{formatCurrency(data.otherRevenue || 0)}</span>
          </p>
          <p className="text-sm font-semibold text-primary-800 mt-1 pt-1 border-t border-primary-200">
            Total: {formatCurrency((data.membershipRevenue || 0) + (data.otherRevenue || 0))}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-primary-300 bg-cream-100 p-6 shadow-sm">
        <div className="flex items-center justify-center py-12">
          <p className="text-neutral-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-primary-300 bg-cream-100 p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-primary-800">Membership Metrics</h2>
      
      {/* Stacked Bar Chart */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-medium text-primary-700">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#374151', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fill: '#374151', fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="membershipRevenue" 
              stackId="revenue"
              fill="#7c3aed" 
              name="Memberships"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="otherRevenue" 
              stackId="revenue"
              fill="#10b981" 
              name="Others"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#7c3aed] rounded"></div>
            <span className="text-sm text-neutral-600">Memberships</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#10b981] rounded"></div>
            <span className="text-sm text-neutral-600">Others</span>
          </div>
        </div>
      </div>

      {/* Membership Metrics Table */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-medium text-primary-700">Monthly Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-primary-200 border border-primary-200 bg-white">
            <thead className="bg-primary-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-primary-800">
                  Metric
                </th>
                {membershipMonthLabels.map((label, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary-800"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-200 bg-cream-100">
              {membershipTableRows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-cream-100' : 'bg-white'}>
                  <td className="px-4 py-3 text-sm font-medium text-primary-800">
                    {row.label}
                  </td>
                  {row.values.map((value, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-3 text-center text-sm text-neutral-700"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Averages Table */}
      <div>
        <h3 className="mb-4 text-sm font-medium text-primary-700">Historical Monthly Averages by Product</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-primary-200 border border-primary-200 bg-white">
            <thead className="bg-primary-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-primary-800">
                  Product
                </th>
                {productMonthLabels.map((label, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary-800"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-200 bg-cream-100">
              {productTableRows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-cream-100' : 'bg-white'}>
                  <td className="px-4 py-3 text-sm font-medium text-primary-800">
                    {row.label}
                  </td>
                  {row.values.map((value, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-3 text-center text-sm text-neutral-700"
                    >
                      {formatCurrency(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MembershipMetricsWidget;

