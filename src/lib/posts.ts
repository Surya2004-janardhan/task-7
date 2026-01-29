import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
    slug: string;
    title: string;
    date: string;
    author: string;
    tags: string[];
    excerpt: string;
    content: string;
    readingTime: string;
    image?: string;
}

export function getSortedPostsData(): PostData[] {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            // Remove ".mdx" from file name to get slug
            const slug = fileName.replace(/\.mdx$/, '');

            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);

            // Combine the data with the slug
            return {
                slug,
                title: matterResult.data.title,
                date: matterResult.data.date,
                author: matterResult.data.author,
                tags: matterResult.data.tags || [],
                excerpt: matterResult.data.excerpt || '',
                content: matterResult.content,
                readingTime: readingTime(matterResult.content).text,
                image: matterResult.data.image,
            } as PostData;
        });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostSlugs() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            return {
                params: {
                    slug: fileName.replace(/\.mdx$/, ''),
                },
            };
        });
}

export function getPostData(slug: string): PostData {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the slug
    return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        author: matterResult.data.author,
        tags: matterResult.data.tags || [],
        excerpt: matterResult.data.excerpt || '',
        content: matterResult.content,
        readingTime: readingTime(matterResult.content).text,
        image: matterResult.data.image,
    };
}
