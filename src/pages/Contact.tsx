import { Helmet } from 'react-helmet-async';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Contact - 딸라포트</title>
        <meta name="description" content="딸라포트 문의하기" />
      </Helmet>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">문의하기</h1>
      
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">문의 채널 준비 중입니다</h2>
        <p className="text-gray-600">
          현재 공식 문의 채널을 준비하고 있습니다.<br />
          빠른 시일 내에 이메일 및 기타 연락 수단을 통해 소통할 수 있도록 하겠습니다.
        </p>
      </div>
    </div>
  );
}
