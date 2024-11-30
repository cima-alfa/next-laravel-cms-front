import PanelBase from "@/back-ui/components/layout/PanelBase";
import PaginationLinks from "@/back-ui/components/PaginationLinks";
import UserInvite from "@/back-ui/components/app/users/UserInvite";
import UsersIndex from "@/back-ui/components/app/users/UsersIndex";
import { fetchUser, fetchUsers, User } from "@/lib/data/users";
import { link } from "@/lib/router/router";

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
            <h1>Users</h1>
            <div className="grid gap-4 @2xl/main:grid-cols-[1.75fr_1fr] @6xl/main:grid-cols-none @8xl/main:grid-cols-[3.25fr_1fr] items-start">
                <PanelBase>
                    <UsersIndex users={users} currentUser={currentUser} />

                    {users && (
                        <PaginationLinks
                            current={parseInt(paginated ?? "1")}
                            meta={users.meta}
                            pagination={pagination}
                        />
                    )}
                </PanelBase>

                {currentUser.owner && (
                    <UserInvite className="self-start justify-self-start w-full @8xl/main:max-w-none" />
                )}
            </div>
        </>
    );
}
