import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare } from 'lucide-react';

export default function EnContact() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Helmet>
        <title>Contact | dallaport</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Have any questions?</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            If you have any inquiries or suggestions related to the use of our services, such as exchange rates, interest rates, or dollar investments, please send them to the email below. We will respond carefully after checking.
          </p>
          
          <div className="w-full bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</span>
            <a href="mailto:luganopizza@gmail.com" className="text-xl md:text-2xl font-black text-blue-600 hover:underline">
              luganopizza@gmail.com
            </a>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MessageSquare className="w-4 h-4" />
            <span>We usually respond within 1-2 business days.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
