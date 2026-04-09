import { useState } from 'react';
import { Eye, Save } from 'lucide-react';
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
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
            placeholder="Add title"
          />
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-gray-700">Content (HTML)</label>
              <CleanHtmlButton content={formData.content} onClean={(cleaned) => setFormData(prev => ({ ...prev, content: cleaned }))} />
            </div>
            <textarea 
              name="content" 
              value={formData.content} 
              onChange={handleChange}
              rows={25}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm leading-relaxed bg-gray-50"
              placeholder="Paste your HTML content here..."
            />
          </div>
        </div>
      </div>

      {/* Right Column: Settings */}
      <div className="w-full lg:w-80 space-y-6 shrink-0">
        
        {/* Publish Settings */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Publish Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Eye className="w-4 h-4" /> Preview
              </button>
              <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-bold text-white hover:bg-blue-700 transition-colors">
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>

        {/* Post Details */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Post Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">URL Slug</label>
              <input 
                type="text" 
                name="slug" 
                value={formData.slug} 
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono"
                placeholder="url-slug"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Category</label>
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
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Language</label>
              <select 
                name="language" 
                value={formData.language} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              >
                <option value="ko">Korean (ko)</option>
                <option value="en">English (en)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Tags (Optional)</label>
              <input 
                type="text" 
                name="tags" 
                value={formData.tags} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                placeholder="Comma separated tags"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">SEO</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">SEO Title</label>
              <input 
                type="text" 
                name="seoTitle" 
                value={formData.seoTitle} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                placeholder="Title for search engines"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">SEO Description</label>
              <textarea 
                name="seoDescription" 
                value={formData.seoDescription} 
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm leading-relaxed"
                placeholder="Meta description..."
              />
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}
