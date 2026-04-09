import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function CurrencyCalculator() {
  const [usd, setUsd] = useState<number>(1);
  const [rate, setRate] = useState<number>(1350); // 기본 환율 (예시)

  return (
    <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm my-8">
      <div className="flex items-center gap-2 mb-4 text-blue-800 font-bold">
        <Calculator className="w-5 h-5" />
        <h3>간편 환율 계산기</h3>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <label className="block text-xs text-gray-500 mb-1">달러 (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input 
              type="number" 
              value={usd} 
              onChange={(e) => setUsd(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="text-gray-400 font-bold text-xl hidden sm:block">=</div>
        <div className="flex-1 w-full">
          <label className="block text-xs text-gray-500 mb-1">원화 (KRW)</label>
          <div className="relative">
            <input 
              type="text" 
              value={(usd * rate).toLocaleString()} 
              readOnly
              className="w-full pr-8 pl-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-right font-bold text-gray-900"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">원</span>
          </div>
        </div>
      </div>
      <div className="mt-3 text-right text-xs text-gray-400">
        * 적용 환율: 1 USD = {rate.toLocaleString()} KRW (예시)
      </div>
    </div>
  );
}
