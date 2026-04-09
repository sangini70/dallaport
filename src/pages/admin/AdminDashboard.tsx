import { useEffect, useState } from 'react';
import DashboardSummaryCards from '../../components/admin/DashboardSummaryCards';
import TopPostsList from '../../components/admin/TopPostsList';
import CtrList from '../../components/admin/CtrList';
import { fetchDashboardMetrics, DashboardMetrics } from '../../services/dashboardMetrics';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    async function loadMetrics() {
      const data = await fetchDashboardMetrics('ko');
      setMetrics(data);
    }
    loadMetrics();
  }, []);

  if (!metrics) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <DashboardSummaryCards totalViews={metrics.totalViews} averageCtr={metrics.averageCtr} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 mt-8">
        <TopPostsList posts={metrics.topPosts} />
        <CtrList posts={metrics.lowCtrPosts} />
      </div>

      <div className="mt-12 text-center text-xs text-gray-400 border-t border-gray-100 pt-6">
        본 대시보드는 운영 현황 확인 목적이며, 자동 분석·자동 최적화·자동 전략 제안 기능을 제공하지 않는다.
      </div>
    </div>
  );
}
