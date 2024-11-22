import { twMerge } from "tailwind-merge";

export default function InputLabel({
    children,
    className,
    ...rest
}: Readonly<React.LabelHTMLAttributes<HTMLLabelElement>>) {
    return (
        <label
            className={twMerge("mb-2 block text-sm font-semibold", className)}
            {...rest}
        >
            {children}
        </label>
    );
}
