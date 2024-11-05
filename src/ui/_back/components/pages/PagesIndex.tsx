"use client";

import { destroyPage } from "@/lib/actions/pages";
import { Pages } from "@/lib/data/pages";
import { link } from "@/lib/router/router";
import Link from "next/link";

interface Props {
    pages: Pages;
}

export default function PagesIndex({ pages }: Props) {
    const handleDeletePage = async (id: string) => {
        alert((await destroyPage(id)).message);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Text</th>
                    <th colSpan={3}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {pages?.data.map((page, index) => (
                    <tr key={index}>
                        <td>
                            <Link
                                href={link("front.cp.pages.edit", {
                                    id: page.id,
                                })}
                            >
                                {page.title}
                            </Link>
                        </td>
                        <td>{page.text.substring(0, 50) + "..."}</td>
                        <td>
                            <Link
                                href={link("front.page.permalink", {
                                    permalink: page.permalink,
                                })}
                                target="_blank"
                            >
                                Visit
                            </Link>
                        </td>
                        <td>
                            <Link
                                href={link("front.cp.pages.edit", {
                                    id: page.id,
                                })}
                            >
                                Edit
                            </Link>
                        </td>
                        <td>
                            <button onClick={() => handleDeletePage(page.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
