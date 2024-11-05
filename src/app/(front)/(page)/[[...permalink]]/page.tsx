import { fetchPageByPermalink } from "@/lib/data/pages";
import { notFound } from "next/navigation";

export default async function Page({
    params,
}: {
    params: { permalink?: string };
}) {
    const { permalink } = await params;

    const page = await fetchPageByPermalink(permalink ?? null);

    if (!page) {
        return notFound();
    }

    return (
        <div className="prose prose-light dark:prose-dark prose-pre:whitespace-pre-wrap">
            <h1>{page.title}</h1>

            <pre>{page.text}</pre>
        </div>
    );
}
