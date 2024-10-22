import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props extends React.HtmlHTMLAttributes<HTMLAnchorElement> {
    href: string;
    title?: string;
}

export default function PrimaryNavigationLink({
    children,
    className,
    href,
    title = "",
    ...rest
}: Readonly<Props>) {
    return (
        <Link
            href={href}
            title={title}
            className={twMerge(
                `
                block p-4 py-3 leading-none rounded transition-colors
                bg-gray-700 dark:bg-gray-300
                hover:bg-indigo-300 hover:text-gray-950 dark:hover:bg-indigo-700 dark:hover:text-gray-50
                `,
                className
            )}
            {...rest}
        >
            {children}
        </Link>
    );
}
