"use client";

import Form from "next/form";
import { useActionState, useState } from "react";
import { register } from "@/lib/actions/auth";
import InputText from "@/front-ui/components/forms/InputText";
import ButtonBase from "@/front-ui/components/ButtonBase";
import { ChangeEvent } from "@/front-ui/components/forms";
import { useSearchParams } from "next/navigation";
import { SimpleObject } from "@cms/helpers";

export default function RegisterForm({
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    const params = useSearchParams();

    const initialState = {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const [formState, setFormState] =
        useState<SimpleObject<string>>(initialState);

    const handleInput = (event: ChangeEvent) => {
        const data = { ...formState };

        data[event.target.name] = event.target.value;

        setFormState(data);
    };

    const [state, formAction, pending] = useActionState(
        register.bind(null, params.get("expires"), params.get("signature")),
        null
    );

    return (
        <>
            <div className={className} {...rest}>
                {state?.message}
                <Form action={formAction} className="grid gap-5" noValidate>
                    <InputText
                        label="Username"
                        name="username"
                        autoComplete="username"
                        state={state}
                        onChange={handleInput}
                        value={formState.username}
                    />

                    <InputText
                        label="E-Mail"
                        name="email"
                        autoComplete="email"
                        type="email"
                        state={state}
                        onChange={handleInput}
                        value={formState.email}
                    />

                    <InputText
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        state={state}
                        onChange={handleInput}
                        value={formState.password}
                    />

                    <InputText
                        label="Password Confirmation"
                        name="password_confirmation"
                        type="password"
                        autoComplete="off"
                        state={state}
                        onChange={handleInput}
                        value={formState.password_confirmation}
                    />

                    <ButtonBase disabled={pending} mode="action-secondary">
                        Register
                    </ButtonBase>
                </Form>
            </div>
        </>
    );
}
