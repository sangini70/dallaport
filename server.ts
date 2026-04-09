import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs/promises';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper to read flow-index.json
  async function getFlowIndex(lang: string) {
    const indexPath = path.join(process.cwd(), 'public', 'data', lang, 'flow-index.json');
    try {
      const data = await fs.readFile(indexPath, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      return {};
    }
  }

  // Helper to write flow-index.json
  async function saveFlowIndex(lang: string, data: any) {
    const indexPath = path.join(process.cwd(), 'public', 'data', lang, 'flow-index.json');
    await fs.mkdir(path.dirname(indexPath), { recursive: true });
    await fs.writeFile(indexPath, JSON.stringify(data, null, 2), 'utf-8');
  }

  // Helper to update prev/next/related links for a track
  async function updateTrackLinks(lang: string, track: string) {
    const flowIndex = await getFlowIndex(lang);
    const slugs = flowIndex[track] || [];

    for (let i = 0; i < slugs.length; i++) {
      const currentSlug = slugs[i];
      const detailPath = path.join(process.cwd(), 'public', 'data', lang, 'detail', `${currentSlug}.json`);
      try {
        const data = await fs.readFile(detailPath, 'utf-8');
        const post = JSON.parse(data);

        post.prev_slug = i > 0 ? slugs[i - 1] : null;
        post.next_slug = i < slugs.length - 1 ? slugs[i + 1] : null;
        post.step = i + 1;
        
        // Related: up to 3 other posts in the same track
        post.related = slugs.filter((s: string) => s !== currentSlug).slice(0, 3);

        await fs.writeFile(detailPath, JSON.stringify(post, null, 2), 'utf-8');
      } catch (e) {
        console.error(`Could not update links for ${currentSlug}`, e);
      }
    }
  }

  // API routes
  app.post('/api/sync-json', async (req, res) => {
    try {
      const post = req.body;
      const lang = post.language || 'ko';
      const slug = post.slug;
      
      if (!slug) {
        return res.status(400).json({ error: 'Slug is required' });
      }

      // Only sync published posts
      if (post.status === 'published') {
        const detailPath = path.join(process.cwd(), 'public', 'data', lang, 'detail', `${slug}.json`);
        await fs.mkdir(path.dirname(detailPath), { recursive: true });
        
        // Format for JSON (prev/next will be updated by updateTrackLinks)
        const jsonContent = {
          slug: post.slug,
          title: post.title,
          summary: post.seoDescription,
          content: post.contentHtml,
          track: post.category,
          step: 1,
          views: post.views || 0,
          ctr: post.ctr || 0,
          prev_slug: null,
          next_slug: null,
          related: []
        };
        
        await fs.writeFile(detailPath, JSON.stringify(jsonContent, null, 2), 'utf-8');

        // Update flow-index.json
        const flowIndex = await getFlowIndex(lang);
        const track = post.category || 'uncategorized';
        
        if (!flowIndex[track]) {
          flowIndex[track] = [];
        }
        
        if (!flowIndex[track].includes(slug)) {
          flowIndex[track].push(slug);
          await saveFlowIndex(lang, flowIndex);
        }

        // Update prev/next/related for the entire track
        await updateTrackLinks(lang, track);
      }

      res.json({ success: true, message: 'JSON synced successfully' });
    } catch (error) {
      console.error('Sync error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/remove-json', async (req, res) => {
    try {
      const { slug, language } = req.body;
      const lang = language || 'ko';

      if (!slug) {
        return res.status(400).json({ error: 'Slug is required' });
      }

      const detailPath = path.join(process.cwd(), 'public', 'data', lang, 'detail', `${slug}.json`);
      
      try {
        await fs.unlink(detailPath);
      } catch (e) {
        // Ignore if file doesn't exist
      }

      // Update flow-index.json
      const flowIndex = await getFlowIndex(lang);
      let updatedTrack = null;
      
      for (const track in flowIndex) {
        const index = flowIndex[track].indexOf(slug);
        if (index > -1) {
          flowIndex[track].splice(index, 1);
          updatedTrack = track;
        }
      }

      if (updatedTrack) {
        await saveFlowIndex(lang, flowIndex);
        // Re-link the remaining posts in the track
        await updateTrackLinks(lang, updatedTrack);
      }

      res.json({ success: true, message: 'JSON removed successfully' });
    } catch (error) {
      console.error('Remove error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
