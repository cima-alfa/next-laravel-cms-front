import PageForm from "@/back-ui/components/pages/PageForm";
import { fetchPageById } from "@/lib/data/pages";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { pageId: string } }) {
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
