import { Eye, MousePointerClick } from 'lucide-react';

interface Props {
  totalViews: number;
  averageCtr: string;
}

export default function DashboardSummaryCards({ totalViews, averageCtr }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Views</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalViews.toLocaleString()}</h3>
        </div>
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <Eye className="w-6 h-6" />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Average CTR</p>
          <h3 className="text-3xl font-bold text-gray-900">{averageCtr}</h3>
        </div>
        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
          <MousePointerClick className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
