import { Helmet } from 'react-helmet-async';

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Helmet>
        <title>개인정보처리방침 | 딸라포트</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>
      
      <div className="prose prose-blue max-w-none space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">1. 개인정보 수집 목적</h2>
          <p>
            딸라포트는 이용자의 문의 응대, 서비스 개선, 그리고 사용자 경험 최적화를 위해 최소한의 개인정보를 수집합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">2. 수집 항목</h2>
          <p>
            서비스 이용 과정에서 다음과 같은 정보가 수집될 수 있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>문의하기 이용 시: 이메일 주소, 이름</li>
            <li>서비스 이용 기록: 접속 로그, 쿠키, 접속 IP 정보</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">3. 보관 기간</h2>
          <p>
            수집된 개인정보는 목적이 달성된 후 지체 없이 파기하는 것을 원칙으로 합니다. 단, 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">4. 제3자 제공 여부</h2>
          <p>
            딸라포트는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 이용자의 동의가 있거나 법령의 규정에 의거한 경우에만 예외적으로 제공됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">5. 보안 처리 방식</h2>
          <p>
            딸라포트는 이용자의 개인정보를 안전하게 관리하기 위해 최신 보안 기술을 적용하고 있으며, 해킹이나 바이러스 등에 의한 개인정보 유출을 방지하기 위해 노력하고 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">6. 사용자 삭제 요청 방법</h2>
          <p>
            이용자는 언제든지 자신의 개인정보에 대한 열람, 수정 및 삭제를 요청할 수 있습니다. 삭제 요청은 하단의 Contact 페이지에 기재된 이메일을 통해 접수해 주시면 즉시 처리해 드립니다.
          </p>
        </section>
      </div>
    </div>
  );
}
