import { twMerge } from "tailwind-merge";

export default function TableFoot({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLTableSectionElement>>) {
    return (
        <tfoot
            className={twMerge(
                "border-cp-neutral-400 dark:border-cp-neutral-600",
                className
            )}
            {...rest}
        >
            {children}
        </tfoot>
    );
}
