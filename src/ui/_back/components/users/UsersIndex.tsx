"use client";

import { destroyUser } from "@/lib/actions/auth";
import { User, Users } from "@/lib/data/auth";
import { link } from "@/lib/router/router";
import DateTime from "@/ui/components/DateTime";
import Link from "next/link";

interface Props {
    users: Users;
    currentUser: User;
}

export default function UsersIndex({ users, currentUser }: Readonly<Props>) {
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
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>E-Mail</th>
                    <th>Phone Number</th>
                    <th>Verified</th>
                    <th>Updated</th>
                    <th>Created</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users?.data.map((user, index) => (
                    <tr key={index}>
                        <td className="whitespace-nowrap">
                            <Link
                                href={link("front.cp.users.profile", {
                                    userId: user.id,
                                })}
                                title={`${user.name_display}'s profile`}
                            >
                                {user.name_display}
                            </Link>
                        </td>
                        <td className="whitespace-nowrap">
                            <a
                                href={`mailto:${user.email}`}
                                title={`${user.name_display}'s e-mail`}
                                target="_blank"
                            >
                                {user.email}
                            </a>
                        </td>
                        <td className="whitespace-nowrap">
                            {user.phone_number ? (
                                <a
                                    href={`tel:${user.phone_number_plain}`}
                                    title={`${user.name_display}'s phone number`}
                                    target="_blank"
                                >
                                    {user.phone_number}
                                </a>
                            ) : (
                                "---"
                            )}
                        </td>
                        <td className="whitespace-nowrap">
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
                        </td>
                        <td className="whitespace-nowrap">
                            <DateTime
                                date={user.meta.timestamps.updated_at}
                                formatDisplay="dd.mm.yyyy HH:MM"
                            />
                        </td>
                        <td className="whitespace-nowrap">
                            <DateTime
                                date={user.meta.timestamps.created_at}
                                formatDisplay="dd.mm.yyyy HH:MM"
                            />
                        </td>
                        <td className="whitespace-nowrap">
                            <Link
                                href={link("front.cp.users.profile", {
                                    userId: user.id,
                                })}
                                title={`${user.name_display}'s profile`}
                            >
                                Profile
                            </Link>
                        </td>
                        <td className="whitespace-nowrap">
                            {currentUser.id !== user.id && (
                                <button onClick={() => handleDeleteUser(user)}>
                                    Delete
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
