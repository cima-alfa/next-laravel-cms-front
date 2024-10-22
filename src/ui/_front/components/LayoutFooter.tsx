import { twMerge } from "tailwind-merge";

export default function Footer({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    return (
        <footer
            className={twMerge(
                "[grid-area:footer] p-2 pb-12 z-0 md:pb-2",
                className
            )}
            {...rest}
        >
            <div className="grid place-content-center max-w-screen-xl mx-auto text-sm font-semibold">
                {children}
            </div>
        </footer>
    );
}
