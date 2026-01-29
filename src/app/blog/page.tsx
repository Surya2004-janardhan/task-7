import { getSortedPostsData } from '@/lib/posts';
import BlogList from '@/components/BlogList';

export default function BlogPage() {
    const allPosts = getSortedPostsData();
    const postsPerPage = 10;
    const posts = allPosts.slice(0, postsPerPage);
    const totalPages = Math.ceil(allPosts.length / postsPerPage);

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">All Blog Posts</h1>
            <BlogList
                posts={posts}
                currentPage={1}
                totalPages={totalPages}
            />
        </div>
    );
}
