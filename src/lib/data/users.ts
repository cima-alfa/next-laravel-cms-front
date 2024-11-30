"use server";

import { linkApi } from "@/lib/router/router";
import { fetchApi } from "@/lib/utils/server";
import { simulateDelay } from "@/lib/utils/server";

export type User = {
    id: string;
    username: string;
    email: string;
    owner: boolean;
    name_display: string;
    name_display_plain: string;
    name_first: string | null;
    name_second: string | null;
    name_last: string | null;
    phone: string | null;
    phone_prefix: string | null;
    phone_number: string | null;
    phone_number_plain: string | null;
    meta: {
        locale: string;
        timestamps: {
            email_verified_at: string | null;
            created_at: string;
            updated_at: string;
        };
    };
    [key: string]: unknown;
};

export type Users = {
    data: User[];
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

export type Session = {
    ip_address: string | null;
    user_agent: string | null;
    created_at: string;
    last_activity: number | string;
    user: User;
    [key: string]: unknown;
};

export type Sessions = {
    data: Session[];
} | null;

export const fetchAuthenticated = async (): Promise<boolean> => {
    return await fetchApi(linkApi("api.users.is-authenticated"), {
        method: "HEAD",
    }).then((response) => response.ok);
};

export const fetchUser = async (user?: string): Promise<User | null> => {
    const link = user
        ? linkApi("api.users.get", { user })
        : linkApi("api.users.authenticated");

    return await fetchApi(link).then(async (response) => {
        return (await response.json())?.data ?? null;
    });
};

export const fetchUserSessions = async (user?: string): Promise<Sessions> => {
    const link = user
        ? linkApi("api.users.sessions.get", { user })
        : linkApi("api.users.sessions.index");

    return await fetchApi(link).then(async (response) => {
        return (await response.json()) ?? null;
    });
};

export const fetchUsers = async (page = "1"): Promise<Users> => {
    await simulateDelay(1);

    const params: { [key: string]: unknown } = {
        "page[number]": page,
    };

    return await fetchApi(linkApi("api.users.index", params)).then(
        async (response) => {
            return (await response.json()) ?? null;
        }
    );
};
