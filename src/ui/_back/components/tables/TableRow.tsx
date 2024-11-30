import { twMerge } from "tailwind-merge";

export default function TableRow({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLTableRowElement>>) {
    return (
        <tr
            className={twMerge(
                "border-none border-0 bg-cp-neutral-300 even:bg-opacity-30 dark:bg-cp-neutral-700",
                "[[data-start='odd']>&]:odd:bg-opacity-30 [[data-start='odd']>&]:even:bg-opacity-100",
                className
            )}
            {...rest}
        >
            {children}
        </tr>
    );
}
