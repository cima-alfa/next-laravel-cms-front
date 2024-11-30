import { twMerge } from "tailwind-merge";

export default function InputTextField({
    className,
    type = "text",
    ...rest
}: Readonly<React.InputHTMLAttributes<HTMLInputElement>>) {
    return (
        <input
            className={twMerge(
                "w-full px-2 py-1 border-none rounded",
                "outline outline-1 !outline-offset-0 !ring-0 focus:outline-2 focus:outline-indigo-500",
                "bg-neutral-300 outline-neutral-400",
                "dark:bg-neutral-700 dark:outline-neutral-600",
                "[&[list]::-webkit-calendar-picker-indicator]:!hidden [&[list]::-webkit-list-button]:!hidden",
                "group-[[inert]]:bg-neutral-300 dark:group-[[inert]]:bg-neutral-800 group-[[inert]]:outline-neutral-200 dark:group-[[inert]]:outline-neutral-700",
                className
            )}
            type={type}
            {...rest}
        />
    );
}
