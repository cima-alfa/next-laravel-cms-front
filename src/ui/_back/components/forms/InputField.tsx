"use client";

import { useId } from "react";
import slugify from "slugify";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type?: string;
    name?: string;
    state?: {
        [key: string]: unknown;
        errors?: { [key: string]: string[] };
    } | null;
    datalist?: string[];
}

export default function InputField({
    className,
    label,
    type = "text",
    name,
    state,
    datalist,
    ...rest
}: Readonly<Props>) {
    const _name =
        name ??
        slugify(label, {
            lower: true,
            strict: true,
        });

    const id = useId();

    return (
        <>
            <div className={className}>
                <label
                    htmlFor={id}
                    className="mb-2 block text-sm font-semibold"
                >
                    {label}
                </label>
                <div>
                    <input
                        id={id}
                        name={_name}
                        type={type}
                        aria-describedby={`${id}-error`}
                        list={datalist ? `${id}-datalist` : undefined}
                        className="
                        w-full px-2 py-1 border-none rounded
                        outline outline-1 !outline-offset-0 !ring-0 focus:outline-2 focus:outline-cp-action-primary-500
                        bg-cp-neutral-300 outline-cp-neutral-400
                        dark:bg-cp-neutral-700 dark:outline-cp-neutral-600
                        [&[list]::-webkit-calendar-picker-indicator]:!hidden [&[list]::-webkit-list-button]:!hidden
                        group-[[inert]]:bg-cp-neutral-300 dark:group-[[inert]]:bg-cp-neutral-800 group-[[inert]]:outline-cp-neutral-200 dark:group-[[inert]]:outline-cp-neutral-700
                        "
                        {...rest}
                    />
                    <div
                        id={`${id}-error`}
                        aria-live="polite"
                        aria-atomic="true"
                        className="empty:hidden"
                    >
                        {state?.errors &&
                            state.errors[_name] &&
                            state.errors[_name].map((error, index) => (
                                <p
                                    className="mt-2 text-sm text-red-500"
                                    key={index}
                                >
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
            </div>

            {datalist && (
                <datalist id={`${id}-datalist`}>
                    {datalist.map((value, index) => (
                        <option value={value} key={index}></option>
                    ))}
                </datalist>
            )}
        </>
    );
}
