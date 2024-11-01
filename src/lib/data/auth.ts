"use server";

import { linkApi } from "@/lib/router/router";
import { fetchApi } from "@/lib/utils/fetch";

export type User = {
    id: string;
    username: string;
    email: string;
    emailVerifiedAt: string | null;
    createdAt: string;
    updatedAt: string;
    nameDisplay: string;
    nameFirst: string | null;
    nameSecond: string | null;
    nameLast: string | null;
    phone: string | null;
    phonePrefix: string | null;
    phoneNumber: string | null;
    locale: string;
    [key: string]: unknown;
} | null;

export const fetchAuthenticated = async (): Promise<boolean> => {
    return await fetchApi(linkApi("api.authenticated")).then(
        async (response) => {
            if (!response.ok) {
                return false;
            }

            return (await response.json())?.data.authenticated;
        }
    );
};

export const fetchUser = async (): Promise<User> => {
    return await fetchApi(linkApi("api.user")).then(async (response) => {
        return (await response.json())?.data ?? null;
    });
};
