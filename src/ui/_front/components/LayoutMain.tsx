import { twMerge } from "tailwind-merge";

export default function Main({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    return (
        <main
            className={twMerge(
                `
                [grid-area:main] justify-self-center w-full max-w-screen-xl px-6 py-4 z-0
                bg-gray-500 bg-opacity-5 rounded-lg
                `,
                className
            )}
            {...rest}
        >
            {children}
        </main>
    );
}
