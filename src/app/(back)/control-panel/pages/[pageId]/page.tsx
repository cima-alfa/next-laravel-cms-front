import PageForm from "@/back-ui/components/app/pages/PageForm";
import { fetchPageById } from "@/lib/data/pages";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ pageId: string }>;
}

export default async function Page({ params }: Readonly<Props>) {
    const { pageId } = await params;

    const page = await fetchPageById(pageId);

    if (!page) {
        return notFound();
    }

    return (
        <>
            <h1>Edit Page</h1>

            <PageForm mode="edit" page={page} />
        </>
    );
}
