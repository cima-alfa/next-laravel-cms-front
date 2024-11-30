import { twMerge } from "tailwind-merge";

export default function PanelBase({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    return (
        <section
            className={twMerge(
                `p-2 sm:p-4 min-w-0 bg-cp-neutral-500 bg-opacity-10 rounded-lg prose prose-light dark:prose-dark`,
                className
            )}
            {...rest}
        >
            {children}
        </section>
    );
}
