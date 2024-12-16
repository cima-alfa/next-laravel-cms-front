"use server";

import { User } from "@/lib/data/users";
import { linkApi } from "@cms/router";
import { apiData } from "@cms/fetch";
import { simulateDelay } from "@cms/fetch";
import { SimpleObject } from "@cms/helpers";

export type Page = SimpleObject & {
    id: string;
    title: string;
    text: string;
    user?: User | null;
    meta: {
        frontpage: boolean;
        published: boolean;
        permalink: string;
        timestamps: {
            created_at: string;
            updated_at: string;
        };
        title: string;
        description: string;
        robots: string;
        sitemap_include: boolean;
        sitemap_prio: string;
        sitemap_change_freq: string;
    };
};

export type PagesMeta = {
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

export type Pages = {
    data: Page[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: PagesMeta;
} | null;

export const fetchPages = async (
    page = "1",
    withUser = false
): Promise<Pages> => {
    await simulateDelay(1);

    const params: SimpleObject = {};

    if (page === "all") {
        params.all = null;
    } else {
        params["page[number]"] = page;
    }

    if (withUser) {
        params.include = "user";
    }

    return await apiData(linkApi("api.pages.index", params)).then(
        async (response) => {
            return (await response.json()) ?? null;
        }
    );
};

export const fetchPageById = async (id: string): Promise<Page | null> => {
    return await apiData(linkApi("api.pages.get", { id })).then(
        async (response) => {
            return (await response.json())?.data ?? null;
        }
    );
};

export const fetchPageByPermalink = async (
    page: string | null
): Promise<Page | null> => {
    return await apiData(linkApi("api.pages.permalink", { page })).then(
        async (response) => {
            const result = await response.json();

            return result?.data ?? null;
        }
    );
};

export const fetchSitemap = async (): Promise<Pages> => {
    return await apiData(linkApi("api.pages.sitemap")).then(
        async (response) => {
            return (await response.json()) ?? null;
        }
    );
};
