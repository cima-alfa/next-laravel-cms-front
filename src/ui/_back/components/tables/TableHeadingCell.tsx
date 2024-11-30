import { twMerge } from "tailwind-merge";

export default function TableHeadingCell({
    children,
    className,
    ...rest
}: Readonly<React.ThHTMLAttributes<HTMLTableCellElement>>) {
    return (
        <th className={twMerge("px-4 py-2", className)} {...rest}>
            {children}
        </th>
    );
}
