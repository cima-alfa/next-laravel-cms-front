"use client";

import {
    AddAction,
    DeleteAction,
    EditAction,
    ViewAction,
} from "@/back-ui/components/tables/TableActions";
import TableCell from "@/back-ui/components/tables/TableCell";
import TableContainer from "@/back-ui/components/tables/TableContainer";
import TableFoot from "@/back-ui/components/tables/TableFoot";
import TableHead from "@/back-ui/components/tables/TableHead";
import TableHeadingCell from "@/back-ui/components/tables/TableHeadingCell";
import TableRow from "@/back-ui/components/tables/TableRow";
import { destroyPage } from "@/lib/actions/pages";
import { Page, Pages } from "@/lib/data/pages";
import { link, permalink } from "@/lib/router/router";
import DateTime from "@/ui/components/DateTime";
import clsx from "clsx";
import Link from "next/link";

interface Props extends React.TableHTMLAttributes<HTMLTableElement> {
    pages: Pages;
}

export default function PagesIndex({
    className,
    pages,
    ...rest
}: Readonly<Props>) {
    const handleDeletePage = async (page: Page) => {
        if (
            !confirm(
                `Delete the following page: "${page.title}" ${
                    page.user ? `created by ${page.user?.name_display}` : ""
                }`
            )
        ) {
            return;
        }

        const result = await destroyPage(page.id);

        if (result) {
            alert(result.message);
        }
    };

    return (
        <TableContainer className={className} {...rest}>
            <TableHead data-start="odd">
                <TableRow className="hidden @3xl/main:table-row">
                    <TableHeadingCell>
                        <AddAction
                            href={link("front.cp.pages.create")}
                            title="Create Page"
                        >
                            Create a new page
                        </AddAction>
                    </TableHeadingCell>
                    <TableHeadingCell>Title</TableHeadingCell>
                    <TableHeadingCell>Updated</TableHeadingCell>
                    <TableHeadingCell>Created</TableHeadingCell>
                    <TableHeadingCell>Author</TableHeadingCell>
                    <TableHeadingCell>Actions</TableHeadingCell>
                </TableRow>

                <TableRow className="@3xl/main:hidden">
                    <TableHeadingCell className="relative">
                        <AddAction
                            href={link("front.cp.pages.create")}
                            title="Create Page"
                            className="sticky left-4"
                        >
                            Create a new page
                        </AddAction>
                    </TableHeadingCell>
                </TableRow>
            </TableHead>
            <tbody
                className={clsx(
                    "grid gap-x-4 @xs/main:grid-cols-[min-content_auto] @3xl/main:table-row-group",
                    "[&>tr]:grid [&>tr]:grid-cols-subgrid @xs/main:[&>tr]:col-span-2 [&>tr]:py-1 [&>tr]:@3xl/main:table-row",
                    "@xs/main:[&>tr>td]:col-span-2 [&>tr>td]:grid [&>tr>td]:grid-cols-subgrid [&>tr>td]:py-1",
                    "[&>tr>td]:before:content-[attr(aria-label)] [&>tr>td]:before:font-semibold",
                    "[&>tr>td]:@3xl/main:table-cell [&>tr>td]:@3xl/main:before:hidden [&>tr>td]:@3xl/main:py-2"
                )}
            >
                {pages?.data.map((page, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center">
                            <Link
                                href={link("front.cp.pages.edit", {
                                    pageId: page.id,
                                })}
                                title="Edit Page"
                                className="col-span-2 justify-self-start"
                            >
                                #{pages.meta.from + index}
                            </Link>
                        </TableCell>
                        <TableCell className="w-full" aria-label="Title:">
                            <span className="min-w-56">{page.title}</span>
                        </TableCell>
                        <TableCell
                            className="whitespace-nowrap"
                            aria-label="Updated:"
                        >
                            <DateTime
                                date={page.meta.timestamps.updated_at}
                                formatDisplay="dd.mm.yyyy HH:MM"
                            />
                        </TableCell>
                        <TableCell
                            className="whitespace-nowrap"
                            aria-label="Created:"
                        >
                            <DateTime
                                date={page.meta.timestamps.created_at}
                                formatDisplay="dd.mm.yyyy HH:MM"
                            />
                        </TableCell>
                        <TableCell
                            className="whitespace-nowrap"
                            aria-label="Author:"
                        >
                            {page.user?.name_display ?? "None"}
                        </TableCell>
                        <TableCell
                            className="whitespace-nowrap pr-2"
                            aria-label="Actions:"
                        >
                            <div className="flex gap-2">
                                <ViewAction
                                    href={permalink(page)}
                                    target="_blank"
                                    title="Visit Page"
                                >
                                    Visit page
                                </ViewAction>

                                <EditAction
                                    href={link("front.cp.pages.edit", {
                                        pageId: page.id,
                                    })}
                                    title="Edit Page"
                                >
                                    Edit page
                                </EditAction>

                                <DeleteAction
                                    onClick={() => handleDeletePage(page)}
                                    title="Delete Page"
                                >
                                    Delete page
                                </DeleteAction>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </tbody>
            <TableFoot>
                <tr></tr>
            </TableFoot>
        </TableContainer>
    );
}
