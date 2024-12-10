"use client";

import { getRouteByUrl, link, RouteName } from "@cms/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface Props extends React.HtmlHTMLAttributes<HTMLAnchorElement> {
    route: RouteName;
    title?: string;
}

export default function PrimaryNavigationLink({
    children,
    className,
    route,
    title = "",
    ...rest
}: Readonly<Props>) {
    const pathname = usePathname();
    const currentRoute = getRouteByUrl(pathname);
    const isCurrent = currentRoute?.name === route ? true : undefined;
    const href = link(route);

    return (
        <Link
            href={href}
            title={title}
            className={twMerge(
                `
                block p-4 py-3 rounded transition-colors
                bg-cp-primary-300 dark:bg-cp-primary-700
                hover:bg-cp-primary-400 dark:hover:bg-cp-primary-600 active:!bg-cp-primary-500
                [&[data-current]]:bg-cp-accent-400 dark:[&[data-current]]:bg-cp-accent-600 active:[&[data-current]]:!bg-cp-accent-500
                text-sm leading-none font-semibold
                `,
                className
            )}
            data-current={isCurrent}
            {...rest}
        >
            {children}
        </Link>
    );
}
