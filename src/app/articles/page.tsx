import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/app/ui/ArticleCard";
import { getArticles } from "@/lib/articles";

export const metadata: Metadata = {
    title: "Articles | Vikram Krishnakumar",
};

export default async function ArticlesPage() {
    const articles = await getArticles();

    return (
        <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <Link href="/" className="text-gray-300 hover:text-white">
                ← Home
            </Link>
            <h1 className="my-10 text-center text-5xl font-bold font-raleway">Articles</h1>
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {articles.map((article) => (
                        <ArticleCard key={article.slug} article={article} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-300">No articles published yet.</p>
            )}
        </main>
    );
}
