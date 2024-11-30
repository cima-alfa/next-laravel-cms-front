import PrimaryNavigationButton from "@/back-ui/components/layout/layout-header/PrimaryNavigationButton";
import PrimaryNavigationLink from "@/back-ui/components/layout/layout-header/PrimaryNavigationLink";
import { fetchUser } from "@/lib/data/users";
import { twMerge } from "tailwind-merge";

export default async function PrimaryNavigation({
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    const user = await fetchUser();

    return (
        <nav
            className={twMerge(
                `
                relative z-50
                grid grid-flow-col gap-5 grid-cols-[auto_1fr] items-center px-4 py-2
                md:sticky md:top-8
                md:grid-flow-row md:gap-2 md:grid-rows-[auto_1fr] md:grid-cols-none
                md:h-[calc(100dvh-32px)] md:w-60 lg:w-72 md:px-2 md:py-4
                md:overflow-y-auto [scrollbar-width:thin]
                `,
                className
            )}
            {...rest}
        >
            <ul
                className="
                md:grid md:gap-2 md:self-start
                "
            >
                <li>
                    <PrimaryNavigationLink
                        route="front.cp.dashboard.index"
                        title="Dashboard"
                    >
                        Dashboard
                    </PrimaryNavigationLink>
                </li>
            </ul>

            <PrimaryNavigationButton
                controls="--cp-primary-navigation"
                className="justify-self-end"
            />

            <div
                id="--cp-primary-navigation"
                className="
                absolute left-0 bottom-full w-full
                grid gap-2 px-4 h-0 overflow-clip
                [&[data-expanded='true']]:h-auto transition-[height]
                bg-cp-neutral-200 dark:bg-cp-neutral-800
                md:relative md:left-auto md:bottom-auto
                md:p-0 md:!h-full md:bg-transparent md:transition-none
                "
                data-expanded="false"
            >
                <ul
                    className="
                    grid gap-2 mt-2 md:self-start md:mt-0
                    "
                >
                    <li>
                        <PrimaryNavigationLink
                            route="front.cp.pages.index"
                            title="Pages"
                        >
                            Pages
                        </PrimaryNavigationLink>
                    </li>

                    <li>
                        <PrimaryNavigationLink
                            route="front.cp.users.index"
                            title="Users"
                        >
                            Users
                        </PrimaryNavigationLink>
                    </li>
                </ul>

                <ul
                    className="
                    grid gap-2 mb-2 md:self-end md:mb-0
                    "
                >
                    {user?.owner && (
                        <li>
                            <PrimaryNavigationLink
                                route="front.cp.settings.index"
                                title="Control Panel Settings"
                            >
                                Settings
                            </PrimaryNavigationLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
