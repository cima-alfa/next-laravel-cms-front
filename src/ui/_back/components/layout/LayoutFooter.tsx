import { twMerge } from "tailwind-merge";

export default function LayoutFooter({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    return (
        <footer
            className={twMerge("[grid-area:footer] p-4 z-0", className)}
            {...rest}
        >
            <div
                className="
                grid content-center
                text-xs font-semibold text-cp-neutral-700 dark:text-cp-neutral-300
                "
            >
                {children}
            </div>
        </footer>
    );
}
