export default function ViewsChart() {
  // A simple CSS-based bar chart representation for the dummy UI
  const data = [
    { time: '00:00', value: 20 },
    { time: '04:00', value: 10 },
    { time: '08:00', value: 45 },
    { time: '12:00', value: 80 },
    { time: '16:00', value: 65 },
    { time: '20:00', value: 90 },
    { time: '24:00', value: 30 },
  ];
  
  const max = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Hourly Views</h3>
      <div className="h-48 flex items-end justify-between gap-2">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center flex-1 gap-2">
            <div className="w-full bg-blue-100 rounded-t-sm relative group">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-sm transition-all duration-500 group-hover:bg-blue-600"
                style={{ height: `${(item.value / max) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400 font-medium">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
