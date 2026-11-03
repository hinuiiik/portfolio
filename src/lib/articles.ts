import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

export type Article = {
    slug: string;
    title: string;
    date: string;
    description: string;
    image: string;
    imageAlt?: string;
    content: string;
};

function parseArticleDate(value: unknown, filePath: string): string {
    const date = value instanceof Date ? value : new Date(String(value ?? ""));
    if (Number.isNaN(date.getTime())) {
        throw new Error(`Invalid or missing article date in ${filePath}`);
    }
    return date.toISOString().slice(0, 10);
}

function getArticleImage(slug: string, image: unknown, filePath: string): string {
    if (image === undefined) {
        return `/articles/${encodeURIComponent(slug)}/cover.png`;
    }
    if (typeof image !== "string") {
        throw new Error(`Article image must be a path in ${filePath}`);
    }
    if (image.startsWith("/") && !image.startsWith("//")) {
        return image;
    }
    if (
        image.startsWith("/") ||
        image.includes("\\") ||
        path.posix.normalize(image).startsWith("../")
    ) {
        throw new Error(`Article image must be within its article directory in ${filePath}`);
    }

    return `/articles/${encodeURIComponent(slug)}/${image
        .split("/")
        .map(encodeURIComponent)
        .join("/")}`;
}

async function readArticle(slug: string, filePath: string): Promise<Article> {
    const source = await readFile(filePath, "utf8");
    const { data, content } = matter(source);

    if (typeof data.title !== "string" || !data.title.trim()) {
        throw new Error(`Missing article title in ${filePath}`);
    }
    if (typeof data.description !== "string" || !data.description.trim()) {
        throw new Error(`Missing article description in ${filePath}`);
    }
    if (data.imageAlt !== undefined && typeof data.imageAlt !== "string") {
        throw new Error(`Article imageAlt must be a string in ${filePath}`);
    }

    return {
        slug,
        title: data.title,
        date: parseArticleDate(data.date, filePath),
        description: data.description,
        image: getArticleImage(slug, data.image ?? undefined, filePath),
        imageAlt: data.imageAlt,
        content,
    };
}

export async function getArticles(): Promise<Article[]> {
    const entries = await readdir(articlesDirectory, { withFileTypes: true });
    const articles = await Promise.all(
        entries
            .filter((entry) => entry.isDirectory())
            .map((entry) =>
                readArticle(
                    entry.name,
                    path.join(articlesDirectory, entry.name, "article.md"),
                ),
            ),
    );

    return articles.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
    const articles = await getArticles();
    return articles.find((article) => article.slug === slug);
}

function withArticleImagePaths(markdown: string, slug: string): string {
    const slugPath = encodeURIComponent(slug);
    return markdown.replace(
        /(!\[[^\]]*\]\()(<[^>]+>|[^\s)]+)(?=[^)]*\))/g,
        (match, prefix: string, destination: string) => {
            const isWrapped = destination.startsWith("<") && destination.endsWith(">");
            const imagePath = isWrapped ? destination.slice(1, -1) : destination;
            if (
                imagePath.startsWith("/") ||
                imagePath.startsWith("#") ||
                /^[a-z][a-z\d+.-]*:/i.test(imagePath)
            ) {
                return match;
            }

            const encodedPath = imagePath
                .replace(/^\.\//, "")
                .split("/")
                .map(encodeURIComponent)
                .join("/");
            return `${prefix}${isWrapped ? `<${`/articles/${slugPath}/${encodedPath}`}>` : `/articles/${slugPath}/${encodedPath}`}`;
        },
    );
}

export async function renderMarkdown(markdown: string, slug: string): Promise<string> {
    const result = await remark()
        .use(html)
        .process(withArticleImagePaths(markdown, slug));
    return result.toString();
}
