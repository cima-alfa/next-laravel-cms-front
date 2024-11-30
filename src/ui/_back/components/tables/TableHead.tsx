import { twMerge } from "tailwind-merge";

export default function TableHead({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLTableSectionElement>>) {
    return (
        <thead
            className={twMerge(
                "border-cp-neutral-400 dark:border-cp-neutral-600",
                className
            )}
            {...rest}
        >
            {children}
        </thead>
    );
}
