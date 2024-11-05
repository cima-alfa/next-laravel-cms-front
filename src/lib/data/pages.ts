"use server";

import { linkApi } from "@/lib/router/router";
import { fetchApi } from "@/lib/utils/fetch";

export type Page = {
    id: string;
    title: string;
    text: string;
    [key: string]: unknown;
};

export type Pages = {
    data: Page[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        to: number;
        total: number;
        last_page: number;
        per_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
} | null;

export const fetchPages = async (page?: string): Promise<Pages> => {
    return await fetchApi(
        linkApi("api.pages.index", { "page[number]": page ?? "1" })
    ).then(async (response) => {
        return (await response.json()) ?? null;
    });
};

export const fetchPageById = async (id: string): Promise<Page | null> => {
    return await fetchApi(linkApi("api.pages.get", { id: id })).then(
        async (response) => {
            return (await response.json())?.data ?? null;
        }
    );
};
