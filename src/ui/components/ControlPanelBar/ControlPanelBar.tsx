"use client";

import { logout } from "@/lib/actions/auth";
import { fetchUser, User } from "@/lib/data/auth";
import { link } from "@/lib/router/router";
import ExpandButton from "@/ui/components/ExpandButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin-ext"],
});

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
    initialUser: User;
}

export default function ControlPanelBar({
    className,
    initialUser,
}: Readonly<Props>) {
    const [user, setUser] = useState<User>(initialUser);
    const pathname = usePathname();

    const logoutWithRedirect = logout.bind(null, pathname);

    useEffect(() => {
        const getUser = async () => {
            setUser(await fetchUser());
        };

        if (user !== null) {
            getUser();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <>
            {user && (
                <section
                    className={twMerge(
                        `
                        relative z-[999]
                        flex justify-between w-full h-8
                        bg-cp-neutral-950 text-cp-neutral-50
                        text-sm leading-none
                        `,
                        inter.className,
                        className
                    )}
                    aria-label="Control Panel Bar"
                >
                    <div className="flex items-center h-full">
                        <Link
                            href={link("front.cp.dashboard.index")}
                            title="Control Panel"
                            className="
                            grid content-center h-full px-3
                            hover:bg-cp-neutral-800
                            font-semibold
                            transition-colors
                            "
                        >
                            CP
                        </Link>
                        <Link
                            href={link("front.page.permalink")}
                            title="Front Page"
                            className="
                            grid content-center h-full px-5
                            hover:bg-cp-neutral-800
                            transition-colors
                            "
                        >
                            Front Page
                        </Link>
                    </div>

                    <div className="relative flex items-center h-full">
                        <ExpandButton
                            controls="--cp-bar-user-panel"
                            className="
                            h-full px-5
                            hover:bg-cp-neutral-800
                            transition-colors
                            "
                        >
                            {user.nameDisplay}
                        </ExpandButton>

                        <div
                            id="--cp-bar-user-panel"
                            className="
                            absolute top-full right-0 min-w-full
                            bg-cp-neutral-950 text-center
                            [&[data-expanded='false']]:hidden
                            "
                            data-expanded="false"
                        >
                            <button
                                className="
                                block w-full min-w-28 py-2 px-3
                                hover:bg-cp-neutral-800
                                transition-colors
                                "
                                onClick={logoutWithRedirect}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
