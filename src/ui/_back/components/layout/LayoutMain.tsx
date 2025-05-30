import { twMerge } from "tailwind-merge";

export default function LayoutMain({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    return (
        <main
            className={twMerge(
                "@container/main [grid-area:main] z-0 px-2 py-4 sm:px-4 prose prose-light dark:prose-dark",
                className
            )}
            {...rest}
        >
            {children}
        </main>
    );
}
