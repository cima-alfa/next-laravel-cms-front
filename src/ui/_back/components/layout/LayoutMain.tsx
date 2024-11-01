import { twMerge } from "tailwind-merge";

export default function LayoutMain({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    return (
        <main
            className={twMerge("[grid-area:main] w-full z-0 p-4", className)}
            {...rest}
        >
            {children}
        </main>
    );
}
