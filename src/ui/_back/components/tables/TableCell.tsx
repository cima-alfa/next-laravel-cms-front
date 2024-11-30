import { twMerge } from "tailwind-merge";

export default function TableCell({
    children,
    className,
    ...rest
}: Readonly<React.TdHTMLAttributes<HTMLTableCellElement>>) {
    return (
        <td className={twMerge("px-4 py-2", className)} {...rest}>
            {children}
        </td>
    );
}
