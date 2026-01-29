'use client';

import { DefaultSeo } from 'next-seo';

export default function SEO() {
    return (
        <DefaultSeo
            title="Modern Blog"
            description="A high-performance, SEO-optimized blog platform built with Next.js"
            openGraph={{
                type: 'website',
                locale: 'en_US',
                url: 'https://example.com',
                siteName: 'Modern Blog',
            }}
            twitter={{
                handle: '@handle',
                site: '@site',
                cardType: 'summary_large_image',
            }}
        />
    );
}
