import { fetchPageByPermalink } from "@/lib/data/pages";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ permalink?: string }>;
}

export default async function Page({ params }: Readonly<Props>) {
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
