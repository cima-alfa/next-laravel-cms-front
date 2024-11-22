import dateFormat from "dateformat";
import { Sessions } from "@/lib/data/users";
import { userAgentFromString } from "next/server";
import { link } from "@/lib/router/router";
import Link from "next/link";

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
            <h2>User Activity</h2>

            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Last Activity</th>
                        <th>Logged In</th>
                        <th>Browser</th>
                        <th>Device</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions?.map((session, index) => (
                        <tr key={index}>
                            <td>
                                <Link
                                    href={link("front.cp.users.profile", {
                                        userId: session.user.id,
                                    })}
                                    title={`${session.user.name_display}'s profile`}
                                >
                                    {session.user.name_display}
                                </Link>
                            </td>
                            <td>
                                {typeof session.last_activity === "number"
                                    ? dateFormat(
                                          session.last_activity * 1000,
                                          "dd.mm.yyyy HH:MM"
                                      )
                                    : session.last_activity}
                            </td>
                            <td>
                                {dateFormat(
                                    session.created_at,
                                    "dd.mm.yyyy HH:MM"
                                )}
                            </td>
                            <td>{session.browser as string}</td>
                            <td>{session.device as string}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
