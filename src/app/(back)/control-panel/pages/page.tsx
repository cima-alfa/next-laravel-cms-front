import PagesIndex from "@/back-ui/components/pages/PagesIndex";
import { fetchPages } from "@/lib/data/pages";
import { link } from "@/lib/router/router";
import Link from "next/link";

export default async function Page({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const { page: paginated } = await searchParams;

    const pages = await fetchPages(paginated);

    const pagination = [
        {
            number: 1,
            link: link("front.cp.pages.index"),
        },
    ];

    if (pages) {
        for (
            let pageNumber = 2;
            pageNumber <= pages?.meta.last_page;
            pageNumber++
        ) {
            pagination.push({
                number: pageNumber,
                link: link("front.cp.pages.index", {
                    page: pageNumber,
                }),
            });
        }
    }

    return (
        <>
            <h1>Page Listing</h1>

            <PagesIndex pages={pages} />

            <ul>
                {pagination.map((page, index) => (
                    <li key={index}>
                        <Link href={page.link}>{page.number}</Link>
                    </li>
                ))}
            </ul>

            <div>
                {pages?.meta.to} of {pages?.meta.total}
            </div>

            <Link href={link("front.cp.pages.create")}>Create Page</Link>
        </>
    );
}
