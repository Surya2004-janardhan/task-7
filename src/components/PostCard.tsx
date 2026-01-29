import Link from 'next/link';
import { PostData } from '@/lib/posts';

interface PostCardProps {
    post: PostData;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <div
            data-testid={`post-card-${post.slug}`}
            className="group relative flex flex-col space-y-2 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow bg-card"
        >
            <div className="flex flex-col flex-1 space-y-2">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                    {' • '}
                    {post.readingTime}
                </p>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{post.excerpt}</p>
            </div>
            <Link
                href={`/posts/${post.slug}`}
                data-testid={`read-more-${post.slug}`}
                className="mt-4 text-primary font-semibold hover:underline"
            >
                Read More →
            </Link>
        </div>
    );
}
