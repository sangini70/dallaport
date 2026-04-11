import { Helmet } from 'react-helmet-async';
import CurrencyCalculator from '../components/CurrencyCalculator';
import Breadcrumb from '../components/Breadcrumb';

export default function CalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Helmet>
        <title>실전 환율 계산기 | 딸라포트</title>
        <meta name="description" content="은행 수수료와 우대율을 반영한 진짜 체감 환율을 계산해보세요. 달러 환전 시 실제 수령액을 정확히 확인할 수 있습니다." />
      </Helmet>

      <Breadcrumb track="exchange-rate" title="실전 환율 계산기" />
      
      <div className="mt-8 mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">실전 환율 계산기</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          은행 수수료와 우대율을 반영하여 실제 환전 시 적용되는 환율과 수령액을 계산합니다.
        </p>
      </div>

      <CurrencyCalculator isEn={false} />

      <div className="mt-16 bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">환율 계산기 사용 팁</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-blue-600">1. 은행 수수료(환전 수수료)란?</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              은행에서 고시하는 '매매기준율'에 은행의 이익인 수수료가 붙은 것이 우리가 실제로 거래하는 환율입니다. 보통 1.75% 내외로 설정되어 있습니다.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-blue-600">2. 환율 우대율 적용하기</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              '90% 우대'라는 말은 은행 수수료를 90% 깎아준다는 뜻입니다. 만약 수수료가 1.75%라면, 우대 후 실질 수수료는 0.175%가 됩니다. 계산기에 이 실질 수수료를 입력해보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
