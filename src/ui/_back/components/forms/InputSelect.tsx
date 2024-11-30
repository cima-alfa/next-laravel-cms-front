"use client";

import InputError from "@/back-ui/components/forms/base/InputError";
import InputLabel from "@/back-ui/components/forms/base/InputLabel";
import InputSelectField from "@/back-ui/components/forms/base/InputSelectField";
import { useId } from "react";
import slugify from "slugify";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name?: string;
    state?: {
        [key: string]: unknown;
        errors?: { [key: string]: string[] };
    } | null;
}

export default function InputSelect({
    children,
    className,
    label,
    name,
    state,
    ...rest
}: Readonly<Props>) {
    const _name =
        name ??
        slugify(label, {
            lower: true,
            strict: true,
        });

    const id = useId();

    console.log(state?.errors);

    return (
        <>
            <div className={className}>
                <InputLabel htmlFor={id}>{label}</InputLabel>
                <div>
                    <InputSelectField
                        id={id}
                        name={_name}
                        aria-describedby={`${id}-error`}
                        {...rest}
                    >
                        {children}
                    </InputSelectField>

                    <InputError
                        id={`${id}-error`}
                        errors={state?.errors?.[_name]}
                    />
                </div>
            </div>
        </>
    );
}