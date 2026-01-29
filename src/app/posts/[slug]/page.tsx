import { getPostData, getSortedPostsData } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import rehypeHighlight from 'rehype-highlight';
import { Metadata } from 'next';

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostData(slug);

    if (!post) {
        return {};
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            images: post.image ? [post.image] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: post.image ? [post.image] : [],
        },
    };
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

const components = {
    h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
    h2: (props: any) => <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />,
    p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-6 mb-4" {...props} />,
    li: (props: any) => <li className="mb-2" {...props} />,
    strong: (props: any) => <strong className="font-bold text-primary" {...props} />,
    pre: (props: any) => <pre data-testid="code-block" className="rounded-lg overflow-hidden my-6" {...props} />,
    code: (props: any) => <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props} />,
    img: (props: any) => (
        <div className="my-8 relative h-[400px] w-full">
            <Image
                src={props.src}
                alt={props.alt || ''}
                fill
                className="rounded-lg object-cover"
                data-testid="optimized-image"
            />
        </div>
    ),
};

export default async function PostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getPostData(slug);

    if (!post) {
        notFound();
    }

    return (
        <article data-testid="blog-post" className="max-w-3xl mx-auto py-12">
            <header className="mb-8">
                <h1 data-testid="post-title" className="text-5xl font-extrabold mb-4 tracking-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                    <span>{post.author}</span>
                    <span>•</span>
                    <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    <span>•</span>
                    <span data-testid="reading-time">{post.readingTime}</span>
                </div>
            </header>

            {post.image && (
                <div className="relative h-[400px] w-full mb-12">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        priority
                        className="rounded-xl object-cover"
                        data-testid="optimized-image"
                    />
                </div>
            )}

            <div data-testid="post-content" className="prose dark:prose-invert max-w-none">
                <MDXRemote
                    source={post.content}
                    components={components}
                    options={{
                        mdxOptions: {
                            rehypePlugins: [rehypeHighlight],
                        }
                    }}
                />
            </div>
        </article>
    );
}
