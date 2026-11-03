import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, renderMarkdown } from "@/lib/articles";

type ArticlePageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) notFound();

    return {
        title: `${article.title} | Vikram Krishnakumar`,
        description: article.description,
        openGraph: {
            images: [article.image],
        },
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) notFound();

    const content = await renderMarkdown(article.content, article.slug);

    return (
        <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-12 sm:px-6">
            <Link href="/articles" className="text-gray-300 hover:text-white">
                ← All articles
            </Link>
            <article className="mt-8">
                <header className="mb-8">
                    <time dateTime={article.date} className="text-gray-400">
                        {new Date(`${article.date}T00:00:00`).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    <h1 className="mt-3 text-4xl font-bold font-raleway sm:text-5xl">
                        {article.title}
                    </h1>
                    <p className="mt-4 text-xl text-gray-300">{article.description}</p>
                </header>
                <div className="relative mb-10 aspect-video overflow-hidden rounded-lg">
                    <Image
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        fill
                        priority
                        sizes="(max-width: 896px) 100vw, 896px"
                        className="object-cover"
                    />
                </div>
                <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </article>
        </main>
    );
}
