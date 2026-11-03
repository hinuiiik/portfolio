import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";

export default function ArticleCard({ article }: { article: Article }) {
    return (
        <article className="overflow-hidden rounded-lg border border-white/20 bg-black/30">
            <Link href={`/articles/${article.slug}`} className="block">
                <div className="relative aspect-video">
                    <Image
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>
                <div className="p-5">
                    <time dateTime={article.date} className="text-sm text-gray-400">
                        {new Date(`${article.date}T00:00:00`).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    <h2 className="mt-2 text-2xl font-bold font-raleway">{article.title}</h2>
                    <p className="mt-2 text-gray-300">{article.description}</p>
                </div>
            </Link>
        </article>
    );
}
