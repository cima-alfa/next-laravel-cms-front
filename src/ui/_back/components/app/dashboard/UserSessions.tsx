import dateFormat from "dateformat";
import { Sessions } from "@/lib/data/users";
import { userAgentFromString } from "next/server";
import { link } from "@/lib/router/router";
import Link from "next/link";
import PanelBase from "@/back-ui/components/layout/PanelBase";
import TableContainer from "@/back-ui/components/tables/TableContainer";
import TableHead from "@/back-ui/components/tables/TableHead";
import TableRow from "@/back-ui/components/tables/TableRow";
import TableHeadingCell from "@/back-ui/components/tables/TableHeadingCell";
import TableCell from "@/back-ui/components/tables/TableCell";
import clsx from "clsx";

interface Props {
    sessions: Sessions;
}

export default function UserSessions({ sessions: _sessions }: Readonly<Props>) {
    const sessions = _sessions?.data;

    sessions?.map((session) => {
        const { browser, os, device } = userAgentFromString(
            session.user_agent as string
        );

        session.browser = `${browser.name} ${browser.major}`;
        session.device = `${os.name} ${os.version} - ${
            device.type === "mobile" ? "Mobile" : "Desktop"
        }`;
    });

    return (
        <>
            <PanelBase>
                <h2>User Activity</h2>

                <TableContainer>
                    <TableHead
                        data-start="odd"
                        className="hidden @3xl/main:table-header-group"
                    >
                        <TableRow>
                            <TableHeadingCell>User</TableHeadingCell>
                            <TableHeadingCell className="whitespace-nowrap">
                                Last Activity
                            </TableHeadingCell>
                            <TableHeadingCell>Logged In</TableHeadingCell>
                            <TableHeadingCell>Browser</TableHeadingCell>
                            <TableHeadingCell>Device</TableHeadingCell>
                        </TableRow>
                    </TableHead>
                    <tbody
                        className={clsx(
                            "grid gap-x-4 @xs/main:grid-cols-[min-content_auto] @3xl/main:table-row-group",
                            "[&>tr]:grid [&>tr]:grid-cols-subgrid @xs/main:[&>tr]:col-span-2 [&>tr]:py-1 [&>tr]:whitespace-nowrap [&>tr]:@3xl/main:table-row",
                            "@xs/main:[&>tr>td]:col-span-2 [&>tr>td]:grid [&>tr>td]:grid-cols-subgrid [&>tr>td]:py-1",
                            "[&>tr>td]:before:content-[attr(aria-label)] [&>tr>td]:before:font-semibold",
                            "[&>tr>td]:@3xl/main:table-cell [&>tr>td]:@3xl/main:before:hidden [&>tr>td]:@3xl/main:py-2"
                        )}
                    >
                        {sessions?.map((session, index) => (
                            <TableRow key={index}>
                                <TableCell aria-label="User:">
                                    <Link
                                        href={link("front.cp.users.profile", {
                                            userId: session.user.id,
                                        })}
                                        title={`${session.user.name_display}'s profile`}
                                    >
                                        {session.user.name_display}
                                    </Link>
                                </TableCell>
                                <TableCell aria-label="Last Activity:">
                                    {typeof session.last_activity === "number"
                                        ? dateFormat(
                                              session.last_activity * 1000,
                                              "dd.mm.yyyy HH:MM"
                                          )
                                        : session.last_activity}
                                </TableCell>
                                <TableCell aria-label="Logged In:">
                                    {dateFormat(
                                        session.created_at,
                                        "dd.mm.yyyy HH:MM"
                                    )}
                                </TableCell>
                                <TableCell aria-label="Browser:">
                                    {session.browser as string}
                                </TableCell>
                                <TableCell aria-label="Device:">
                                    {session.device as string}
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </TableContainer>
            </PanelBase>
        </>
    );
}
