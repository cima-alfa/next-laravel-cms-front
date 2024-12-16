"use client";

import InputError from "@/back-ui/components/forms/base/InputError";
import InputLabel from "@/back-ui/components/forms/base/InputLabel";
import InputTextField from "@/back-ui/components/forms/base/InputTextField";
import { FormState } from "@cms/helpers";
import { useId } from "react";
import slugify from "slugify";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type?: string;
    name?: string;
    state?: FormState;
    datalist?: string[];
}

export default function InputText({
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
                <InputLabel htmlFor={id}>{label}</InputLabel>
                <div>
                    <InputTextField
                        id={id}
                        name={_name}
                        type={type}
                        aria-describedby={`${id}-error`}
                        list={datalist ? `${id}-datalist` : undefined}
                        {...rest}
                    />

                    <InputError
                        id={`${id}-error`}
                        errors={state?.errors?.[_name]}
                    />
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
