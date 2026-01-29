import { getSortedPostsData } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export default function Home() {
  const allPosts = getSortedPostsData();
  const recentPosts = allPosts.slice(0, 6);

  return (
    <div className="space-y-12">
      <section className="py-12 md:py-24 lg:py-32 flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to <span className="text-primary">Modern Blog</span>
        </h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Insights, tutorials, and articles about the latest in web development and technology.
        </p>
        <div className="flex gap-4">
          <Link
            href="/blog"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Explore All Posts
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Recent Posts</h2>
          <Link href="/blog" className="text-primary hover:underline font-medium">
            View all →
          </Link>
        </div>
        <div
          data-testid="post-list"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
