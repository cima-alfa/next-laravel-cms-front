"use client";

import Form from "next/form";
import { useActionState, useState } from "react";
import { login } from "@/lib/actions/auth";
import InputText from "@/front-ui/components/forms/InputText";
import ButtonBase from "@/front-ui/components/ButtonBase";
import { ChangeEvent } from "@/front-ui/components/forms";

export default function LoginForm({
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    const initialState = {
        login: "",
        password: "",
    };

    const [formState, setFormState] = useState<{
        [key: string]: string;
    }>(initialState);

    const handleInput = (event: ChangeEvent) => {
        const data = { ...formState };

        data[event.target.name] = event.target.value;

        setFormState(data);
    };

    const [state, formAction, pending] = useActionState(login, null);

    return (
        <>
            <div className={className} {...rest}>
                {state?.message}
                <Form action={formAction} className="grid gap-5" noValidate>
                    <InputText
                        label="Username or E-Mail"
                        name="login"
                        autoComplete="username"
                        inputMode="email"
                        state={state}
                        onChange={handleInput}
                        value={formState.login}
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

                    <ButtonBase disabled={pending} mode="action-secondary">
                        Login
                    </ButtonBase>
                </Form>
            </div>
        </>
    );
}
