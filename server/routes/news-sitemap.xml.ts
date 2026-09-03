import { defineEventHandler, setHeader } from 'h3';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl || 'https://admin.abertamente.net/api';
    const siteUrl = config.public.siteUrl || 'https://abertamente.net';
    const siteName = config.public.siteName || 'Abertamente';
    
    let posts: any[] = [];
    try {
        posts = await $fetch(`${apiUrl}/post/published`);
    } catch (error) {
        console.error('Failed to fetch posts for news sitemap', error);
    }
    
    // Filter posts published in the last 48 hours
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    
    const recentPosts = posts.filter(post => {
        const publishedDate = new Date(post.published_at || post.created_at);
        return publishedDate >= fortyEightHoursAgo;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentPosts.map(post => {
        const pubDate = new Date(post.published_at || post.created_at).toISOString();
        const url = `${siteUrl}/posts/${post.slug || post.id}`;
        
        return `    <url>
        <loc>${url}</loc>
        <news:news>
            <news:publication>
                <news:name>${siteName}</news:name>
                <news:language>pt</news:language>
            </news:publication>
            <news:publication_date>${pubDate}</news:publication_date>
            <news:title>${post.title}</news:title>
        </news:news>
    </url>`;
    }).join('\n')}
</urlset>`;

    setHeader(event, 'Content-Type', 'text/xml');
    
    return xml;
});
