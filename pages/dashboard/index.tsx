import AdminLayout from '@/components/layout/AdminLayout';
import MembershipMetricsWidget from '@/components/dashboard/MembershipMetricsWidget';
import { useDashboard } from '@/hooks/useDashboard';

const DashboardPage = () => {
  const { 
    chartData, 
    membershipTableRows, 
    membershipMonthLabels,
    productTableRows,
    productMonthLabels,
    loading, 
    error 
  } = useDashboard();

  return (
    <AdminLayout
      header={
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
          <p className="text-sm text-neutral-500">
            Membership metrics and revenue overview
          </p>
        </div>
      }
    >
      {error ? (
        <div className="rounded-lg border border-red-300 bg-red-50 p-6">
          <p className="text-red-800">Error loading dashboard data: {error}</p>
        </div>
      ) : (
        <MembershipMetricsWidget
          chartData={chartData}
          membershipTableRows={membershipTableRows}
          membershipMonthLabels={membershipMonthLabels}
          productTableRows={productTableRows}
          productMonthLabels={productMonthLabels}
          loading={loading}
        />
      )}
    </AdminLayout>
  );
};

export default DashboardPage;

