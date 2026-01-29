'use client';

import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { PostData } from '@/lib/posts';

interface BlogListProps {
    posts: PostData[];
    currentPage: number;
    totalPages: number;
}

export default function BlogList({ posts, currentPage, totalPages }: BlogListProps) {
    return (
        <div className="space-y-12">
            <div
                data-testid="post-list"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
            >
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>

            {totalPages > 1 && (
                <div data-testid="pagination" className="flex justify-center items-center gap-4">
                    {currentPage > 1 && (
                        <Link
                            href={currentPage === 2 ? '/blog' : `/blog/${currentPage - 1}`}
                            data-testid="pagination-prev"
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            Previous
                        </Link>
                    )}

                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={page === 1 ? '/blog' : `/blog/${page}`}
                                data-testid={`pagination-page-${page}`}
                                className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${currentPage === page
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>

                    {currentPage < totalPages && (
                        <Link
                            href={`/blog/${currentPage + 1}`}
                            data-testid="pagination-next"
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            Next
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
