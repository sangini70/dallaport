import { Helmet } from 'react-helmet-async';
import CurrencyCalculator from '../components/CurrencyCalculator';
import Breadcrumb from '../components/Breadcrumb';

export default function EnCalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Helmet>
        <title>Practical Exchange Rate Calculator | Dallaport</title>
        <meta name="description" content="Calculate the real perceived exchange rate reflecting bank fees and preferential rates. Accurately check the actual amount received when exchanging dollars." />
      </Helmet>

      <Breadcrumb track="exchange-rate" title="Exchange Rate Calculator" isEn={true} />
      
      <div className="mt-8 mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Exchange Rate Calculator</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate the actual exchange rate and amount received by reflecting bank fees and preferential rates.
        </p>
      </div>

      <CurrencyCalculator isEn={true} />

      <div className="mt-16 bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips for Using the Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-blue-600">1. What is the Bank Fee?</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              The rate we actually trade at is the 'Base Rate' plus the bank's profit, which is the fee. It is usually set around 1.75%.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-blue-600">2. Applying Preferential Rates</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              '90% Preference' means the bank discounts the fee by 90%. If the fee is 1.75%, the real fee after preference becomes 0.175%. Try entering this real fee into the calculator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
