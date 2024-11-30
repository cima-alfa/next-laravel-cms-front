import { fetchPageByPermalink } from "@/lib/data/pages";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

interface Props {
    params: Promise<{ permalink?: string[] }>;
}

export async function generateMetadata({
    params,
}: Readonly<Props>): Promise<Metadata> {
    const { permalink } = await params;

    const page = await fetchPageByPermalink(permalink?.join("/") ?? null);

    return {
        title: page?.meta.title,
        description: page?.meta.description,
        robots: page?.meta.robots,
    };
}

export default async function Page({ params }: Readonly<Props>) {
    const { permalink } = await params;

    const page = await fetchPageByPermalink(permalink?.join("/") ?? null);

    if (!page || !page.meta.published) {
        return notFound();
    }

    return (
        <div className="prose prose-light dark:prose-dark">
            <h1>{page.title}</h1>

            <Markdown>{page.text}</Markdown>
        </div>
    );
}
