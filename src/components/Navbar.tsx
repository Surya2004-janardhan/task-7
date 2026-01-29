import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-background/95 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl">Modern Blog</span>
                    </Link>
                    <div className="hidden md:flex gap-6">
                        <Link
                            href="/"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Home
                        </Link>
                        <Link
                            href="/blog"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Blog
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
