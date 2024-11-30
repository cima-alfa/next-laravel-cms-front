import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { MdAdd, MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { Url } from "url";

export function AddAction({
    children,
    className,
    href,
    ...rest
}: Readonly<AnchorHTMLAttributes<HTMLAnchorElement>>) {
    return (
        <Link
            href={href as unknown as Url}
            className={twMerge(
                "grid place-content-center h-6 aspect-square rounded",
                "bg-cp-success-600 text-cp-neutral-50 dark:bg-cp-success-400 dark:text-cp-neutral-950",
                "hover:bg-cp-success-700 dark:hover:bg-cp-success-300",
                "transition-colors",
                className
            )}
            {...rest}
        >
            <MdAdd aria-hidden={true} />
            <span className="sr-only">{children}</span>
        </Link>
    );
}

export function ViewAction({
    children,
    className,
    href,
    ...rest
}: Readonly<AnchorHTMLAttributes<HTMLAnchorElement>>) {
    return (
        <Link
            href={href as unknown as Url}
            className={twMerge(
                "grid place-content-center h-6 aspect-square rounded",
                "bg-cp-info-600 text-cp-neutral-50 dark:bg-cp-info-400 dark:text-cp-neutral-950",
                "hover:bg-cp-info-700 dark:hover:bg-cp-info-300",
                "transition-colors",
                className
            )}
            {...rest}
        >
            <MdRemoveRedEye aria-hidden={true} />
            <span className="sr-only">{children}</span>
        </Link>
    );
}

export function EditAction({
    children,
    className,
    href,
    ...rest
}: Readonly<AnchorHTMLAttributes<HTMLAnchorElement>>) {
    return (
        <Link
            href={href as unknown as Url}
            className={twMerge(
                "grid place-content-center h-6 aspect-square rounded",
                "bg-cp-warning-600 text-cp-neutral-50 dark:bg-cp-warning-400 dark:text-cp-neutral-950",
                "hover:bg-cp-warning-700 dark:hover:bg-cp-warning-300",
                "transition-colors",
                className
            )}
            {...rest}
        >
            <MdEdit aria-hidden={true} />
            <span className="sr-only">{children}</span>
        </Link>
    );
}

export function DeleteAction({
    children,
    className,
    ...rest
}: Readonly<ButtonHTMLAttributes<HTMLButtonElement>>) {
    return (
        <button
            className={twMerge(
                "grid place-content-center h-6 aspect-square rounded",
                "bg-cp-alert-600 text-cp-neutral-50 dark:bg-cp-alert-400 dark:text-cp-neutral-950",
                "hover:bg-cp-alert-700 dark:hover:bg-cp-alert-300",
                "transition-colors",
                className
            )}
            {...rest}
        >
            <MdDelete aria-hidden={true} />
            <span className="sr-only">{children}</span>
        </button>
    );
}
