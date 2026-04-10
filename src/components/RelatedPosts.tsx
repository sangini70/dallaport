import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPostBySlug, Post } from '../services/posts';

interface RelatedPostsProps {
  relatedSlugs?: string[];
  isEn?: boolean;
}

export default function RelatedPosts({ relatedSlugs, isEn }: RelatedPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!relatedSlugs || relatedSlugs.length === 0) return;

    Promise.all(
      relatedSlugs.map(slug => getPostBySlug(slug).catch(() => null))
    ).then(results => {
      setPosts(results.filter(Boolean) as Post[]);
    });
  }, [relatedSlugs]);

  if (posts.length === 0) return null;

  const base = isEn ? '/en' : '';

  const getFallbackDescription = (post: Post) => {
    if (post.seoDescription) return post.seoDescription;
    if (post.shortDescription) return post.shortDescription;
    const stripped = post.contentHtml?.replace(/<[^>]+>/g, '') || '';
    return stripped.substring(0, 100) + (stripped.length > 100 ? '...' : '');
  };

  const getThumbnail = (post: Post) => {
    return post.thumbnail || 'https://picsum.photos/seed/dallaport/800/600';
  };

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold mb-6 text-gray-900">{isEn ? 'Related Posts' : '연관 콘텐츠'}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <Link key={post.slug || i} to={`${base}/post/${post.slug}`} className="group block">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-200">
              <img src={getThumbnail(post)} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h4>
            <p className="text-sm text-gray-500 line-clamp-2">{getFallbackDescription(post)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
