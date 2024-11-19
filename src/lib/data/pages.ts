"use server";

import { User } from "@/lib/data/auth";
import { link, linkApi } from "@/lib/router/router";
import { fetchApi } from "@/lib/utils/server";
import { simulateDelay } from "@/lib/utils/server";
import { redirect, RedirectType } from "next/navigation";

export type Page = {
    id: string;
    title: string;
    text: string;
    user?: User | null;
    meta: {
        permalink: string;
        timestamps: {
            created_at: string;
            updated_at: string;
        };
    };
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

export const fetchPages = async (
    page = "1",
    withUser = false
): Promise<Pages> => {
    await simulateDelay(1);

    const params: { [key: string]: unknown } = {
        "page[number]": page,
    };

    if (withUser) {
        params.include = "user";
    }

    return await fetchApi(linkApi("api.pages.index", params)).then(
        async (response) => {
            return (await response.json()) ?? null;
        }
    );
};

export const fetchPageById = async (id: string): Promise<Page | null> => {
    return await fetchApi(linkApi("api.pages.get", { id })).then(
        async (response) => {
            return (await response.json())?.data ?? null;
        }
    );
};

export const fetchPageByPermalink = async (
    page: string | null
): Promise<Page | null> => {
    return await fetchApi(linkApi("api.pages.permalink", { page })).then(
        async (response) => {
            const result = await response.json();

            if (result?.redirect) {
                redirect(link(result.redirect.route), RedirectType.replace);
            }

            return result?.data ?? null;
        }
    );
};
