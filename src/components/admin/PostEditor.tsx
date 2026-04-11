import { useState } from 'react';
import { Eye, Save, X } from 'lucide-react';
import CleanHtmlButton from './CleanHtmlButton';

interface PostEditorProps {
  initialData?: any;
  onSave: (data: any) => void;
}

export default function PostEditor({ initialData, onSave }: PostEditorProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    status: initialData?.status || 'draft',
    slug: initialData?.slug || '',
    category: initialData?.category || 'exchange-rate',
    language: initialData?.language || 'ko',
    tags: initialData?.tags || '',
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    shortDescription: initialData?.shortDescription || '',
    publishDate: initialData?.publishDate || '',
    hubSlug: initialData?.hubSlug || '',
    flowStep: initialData?.flowStep || '',
    thumbnail: initialData?.thumbnail || '',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState('');

  const recommendHubAndStep = () => {
    const text = (formData.title + ' ' + formData.content).toLowerCase();
    let recHub = '';
    let recStep = '';

    if (text.includes('etf')) recHub = 'etf';
    else if (text.includes('환율')) recHub = 'exchange-rate';
    else if (text.includes('달러')) recHub = 'dollar';
    else if (text.includes('금리')) recHub = 'interest-rate';
    else if (text.includes('경제')) recHub = 'economy-basics';

    if (text.includes('입문') || text.includes('기초') || text.includes('시작')) recStep = '1';
    else if (text.includes('이해') || text.includes('원리') || text.includes('구조')) recStep = '2';
    else if (text.includes('비교') || text.includes('차이') || text.includes('장단점')) recStep = '3';
    else if (text.includes('판단') || text.includes('전망') || text.includes('분석')) recStep = '4';
    else if (text.includes('실행') || text.includes('투자') || text.includes('방법')) recStep = '5';

    return { recHub, recStep };
  };

  const { recHub, recStep } = recommendHubAndStep();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const cleanHtml = (html: string) => {
    return html
      .replace(/\[cite:.*?\]/g, '') // Remove [cite: ...]
      .replace(/```html/g, '') // Remove markdown code wrappers
      .replace(/```/g, '')
      .trim();
  };

  const handlePreview = () => {
    const cleaned = cleanHtml(formData.content);
    setFormData(prev => ({ ...prev, content: cleaned }));
    setPreviewContent(cleaned);
    setShowPreview(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-assign publishDate if empty
    let finalPublishDate = formData.publishDate;
    if (!finalPublishDate) {
      if (formData.status === 'published') {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        finalPublishDate = `${year}-${month}-${day}T${hours}:${minutes}`;
      } else {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const randomHour = Math.floor(Math.random() * (21 - 8 + 1)) + 8;
        const randomMinute = Math.floor(Math.random() * 60);
        tomorrow.setHours(randomHour, randomMinute, 0, 0);
        
        // Format to YYYY-MM-DDThh:mm
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const hours = String(tomorrow.getHours()).padStart(2, '0');
        const minutes = String(tomorrow.getMinutes()).padStart(2, '0');
        finalPublishDate = `${year}-${month}-${day}T${hours}:${minutes}`;
      }
    }

    onSave({ ...formData, publishDate: finalPublishDate });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Left Column: Content */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              required
              className="w-full text-2xl font-bold border-0 border-b border-gray-200 focus:ring-0 focus:border-blue-500 pb-3 outline-none placeholder-gray-300"
              placeholder="제목을 입력하세요"
            />
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-gray-700">본문 (HTML)</label>
                <CleanHtmlButton content={formData.content} onClean={(cleaned) => setFormData(prev => ({ ...prev, content: cleaned }))} />
              </div>
              <textarea 
                name="content" 
                value={formData.content} 
                onChange={handleChange}
                rows={25}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm leading-relaxed bg-gray-50"
                placeholder="HTML 코드를 여기에 붙여넣으세요..."
              />
            </div>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="w-full lg:w-80 space-y-6 shrink-0">
          
          {/* Publish Settings */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">발행 설정</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">상태</label>
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
                >
                  <option value="draft">임시저장 (Draft)</option>
                  <option value="scheduled">예약발행 (Scheduled)</option>
                  <option value="published">발행됨 (Published)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">예약 일시 (KST)</label>
                <input 
                  type="datetime-local" 
                  name="publishDate" 
                  value={formData.publishDate} 
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
                <p className="text-[10px] text-gray-400 mt-1">비워두면 다음날 08:00~21:00 사이 자동 배정</p>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={handlePreview} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4" /> 미리보기
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-bold text-white hover:bg-blue-700 transition-colors">
                  <Save className="w-4 h-4" /> 저장
                </button>
              </div>
            </div>
          </div>

          {/* Post Details */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">문서 정보</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
                  URL 슬러그 {initialData?.slug && <span className="text-red-500 font-normal normal-case ml-2">(고정됨: SEO 보호)</span>}
                </label>
                <input 
                  type="text" 
                  name="slug" 
                  value={formData.slug} 
                  onChange={handleChange}
                  required
                  disabled={!!initialData?.slug}
                  className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono ${initialData?.slug ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                  placeholder="url-slug"
                />
                {initialData?.slug && (
                  <p className="text-[10px] text-gray-400 mt-1">발행 후 슬러그 변경은 SEO 안정을 위해 금지됩니다.</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">허브 (Hub)</label>
                <select 
                  name="hubSlug" 
                  value={formData.hubSlug} 
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="">선택 안함</option>
                  <option value="exchange-rate">환율 (Exchange Rate)</option>
                  <option value="dollar">달러 (Dollar)</option>
                  <option value="interest-rate">금리 (Interest Rate)</option>
                  <option value="etf">ETF</option>
                  <option value="economy-basics">경제 기초 (Economy Basics)</option>
                </select>
                {recHub && !formData.hubSlug && (
                  <p className="text-[10px] text-blue-500 mt-1">추천 허브: {recHub}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Flow 단계</label>
                <select 
                  name="flowStep" 
                  value={formData.flowStep} 
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="">선택 안함</option>
                  <option value="1">1: 입문</option>
                  <option value="2">2: 이해</option>
                  <option value="3">3: 비교</option>
                  <option value="4">4: 판단</option>
                  <option value="5">5: 실행</option>
                </select>
                {recStep && !formData.flowStep && (
                  <p className="text-[10px] text-blue-500 mt-1">추천 단계: {recStep}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">카테고리</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="exchange-rate">환율 (Exchange Rate)</option>
                  <option value="dollar">달러 (Dollar)</option>
                  <option value="interest-rate">금리 (Interest Rate)</option>
                  <option value="etf">ETF</option>
                  <option value="economy-basics">경제 기초 (Economy Basics)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">언어</label>
                <select 
                  name="language" 
                  value={formData.language} 
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="ko">한국어 (ko)</option>
                  <option value="en">영어 (en)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">태그 (선택)</label>
                <input 
                  type="text" 
                  name="tags" 
                  value={formData.tags} 
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="쉼표로 구분"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Thumbnail URL</label>
                <input 
                  type="text" 
                  name="thumbnail" 
                  value={formData.thumbnail} 
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">SEO 및 요약</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">SEO 제목</label>
                <input 
                  type="text" 
                  name="seoTitle" 
                  value={formData.seoTitle} 
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="검색엔진용 제목"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">짧은 요약 (Short Description)</label>
                <textarea 
                  name="shortDescription" 
                  value={formData.shortDescription} 
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm leading-relaxed"
                  placeholder="목록에 표시될 짧은 요약..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">SEO 설명 (SEO Description)</label>
                <textarea 
                  name="seoDescription" 
                  value={formData.seoDescription} 
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm leading-relaxed"
                  placeholder="검색엔진용 메타 설명..."
                />
              </div>
            </div>
          </div>

        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-bold text-gray-900">미리보기</h3>
              <button onClick={() => setShowPreview(false)} className="p-1 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-8">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">{formData.title}</h1>
                <div 
                  className="prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: previewContent }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
