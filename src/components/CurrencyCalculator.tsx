import { useState, useEffect } from 'react';
import { Calculator, ArrowRightLeft, AlertCircle } from 'lucide-react';

interface Props {
  isEn?: boolean;
}

export default function CurrencyCalculator({ isEn = false }: Props) {
  const [amount, setAmount] = useState<string>('100');
  const [rate, setRate] = useState<string>('1350');
  const [fee, setFee] = useState<string>('1.75'); // Default bank fee percentage
  const [direction, setDirection] = useState<'USD_TO_KRW' | 'KRW_TO_USD'>('USD_TO_KRW');
  const [result, setResult] = useState<number | null>(0);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    const numAmount = parseFloat(amount);
    const numRate = parseFloat(rate);
    const numFee = parseFloat(fee) || 0;

    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError(isEn ? 'Please enter a valid amount greater than 0.' : '0보다 큰 올바른 금액을 입력해주세요.');
      setResult(null);
      return;
    }

    if (!rate || isNaN(numRate) || numRate <= 0) {
      setError(isEn ? 'Please enter a valid exchange rate.' : '올바른 환율을 입력해주세요.');
      setResult(null);
      return;
    }

    if (isNaN(numFee) || numFee < 0) {
      setError(isEn ? 'Fee cannot be negative.' : '수수료는 음수일 수 없습니다.');
      setResult(null);
      return;
    }

    let calculated: number;
    if (direction === 'USD_TO_KRW') {
      // Buying KRW with USD: Amount * Rate * (1 - Fee/100)
      calculated = numAmount * numRate * (1 - numFee / 100);
    } else {
      // Buying USD with KRW: Amount / Rate * (1 - Fee/100)
      calculated = (numAmount / numRate) * (1 - numFee / 100);
    }

    if (isNaN(calculated) || !isFinite(calculated)) {
      setError(isEn ? 'Calculation error occurred.' : '계산 중 오류가 발생했습니다.');
      setResult(null);
    } else {
      setResult(calculated);
    }
  };

  useEffect(() => {
    calculate();
  }, [amount, rate, fee, direction]);

  const toggleDirection = () => {
    setDirection(prev => prev === 'USD_TO_KRW' ? 'KRW_TO_USD' : 'USD_TO_KRW');
  };

  const t = {
    title: isEn ? 'Practical Exchange Rate Calculator' : '실전 환율 계산기',
    amount: isEn ? 'Amount' : '금액',
    rate: isEn ? 'Exchange Rate' : '환율',
    fee: isEn ? 'Bank Fee (%)' : '은행 수수료 (%)',
    result: isEn ? 'Conversion Result' : '환전 결과',
    before: isEn ? 'Before' : '환전 전',
    after: isEn ? 'After' : '환전 후',
    appliedRate: isEn ? 'Applied Rate' : '적용 환율',
    feeAmount: isEn ? 'Fee Deducted' : '수수료 차감액',
    placeholderAmount: isEn ? 'Enter amount' : '금액 입력',
    placeholderRate: isEn ? 'Enter rate' : '환율 입력',
  };

  return (
    <div className="bg-white border border-blue-100 rounded-2xl p-6 md:p-8 shadow-sm my-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-blue-800 font-bold text-lg">
          <Calculator className="w-6 h-6" />
          <h3>{t.title}</h3>
        </div>
        <button 
          onClick={toggleDirection}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors"
        >
          <ArrowRightLeft className="w-4 h-4" />
          {direction === 'USD_TO_KRW' ? 'USD → KRW' : 'KRW → USD'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">{t.amount} ({direction === 'USD_TO_KRW' ? 'USD' : 'KRW'})</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                {direction === 'USD_TO_KRW' ? '$' : '₩'}
              </span>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t.placeholderAmount}
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">{t.rate} (1 USD = ? KRW)</label>
            <input 
              type="number" 
              value={rate} 
              onChange={(e) => setRate(e.target.value)}
              placeholder={t.placeholderRate}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">{t.fee}</label>
            <input 
              type="number" 
              value={fee} 
              onChange={(e) => setFee(e.target.value)}
              step="0.01"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 flex flex-col justify-center border border-gray-100">
          <h4 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">{t.result}</h4>
          
          {error ? (
            <div className="flex items-start gap-2 text-red-500 bg-red-50 p-3 rounded-lg text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-black text-gray-900">
                  {direction === 'USD_TO_KRW' ? '₩' : '$'}
                  {result !== null ? result.toLocaleString(undefined, { minimumFractionDigits: direction === 'USD_TO_KRW' ? 0 : 2, maximumFractionDigits: direction === 'USD_TO_KRW' ? 0 : 2 }) : '0'}
                </div>
                <div className="text-sm text-gray-500 mt-1 font-medium">
                  {t.after} ({direction === 'USD_TO_KRW' ? 'KRW' : 'USD'})
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">{t.before}</span>
                  <span className="font-bold text-gray-700">
                    {direction === 'USD_TO_KRW' ? '$' : '₩'}
                    {parseFloat(amount || '0').toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">{t.appliedRate}</span>
                  <span className="font-bold text-gray-700">1 USD = {parseFloat(rate || '0').toLocaleString()} KRW</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">{t.feeAmount}</span>
                  <span className="font-bold text-red-500">
                    -{direction === 'USD_TO_KRW' ? '₩' : '$'}
                    {result !== null ? (
                      direction === 'USD_TO_KRW' 
                        ? (parseFloat(amount) * parseFloat(rate) * (parseFloat(fee) / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })
                        : (parseFloat(amount) / parseFloat(rate) * (parseFloat(fee) / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })
                    ) : '0'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-[11px] text-gray-400 leading-relaxed">
        {isEn 
          ? '* This calculator reflects the actual structure of bank fees. The results are for reference only and may differ from the actual transaction amount at the bank.' 
          : '* 본 계산기는 은행 수수료 체계를 반영한 실전용입니다. 결과값은 참고용이며, 실제 은행 거래 시 금액과 차이가 있을 수 있습니다.'}
      </div>
    </div>
  );
}
