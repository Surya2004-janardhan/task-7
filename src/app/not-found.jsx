import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
            <h1 className="text-9xl font-extrabold text-primary">404</h1>
            <div className="space-y-2">
                <h2 className="text-3xl font-bold" data-testid="not-found-message">
                    Oops! Page not found.
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
            </div>
            <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90"
            >
                Go Back Home
            </Link>
        </div>
    );
}
