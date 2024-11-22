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
                "outline outline-1 !outline-offset-0 !ring-0 focus:outline-2 focus:outline-cp-action-primary-500",
                "bg-cp-neutral-300 outline-cp-neutral-400",
                "dark:bg-cp-neutral-700 dark:outline-cp-neutral-600",
                "[&[list]::-webkit-calendar-picker-indicator]:!hidden [&[list]::-webkit-list-button]:!hidden",
                "group-[[inert]]:bg-cp-neutral-300 dark:group-[[inert]]:bg-cp-neutral-800 group-[[inert]]:outline-cp-neutral-200 dark:group-[[inert]]:outline-cp-neutral-700",
                className
            )}
            type={type}
            {...rest}
        />
    );
}
