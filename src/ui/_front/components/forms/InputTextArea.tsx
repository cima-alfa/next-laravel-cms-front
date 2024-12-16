"use client";

import InputError from "@/front-ui/components/forms/base/InputError";
import InputLabel from "@/front-ui/components/forms/base/InputLabel";
import InputTextAreaField from "@/front-ui/components/forms/base/InputTextAreaField";
import { FormState } from "@cms/helpers";
import { useId } from "react";
import slugify from "slugify";

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name?: string;
    state?: FormState;
}

export default function InputTextArea({
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

    return (
        <>
            <div className={className}>
                <InputLabel htmlFor={id}>{label}</InputLabel>
                <div>
                    {/** @ts-expect-error css height type */}
                    <InputTextAreaField
                        id={id}
                        name={_name}
                        aria-describedby={`${id}-error`}
                        {...rest}
                    />

                    <InputError
                        id={`${id}-error`}
                        errors={state?.errors?.[_name]}
                    />
                </div>
            </div>
        </>
    );
}
