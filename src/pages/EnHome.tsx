import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search as SearchIcon, TrendingUp, DollarSign, BarChart3, BookOpen, Calculator, Building2 } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function EnHome() {
  return (
    <div className="flex flex-col gap-16 py-8 max-w-5xl mx-auto px-4">
      <Helmet>
        <title>dallaport | Understanding Exchange Rates and the Dollar</title>
        <meta name="description" content="dallaport - Easily understand the structure of exchange rates, interest rates, the dollar, and ETFs." />
      </Helmet>

      {/* Top Ad */}
      <div className="w-full bg-gray-50 border border-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs tracking-widest">
        [ADSENSE PLACEHOLDER: GLOBAL-TOP-AD - AUTO]
      </div>

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4 text-sm font-bold text-gray-500 tracking-wider">
            <span className="w-8 h-px bg-gray-300"></span>
            GUIDE 01
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Financial Guide to<br />
            Exchange Rates & Dollar
          </h1>
          <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
            Easily understand the structure of exchange rates, interest rates, the dollar, and ETFs.
          </p>
          <div className="pt-2">
            <button className="bg-gray-900 text-white px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors">
              About Us
            </button>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="bg-gray-50 rounded-2xl aspect-[4/3] w-full flex items-center justify-center border border-gray-100 overflow-hidden">
            <img src="https://picsum.photos/seed/finance/800/600" alt="Finance Guide" className="w-full h-full object-cover opacity-90 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="max-w-2xl mx-auto w-full">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search exchange rates, ETFs, financial guides"
            className="w-full pl-14 pr-24 py-4 bg-white border border-gray-200 rounded-full text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none shadow-sm transition-all"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>
      </section>

      {/* Flow */}
      <section>
        <div className="mb-6">
          <div className="text-blue-600 text-xs font-bold tracking-widest mb-2 uppercase">Market Flow</div>
          <h2 className="text-2xl font-extrabold text-gray-900">View by Flow</h2>
        </div>
        
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <h3 className="font-bold text-gray-900">Current Market Flow</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Link to="/en/post/exchange-rate-basics" className="group block">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                <img src="https://picsum.photos/seed/flow1/600/338" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  Why Exchange Rate Surpassed 1,500 Won...
                </h4>
                <span className="text-[10px] font-bold text-gray-500 tracking-wider bg-gray-100 px-2 py-1 rounded shrink-0">GUIDE</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                Structural causes of the exchange rate breaking the psychological barrier of 1,500 won...
              </p>
              <div className="flex items-end justify-between">
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#ExchangeRate</span>
                  <span className="text-xs text-gray-400">#USD/KRW</span>
                </div>
                <span className="text-xs text-gray-400 shrink-0">2026.04.07</span>
              </div>
            </Link>

            {/* Card 2 */}
            <Link to="/en/post/exchange-rate-and-interest-rate" className="group block">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                <img src="https://picsum.photos/seed/flow2/600/338" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  USD/KRW Breaks 1,506 Won, Interest Gap...
                </h4>
                <span className="text-[10px] font-bold text-gray-500 tracking-wider bg-gray-100 px-2 py-1 rounded shrink-0">GUIDE</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                Background of the USD/KRW exchange rate breaking 1,500 won and the government's response...
              </p>
              <div className="flex items-end justify-between">
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#1500Won</span>
                  <span className="text-xs text-gray-400">#USD/KRW Outlook</span>
                </div>
                <span className="text-xs text-gray-400 shrink-0">2026.04.07</span>
              </div>
            </Link>

            {/* Card 3 */}
            <Link to="/en/post/exchange-rate-market-impact" className="group block">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                <img src="https://picsum.photos/seed/flow3/600/338" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  High Exchange Rate Era, Investor Response...
                </h4>
                <span className="text-[10px] font-bold text-gray-500 tracking-wider bg-gray-100 px-2 py-1 rounded shrink-0">GUIDE</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                Asset defense and profit generation strategies individual investors can take in a prolonged high exchange rate situation...
              </p>
              <div className="flex items-end justify-between">
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#HighRateInvestment</span>
                  <span className="text-xs text-gray-400">#AssetManagement</span>
                </div>
                <span className="text-xs text-gray-400 shrink-0">2026.04.06</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Explore Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/en/post/exchange-rate-basics" className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Exchange Rate</h3>
            <p className="text-xs text-gray-500">USD, JPY, How to read rates</p>
          </Link>
          <Link to="/en/post/etf-intro" className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">ETF</h3>
            <p className="text-xs text-gray-500">ETF basics, diversification</p>
          </Link>
          <Link to="/en/post/interest-rate-intro" className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Economy Basics</h3>
            <p className="text-xs text-gray-500">Interest rates, inflation</p>
          </Link>
          <Link to="/en/post/dollar-intro" className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">US Stock Market</h3>
            <p className="text-xs text-gray-500">Nasdaq, S&P500, Market</p>
          </Link>
          <Link to="/en/post/tax-intro" className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Taxes/Subsidies</h3>
            <p className="text-xs text-gray-500">Tax tips, youth subsidies</p>
          </Link>
          <Link to="/en/calculator" className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Calculator</h3>
            <p className="text-xs text-gray-500">Exchange rate & fees</p>
          </Link>
        </div>
      </section>

      {/* Feature Banner */}
      <section>
        <div className="bg-blue-50 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-block bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-sm">
              NEW FEATURE
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Practical Exchange Rate Calculator!</h2>
            <p className="text-gray-600">
              Check the <strong className="text-blue-600">real exchange rate</strong> reflecting actual exchange structures (fees & preferred rates).
            </p>
          </div>
          <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shrink-0 shadow-md">
            Go to Calculator &rarr;
          </button>
        </div>
      </section>

      {/* Trending */}
      <section>
        <div className="mb-6">
          <div className="text-blue-600 text-xs font-bold tracking-widest mb-2 uppercase">Trending</div>
          <h2 className="text-2xl font-extrabold text-gray-900">Trending Posts</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Link key={i} to={`/en/post/trending-${i}`} className="group block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                <img src={`https://picsum.photos/seed/trend${i}/400/300`} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {i === 1 ? '2026-2027 Exchange Rate Outlook: Dollar...' : i === 2 ? '3 Key Reasons for Exchange Rate Drop' : 'Robo-advisor Fee Structure and Comparison...'}
                </h4>
                <span className="text-[10px] font-bold text-gray-500 tracking-wider bg-gray-100 px-2 py-1 rounded shrink-0">GUIDE</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                {i === 1 ? '2026-2027 exchange rate scenarios and asset management strategies based on future economic indicators...' : i === 2 ? 'Analyzing the main causes of the exchange rate drop (won appreciation) and its impact on investors...' : 'Characteristics of robo-advisor fee types for efficient asset management and...'}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#{i === 1 ? '2026Outlook' : i === 2 ? 'ExchangeRate' : 'RoboAdvisorFees'}</span>
                  <span className="text-xs text-gray-400">#{i === 1 ? '2027Outlook' : i === 2 ? 'RateDropCauses' : 'AssetManagement'}</span>
                </div>
                <span className="text-xs text-gray-400">2026.04.0{4-i} 00:07</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest */}
      <section>
        <div className="mb-6">
          <div className="text-blue-600 text-xs font-bold tracking-widest mb-2 uppercase">Latest</div>
          <h2 className="text-2xl font-extrabold text-gray-900">Latest Posts</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Link key={i} to={`/en/post/latest-${i}`} className="group block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                <img src={`https://picsum.photos/seed/latest${i}/400/300`} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {i === 1 ? 'Why High Oil Price Subsidy is 26.2 Trillion...' : i === 2 ? '4 Key Reasons for Exchange Rate Rise' : i === 3 ? 'Why Exchange Rate Broke 1500 Won Now...' : i === 4 ? 'USD/KRW Breaks 1506 Won, Interest Gap...' : i === 5 ? 'Fixed vs Floating Exchange Rates: Pros & Cons' : 'Exchange Rate and Trade Balance Relationship...'}
                </h4>
                <span className="text-[10px] font-bold text-gray-500 tracking-wider bg-gray-100 px-2 py-1 rounded shrink-0">
                  {i === 1 ? 'TAX/SUBSIDY' : 'GUIDE'}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                {i === 1 ? 'The actual impact of the 600,000 won high oil price subsidy on inflation and our household prices...' : i === 2 ? 'Analyzing the reasons for the rising exchange rate through complex economic indicators and its impact on real life...' : i === 3 ? 'Structural causes of the exchange rate breaking the psychological barrier of 1,500 won and the government\'s foreign exchange defense policy...' : i === 4 ? 'Background of the USD/KRW exchange rate breaking the psychological barrier of 1,500 won and the government\'s response policy...' : i === 5 ? 'A quick summary of the differences between fixed and floating exchange rates, reasons for adoption by country, and pros and cons of each system...' : 'Understanding the flow of the national economy and the characteristics of the import/export structure through the correlation between exchange rates and trade balance...'}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#{i === 1 ? 'OilSubsidy' : i === 2 ? 'ExchangeRate' : i === 3 ? 'RateOutlook' : i === 4 ? '1500Won' : i === 5 ? 'FixedRate' : 'ExchangeRate'}</span>
                  <span className="text-xs text-gray-400">#{i === 1 ? 'ExtraBudget' : i === 2 ? 'Dollar' : i === 3 ? 'USD/KRW' : i === 4 ? 'USD/KRW Outlook' : i === 5 ? 'FloatingRate' : 'TradeBalance'}</span>
                </div>
                <span className="text-xs text-gray-400">2026.04.07 21:43</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <button className="w-10 h-10 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">1</button>
          <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 flex items-center justify-center">2</button>
          <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 flex items-center justify-center">3</button>
          <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 flex items-center justify-center">4</button>
          <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 flex items-center justify-center">5</button>
          <button className="px-4 h-10 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 flex items-center justify-center">Next</button>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="w-full bg-gray-50 border border-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs tracking-widest">
        [ADSENSE PLACEHOLDER: GLOBAL-BOTTOM-AD - AUTO]
      </div>
    </div>
  );
}
