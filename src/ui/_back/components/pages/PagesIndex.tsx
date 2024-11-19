"use client";

import { destroyPage } from "@/lib/actions/pages";
import { Page, Pages } from "@/lib/data/pages";
import { link } from "@/lib/router/router";
import DateTime from "@/ui/components/DateTime";
import Link from "next/link";

interface Props {
    pages: Pages;
}

export default function PagesIndex({ pages }: Readonly<Props>) {
    const handleDeletePage = async (page: Page) => {
        if (
            !confirm(
                `Delete the following page: "${page.title}" created by ${page.user?.name_display}`
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
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Text</th>
                    <th>Last Updated</th>
                    <th>Created</th>
                    <th>Author</th>
                    <th colSpan={3}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {pages?.data.map((page, index) => (
                    <tr key={index}>
                        <td>
                            <Link
                                href={link("front.cp.pages.edit", {
                                    pageId: page.id,
                                })}
                            >
                                {page.title}
                            </Link>
                        </td>
                        <td className="w-full">
                            {page.text.substring(0, 50) + "..."}
                        </td>
                        <td className="whitespace-nowrap">
                            <DateTime
                                date={page.meta.timestamps.updated_at}
                                formatDisplay="dd.mm.yyyy HH:MM"
                            />
                        </td>
                        <td className="whitespace-nowrap">
                            <DateTime
                                date={page.meta.timestamps.created_at}
                                formatDisplay="dd.mm.yyyy HH:MM"
                            />
                        </td>
                        <td className="whitespace-nowrap">
                            {page.user?.name_display}
                        </td>
                        <td className="whitespace-nowrap">
                            <Link
                                href={link("front.page.permalink", {
                                    permalink: page.meta.permalink,
                                })}
                                target="_blank"
                            >
                                Visit
                            </Link>
                        </td>
                        <td className="whitespace-nowrap">
                            <Link
                                href={link("front.cp.pages.edit", {
                                    pageId: page.id,
                                })}
                            >
                                Edit
                            </Link>
                        </td>
                        <td className="whitespace-nowrap">
                            <button onClick={() => handleDeletePage(page)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
