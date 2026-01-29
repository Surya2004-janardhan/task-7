import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import RSS from 'rss';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const POSTS_DIR = path.join(process.cwd(), 'posts');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function getPosts() {
  const fileNames = fs.readdirSync(POSTS_DIR);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(POSTS_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return {
        ...data,
        slug,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function generateSitemap(posts) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${posts
    .map((post) => {
      return `
  <url>
    <loc>${SITE_URL}/posts/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
  console.log('✅ sitemap.xml generated');
}

function generateRSS(posts) {
  const feed = new RSS({
    title: 'Modern Blog',
    description: 'A high-performance blog platform',
    feed_url: `${SITE_URL}/rss.xml`,
    site_url: SITE_URL,
    language: 'en',
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/posts/${post.slug}`,
      author: post.author,
      date: post.date,
    });
  });

  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), feed.xml({ indent: true }));
  console.log('✅ rss.xml generated');
}

const posts = getPosts();
generateSitemap(posts);
generateRSS(posts);
