import { readFile } from "node:fs/promises";
import path from "node:path";

const articlesDirectory = path.join(process.cwd(), "content", "articles");
const imageTypes: Record<string, string> = {
    ".avif": "image/avif",
    ".gif": "image/gif",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
};

type ArticleAssetParams = {
    slug: string;
    asset: string[];
};

export async function GET(
    _request: Request,
    { params }: { params: Promise<ArticleAssetParams> },
) {
    const { slug, asset } = await params;
    if (!/^[\p{L}\p{N}_-]+$/u.test(slug) || asset.length === 0) {
        return new Response(null, { status: 404 });
    }

    const articleDirectory = path.resolve(articlesDirectory, slug);
    const assetPath = path.resolve(articleDirectory, ...asset);
    if (!assetPath.startsWith(`${articleDirectory}${path.sep}`)) {
        return new Response(null, { status: 404 });
    }

    const contentType = imageTypes[path.extname(assetPath).toLowerCase()];
    if (!contentType) {
        return new Response(null, { status: 404 });
    }

    try {
        const content = await readFile(assetPath);
        return new Response(content, {
            headers: {
                "Cache-Control": "public, max-age=3600",
                "Content-Type": contentType,
                "X-Content-Type-Options": "nosniff",
            },
        });
    } catch (error) {
        if (error instanceof Error && "code" in error && error.code === "ENOENT") {
            return new Response(null, { status: 404 });
        }
        throw error;
    }
}
