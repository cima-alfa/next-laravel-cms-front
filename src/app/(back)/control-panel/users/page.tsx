import UserInvite from "@/back-ui/components/users/UserInvite";
import UsersIndex from "@/back-ui/components/users/UsersIndex";
import { fetchUser, fetchUsers, User } from "@/lib/data/users";
import { link } from "@/lib/router/router";
import Link from "next/link";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page: paginated } = await searchParams;

    const users = await fetchUsers(paginated);
    const currentUser = (await fetchUser()) as User;

    const pagination = [
        {
            number: 1,
            link: link("front.cp.users.index"),
        },
    ];

    if (users) {
        for (
            let pageNumber = 2;
            pageNumber <= users?.meta.last_page;
            pageNumber++
        ) {
            pagination.push({
                number: pageNumber,
                link: link("front.cp.users.index", {
                    page: pageNumber,
                }),
            });
        }
    }

    return (
        <>
            <h1>User Listing</h1>

            <UsersIndex users={users} currentUser={currentUser} />

            <ul>
                {pagination.map((page, index) => (
                    <li key={index}>
                        <Link href={page.link}>{page.number}</Link>
                    </li>
                ))}
            </ul>

            <div>
                {users?.meta.to} of {users?.meta.total}
            </div>

            <UserInvite />
        </>
    );
}
