import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>About - 딸라포트</title>
        <meta name="description" content="딸라포트에 대한 소개입니다." />
      </Helmet>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">딸라포트 소개</h1>
      
      <div className="prose prose-blue max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <strong>딸라포트</strong>는 환율, 달러, 금리, ETF, 그리고 경제 기초 지식을 다루는 전문 교육 사이트입니다.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">왜 존재하는가?</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          복잡하고 어렵게 느껴지는 경제 지표와 금융 시장의 흐름을 누구나 쉽게 이해할 수 있도록 돕기 위해 만들어졌습니다. 
          단순한 뉴스 전달을 넘어, 현상의 이면에 있는 구조와 원리를 설명함으로써 독자 스스로 경제 흐름을 읽는 눈을 기를 수 있도록 지원합니다.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">어떤 주제를 다루는가?</h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
          <li><strong>환율:</strong> 환율 변동의 원인과 그것이 우리 경제에 미치는 영향</li>
          <li><strong>달러:</strong> 기축통화로서의 달러의 역할과 글로벌 자본 흐름</li>
          <li><strong>금리:</strong> 기준금리 변화가 자산 시장과 실물 경제에 미치는 파급 효과</li>
          <li><strong>ETF:</strong> 다양한 투자 아이디어를 실현할 수 있는 ETF 투자 기초와 전략</li>
          <li><strong>경제 기초:</strong> 거시 경제를 이해하기 위한 필수 기초 지식</li>
        </ul>
      </div>
    </div>
  );
}
