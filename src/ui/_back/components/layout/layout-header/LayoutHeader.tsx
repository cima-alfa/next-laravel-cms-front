import { twMerge } from "tailwind-merge";

export default function LayoutHeader({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    return (
        <header
            className={twMerge(
                `
                [grid-area:header] sticky z-10 bottom-6 md:relative md:bottom-auto
                bg-cp-neutral-200 dark:bg-cp-neutral-800
                before:absolute before:top-full before:left-0 before:h-6 before:w-full
                before:bg-cp-neutral-100 before:dark:bg-cp-neutral-900
                md:before:hidden
                `,
                className
            )}
            {...rest}
        >
            {children}
        </header>
    );
}
