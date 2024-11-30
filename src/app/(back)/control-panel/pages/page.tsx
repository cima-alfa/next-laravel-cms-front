import PanelBase from "@/back-ui/components/layout/PanelBase";
import PagesIndex from "@/back-ui/components/app/pages/PagesIndex";
import PaginationLinks from "@/back-ui/components/PaginationLinks";
import { fetchPages } from "@/lib/data/pages";
import { link } from "@/lib/router/router";

interface Props {
    searchParams: Promise<{ page?: string }>;
}

export default async function Page({ searchParams }: Readonly<Props>) {
    const { page: paginated } = await searchParams;

    const pages = await fetchPages(paginated, true);

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
            <h1>Pages</h1>
            <PanelBase>
                <PagesIndex pages={pages} />

                {pages && (
                    <PaginationLinks
                        current={parseInt(paginated ?? "1")}
                        meta={pages.meta}
                        pagination={pagination}
                    />
                )}
            </PanelBase>
        </>
    );
}
