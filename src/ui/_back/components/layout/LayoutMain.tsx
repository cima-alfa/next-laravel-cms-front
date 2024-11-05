import { twMerge } from "tailwind-merge";

export default function LayoutMain({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    return (
        <main
            className={twMerge(
                "[grid-area:main] w-full !max-w-none z-0 p-4 prose prose-light dark:prose-dark",
                className
            )}
            {...rest}
        >
            {children}
        </main>
    );
}
