import { Helmet } from 'react-helmet-async';

export default function EnPrivacy() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Helmet>
        <title>Privacy Policy | dallaport</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-blue max-w-none space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">1. Purpose of Collection</h2>
          <p>
            dallaport collects minimal personal information to respond to user inquiries, improve services, and optimize the user experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">2. Items Collected</h2>
          <p>
            The following information may be collected during the use of the service.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>When using Contact: Email address, Name</li>
            <li>Service usage records: Access logs, cookies, access IP information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">3. Retention Period</h2>
          <p>
            In principle, collected personal information is destroyed without delay after the purpose is achieved. However, if it is necessary to preserve it according to relevant laws and regulations, it will be stored for that period.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">4. Third-Party Provision</h2>
          <p>
            dallaport does not provide users' personal information to third parties in principle. It is provided only exceptionally when there is the user's consent or according to the provisions of laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">5. Security Measures</h2>
          <p>
            dallaport applies the latest security technologies to safely manage users' personal information and strives to prevent personal information leakage caused by hacking or viruses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">6. How to Request Deletion</h2>
          <p>
            Users can request access, correction, and deletion of their personal information at any time. Deletion requests can be made via the email listed on the Contact page, and we will process them immediately.
          </p>
        </section>
      </div>
    </div>
  );
}
