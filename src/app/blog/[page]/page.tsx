import { getSortedPostsData } from '@/lib/posts';
import BlogList from '@/components/BlogList';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const allPosts = getSortedPostsData();
    const postsPerPage = 10;
    const totalPages = Math.ceil(allPosts.length / postsPerPage);

    const params = [];
    for (let i = 1; i <= totalPages; i++) {
        params.push({ page: i.toString() });
    }
    return params;
}

interface PageProps {
    params: Promise<{ page: string }>;
}

export default async function BlogPage({ params }: PageProps) {
    const { page } = await params;
    const pageNumber = parseInt(page);

    if (isNaN(pageNumber) || pageNumber < 1) {
        notFound();
    }

    const allPosts = getSortedPostsData();
    const postsPerPage = 10;
    const totalPages = Math.ceil(allPosts.length / postsPerPage);

    if (pageNumber > totalPages) {
        notFound();
    }

    const start = (pageNumber - 1) * postsPerPage;
    const posts = allPosts.slice(start, start + postsPerPage);

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">All Blog Posts - Page {pageNumber}</h1>
            <BlogList
                posts={posts}
                currentPage={pageNumber}
                totalPages={totalPages}
            />
        </div>
    );
}
