import { PagesMeta } from "@/lib/data/pages";
import clsx from "clsx";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
    pagination: {
        number: number;
        link: string;
    }[];
    meta: PagesMeta;
    current: number;
}

export default function PaginationLinks({
    className,
    pagination,
    meta,
    current,
    ...rest
}: Readonly<Props>) {
    return (
        <div
            className={twMerge(
                "flex gap-5 justify-between items-center not-prose leading-none",
                className
            )}
            {...rest}
        >
            <ul className="flex flex-wrap justify-center gap-2">
                {pagination.map((page, index) => (
                    <li key={index}>
                        <Link
                            href={page.link}
                            className={clsx(
                                "grid content-center h-6 aspect-square rounded",
                                "bg-cp-impartial-600 text-cp-neutral-50 dark:bg-cp-impartial-400 dark:text-cp-neutral-950",
                                "hover:bg-cp-impartial-700 dark:hover:bg-cp-impartial-300",
                                "[&[aria-current='page']]:bg-cp-action-secondary-600 [&[aria-current='page']]:dark:bg-cp-action-secondary-400",
                                "font-semibold text-sm text-center",
                                "transition-colors"
                            )}
                            title={`Page ${page.number}`}
                            aria-current={
                                current === page.number ? "page" : false
                            }
                        >
                            {page.number}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="whitespace-nowrap text-sm font-semibold">
                {meta.to} of {meta.total}
            </div>
        </div>
    );
}
