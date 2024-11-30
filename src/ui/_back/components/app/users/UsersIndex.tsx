"use client";

import {
    DeleteAction,
    ViewAction,
} from "@/back-ui/components/tables/TableActions";
import TableCell from "@/back-ui/components/tables/TableCell";
import TableContainer from "@/back-ui/components/tables/TableContainer";
import TableHead from "@/back-ui/components/tables/TableHead";
import TableHeadingCell from "@/back-ui/components/tables/TableHeadingCell";
import TableRow from "@/back-ui/components/tables/TableRow";
import { destroyUser } from "@/lib/actions/users";
import { User, Users } from "@/lib/data/users";
import { link } from "@/lib/router/router";
import DateTime from "@/ui/components/DateTime";
import clsx from "clsx";
import Link from "next/link";

interface Props extends React.TableHTMLAttributes<HTMLTableElement> {
    users: Users;
    currentUser: User;
}

export default function UsersIndex({
    className,
    users,
    currentUser,
    ...rest
}: Readonly<Props>) {
    const handleDeleteUser = async (user: User) => {
        if (!confirm(`Delete the following user: "${user.name_display}"`)) {
            return;
        }

        const result = await destroyUser(user.id);

        if (result) {
            alert(result.message);
        }
    };

    return (
        <TableContainer className={className} {...rest}>
            <TableHead
                className="hidden @6xl/main:table-header-group"
                data-start="odd"
            >
                <TableRow>
                    <TableHeadingCell>#</TableHeadingCell>
                    <TableHeadingCell>Name</TableHeadingCell>
                    <TableHeadingCell>E-Mail</TableHeadingCell>
                    <TableHeadingCell>Phone Number</TableHeadingCell>
                    <TableHeadingCell>Verified</TableHeadingCell>
                    <TableHeadingCell>Updated</TableHeadingCell>
                    <TableHeadingCell>Created</TableHeadingCell>
                    <TableHeadingCell>Actions</TableHeadingCell>
                </TableRow>
            </TableHead>
            <tbody
                className={clsx(
                    "grid gap-x-4 @xs/main:grid-cols-[min-content_auto] @6xl/main:table-row-group",
                    "[&>tr]:grid [&>tr]:grid-cols-subgrid @xs/main:[&>tr]:col-span-2 [&>tr]:py-1 [&>tr]:whitespace-nowrap [&>tr]:@6xl/main:table-row",
                    "@xs/main:[&>tr>td]:col-span-2 [&>tr>td]:grid [&>tr>td]:grid-cols-subgrid [&>tr>td]:py-1",
                    "[&>tr>td]:before:content-[attr(aria-label)] [&>tr>td]:before:font-semibold",
                    "[&>tr>td]:@6xl/main:table-cell [&>tr>td]:@6xl/main:before:hidden [&>tr>td]:@6xl/main:py-2"
                )}
            >
                {users?.data.map((user, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Link
                                href={link("front.cp.users.profile", {
                                    userId: user.id,
                                })}
                                title={`${user.name_display}'s profile`}
                                className="col-span-2 justify-self-start"
                            >
                                #{users.meta.from + index}
                            </Link>
                        </TableCell>
                        <TableCell aria-label="Name:">
                            {user.name_display}
                        </TableCell>
                        <TableCell aria-label="E-Mail:">
                            <a
                                href={`mailto:${user.email}`}
                                title={`${user.name_display}'s e-mail`}
                                target="_blank"
                                className="!text-inherit"
                            >
                                {user.email}
                            </a>
                        </TableCell>
                        <TableCell
                            className="@6xl/main:w-full"
                            aria-label="Phone Number:"
                        >
                            {user.phone_number ? (
                                <a
                                    href={`tel:${user.phone_number_plain}`}
                                    title={`${user.name_display}'s phone number`}
                                    target="_blank"
                                    className="!text-inherit"
                                >
                                    {user.phone_number}
                                </a>
                            ) : (
                                "---"
                            )}
                        </TableCell>
                        <TableCell aria-label="Verified:">
                            {user.meta.timestamps.email_verified_at ? (
                                <DateTime
                                    date={
                                        user.meta.timestamps.email_verified_at
                                    }
                                    formatDisplay="dd.mm.yyyy HH:MM"
                                />
                            ) : (
                                "No"
                            )}
                        </TableCell>
                        <TableCell aria-label="Updated:">
                            <DateTime
                                date={user.meta.timestamps.updated_at}
                                formatDisplay="dd.mm.yyyy HH:MM"
                            />
                        </TableCell>
                        <TableCell aria-label="Created:">
                            <DateTime
                                date={user.meta.timestamps.created_at}
                                formatDisplay="dd.mm.yyyy HH:MM"
                            />
                        </TableCell>
                        <TableCell aria-label="Actions:">
                            <div className="flex gap-2">
                                <ViewAction
                                    href={link("front.cp.users.profile", {
                                        userId: user.id,
                                    })}
                                    title={`${user.name_display}'s profile`}
                                >
                                    View profile
                                </ViewAction>

                                {currentUser.id !== user.id &&
                                    currentUser.owner && (
                                        <DeleteAction
                                            onClick={() =>
                                                handleDeleteUser(user)
                                            }
                                        >
                                            Delete user
                                        </DeleteAction>
                                    )}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </tbody>
        </TableContainer>
    );
}
