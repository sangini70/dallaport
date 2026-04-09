import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search as SearchIcon, TrendingUp, DollarSign, BarChart3, BookOpen, Calculator, Building2 } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8 max-w-5xl mx-auto px-4">
      <Helmet>
        <title>딸라포트 | 환율과 달러의 구조 이해</title>
        <meta name="description" content="딸라포트(dallaport)에서 환율, 금리, 달러, ETF의 구조를 쉽게 이해하세요." />
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
            환율과 달러의 구조를<br />
            이해하는 금융 가이드
          </h1>
          <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
            환율, 금리, 달러, ETF의 구조를 이해하기 쉽게 설명합니다.
          </p>
          <div className="pt-2">
            <button className="bg-gray-900 text-white px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors">
              사이트 소개
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
            placeholder="환율, ETF, 금융 가이드를 검색해보세요"
            className="w-full pl-14 pr-24 py-4 bg-white border border-gray-200 rounded-full text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none shadow-sm transition-all"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors">
            검색
          </button>
        </div>
      </section>

      {/* Flow */}
      <section>
        <div className="mb-6">
          <div className="text-blue-600 text-xs font-bold tracking-widest mb-2 uppercase">Market Flow</div>
          <h2 className="text-2xl font-extrabold text-gray-900">흐름으로 보기</h2>
        </div>
        
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <h3 className="font-bold text-gray-900">지금 시장 흐름</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Link to="/post/exchange-rate-basics" className="group block">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                <img src="https://picsum.photos/seed/flow1/600/338" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  환율 1500원 돌파 이유 지금 1.25%...
                </h4>
                <span className="text-[10px] font-bold text-gray-500 tracking-wider bg-gray-100 px-2 py-1 rounded shrink-0">GUIDE</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                심리적 마지노선인 1,500원을 돌파한 환율의 구조적 원인과 정부의 외환 방어 정책...
              </p>
              <div className="flex items-end justify-between">
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#환율 전망</span>
                  <span className="text-xs text-gray-400">#원달러 환율 1500원</span>
                </div>
                <span className="text-xs text-gray-400 shrink-0">2026.04.07</span>
              </div>
            </Link>

            {/* Card 2 */}
            <Link to="/post/exchange-rate-and-interest-rate" className="group block">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                <img src="https://picsum.photos/seed/flow2/600/338" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  원·달러 환율 1506원 돌파, 금리차...
                </h4>
                <span className="text-[10px] font-bold text-gray-500 tracking-wider bg-gray-100 px-2 py-1 rounded shrink-0">GUIDE</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                심리적 마지노선인 1,500원을 돌파한 원·달러 환율의 배경과 정부의 대응 정...
              </p>
              <div className="flex items-end justify-between">
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#환율 1500원</span>
                  <span className="text-xs text-gray-400">#원달러 환율 전망</span>
                </div>
                <span className="text-xs text-gray-400 shrink-0">2026.04.07</span>
              </div>
            </Link>

            {/* Card 3 */}
            <Link to="/post/exchange-rate-market-impact" className="group block">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                <img src="https://picsum.photos/seed/flow3/600/338" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  고환율 시대, 개인 투자자의 대응...
                </h4>
                <span className="text-[10px] font-bold text-gray-500 tracking-wider bg-gray-100 px-2 py-1 rounded shrink-0">GUIDE</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                고환율이 지속되는 상황에서 개인 투자자가 취할 수 있는 자산 방어 및 수익 창출...
              </p>
              <div className="flex items-end justify-between">
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#고환율 투자</span>
                  <span className="text-xs text-gray-400">#자산 관리</span>
                </div>
                <span className="text-xs text-gray-400 shrink-0">2026.04.06</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">관심 주제 탐색</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/post/exchange-rate-basics" className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">환율</h3>
            <p className="text-xs text-gray-500">환달러, 엔화, 환율 읽는 법</p>
          </Link>
          <Link to="/post/etf-intro" className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">ETF</h3>
            <p className="text-xs text-gray-500">ETF 기초, 분산, 구조 이해</p>
          </Link>
          <Link to="/post/interest-rate-intro" className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">경제 기초</h3>
            <p className="text-xs text-gray-500">금리, 물가, 경기 흐름</p>
          </Link>
          <Link to="/post/dollar-intro" className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">미국 증시</h3>
            <p className="text-xs text-gray-500">나스닥, S&P500, 시황</p>
          </Link>
          <Link to="/post/tax-intro" className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">세금/지원금</h3>
            <p className="text-xs text-gray-500">절세 팁, 청년 지원금</p>
          </Link>
          <Link to="/calculator" className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">계산기</h3>
            <p className="text-xs text-gray-500">환율 계산 및 수수료 확인</p>
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">실속 환율 계산기 오픈!</h2>
            <p className="text-gray-600">
              실제 환전 구조(수수료·우대율)를 반영한 <strong className="text-blue-600">진짜 체감 환율</strong>을 확인해보세요.
            </p>
          </div>
          <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shrink-0 shadow-md">
            계산기 바로가기 &rarr;
          </button>
        </div>
      </section>

      {/* Trending */}
      <section>
        <div className="mb-6">
          <div className="text-blue-600 text-xs font-bold tracking-widest mb-2 uppercase">Trending</div>
          <h2 className="text-2xl font-extrabold text-gray-900">많이 보는 글</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Link key={i} to={`/post/trending-${i}`} className="group block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                <img src={`https://picsum.photos/seed/trend${i}/400/300`} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {i === 1 ? '2026-2027 환율 전망: 달러 강세 시나리...' : i === 2 ? '환율 하락 원인 3가지 핵심 정리' : '로보어드바이저 수수료 체계 및 업체별 비...'}
                </h4>
                <span className="text-[10px] font-bold text-gray-500 tracking-wider bg-gray-100 px-2 py-1 rounded shrink-0">GUIDE</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                {i === 1 ? '미래 경제 지표를 바탕으로 한 2026-2027 환율 시나리오와 자산 관리 대응 전략을...' : i === 2 ? '환율 하락(원화 가치 상승)의 주요 원인을 분석하고 투자자와 소비자에게 미치는 영...' : '효율적인 자산 관리를 위한 로보어드바이저 수수료 유형별 특징과 투자 규모에 따른...'}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#{i === 1 ? '2026환율' : i === 2 ? '환율' : '로보어드바이저 수수료'}</span>
                  <span className="text-xs text-gray-400">#{i === 1 ? '2027환율' : i === 2 ? '환율하락원인' : '자산관리 비용'}</span>
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
          <h2 className="text-2xl font-extrabold text-gray-900">최신 글</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Link key={i} to={`/post/latest-${i}`} className="group block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                <img src={`https://picsum.photos/seed/latest${i}/400/300`} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {i === 1 ? '고유가 지원금 60만원 왜 26.2조원...' : i === 2 ? '환율 상승 이유 4가지 핵심 원인 정리' : i === 3 ? '환율 1500원 돌파 이유 지금 1.25% 금리...' : i === 4 ? '원·달러 환율 1506원 돌파, 금리차 1.25%...' : i === 5 ? '고정환율 변동환율 차이 및 장단점 정리' : '환율과 무역수지 관계: 수출입 성적표의 핵...'}
                </h4>
                <span className="text-[10px] font-bold text-gray-500 tracking-wider bg-gray-100 px-2 py-1 rounded shrink-0">
                  {i === 1 ? '세금/지원금' : 'GUIDE'}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                {i === 1 ? '고유가 지원금 60만원 지급이 인플레이션과 우리 가계 물가에 미치는 실질적인 영...' : i === 2 ? '복잡한 경제 지표를 통해 환율이 오르는 이유를 분석하고 실생활에 미치는 영향을 정...' : i === 3 ? '심리적 마지노선을 넘은 1,500원 환율의 구조적 원인과 정부의 외환 방어 정책 및 향...' : i === 4 ? '심리적 마지노선인 1,500원을 돌파한 원·달러 환율의 배경과 정부의 대응 정책 및 향...' : i === 5 ? '고정환율과 변동환율의 차이점과 국가별 채택 이유, 각 제도의 장단점을 한눈에 정리...' : '환율과 무역수지의 상관관계를 통해 국가 경제의 흐름을 파악하고 수출입 구조의 특징...'}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-gray-400">#{i === 1 ? '고유가 지원금' : i === 2 ? '환율' : i === 3 ? '환율 전망' : i === 4 ? '환율 1500원' : i === 5 ? '고정환율제' : '환율'}</span>
                  <span className="text-xs text-gray-400">#{i === 1 ? '추가경정예산' : i === 2 ? '달러' : i === 3 ? '원달러 환율 1500원' : i === 4 ? '원달러 환율 전망' : i === 5 ? '변동환율제' : '무역수지'}</span>
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
          <button className="px-4 h-10 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 flex items-center justify-center">다음</button>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="w-full bg-gray-50 border border-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs tracking-widest">
        [ADSENSE PLACEHOLDER: GLOBAL-BOTTOM-AD - AUTO]
      </div>
    </div>
  );
}
