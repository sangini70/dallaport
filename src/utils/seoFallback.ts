export function getSeoDescription(
  seoDescription?: string,
  shortDescription?: string,
  content?: string
): string {
  if (seoDescription && seoDescription.trim().length > 0) {
    return seoDescription.trim();
  }
  
  if (shortDescription && shortDescription.trim().length > 0) {
    return shortDescription.trim();
  }
  
  if (content && content.trim().length > 0) {
    // Remove HTML tags and markdown formatting for a clean summary
    const cleanText = content
      .replace(/<[^>]+>/g, '') // Remove HTML tags
      .replace(/[#*`_\[\]]/g, '') // Remove basic markdown characters
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
      
    return cleanText.substring(0, 150) + (cleanText.length > 150 ? '...' : '');
  }
  
  return '딸라포트 - 달러 투자와 환율의 모든 것';
}
