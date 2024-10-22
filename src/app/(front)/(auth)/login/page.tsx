"use client";

import { useActionState } from "react";
import Form from "next/form";
import { login } from "@/lib/actions/auth";
import { setCookies } from "@/lib/utils/setCookies";

export default function Page() {
    const loginWrapper = async (
        state: void | undefined,
        formData: FormData
    ) => {
        const response = await login(state, formData);

        if (response.ok) {
            await setCookies(response.setCookie);
        }
    };

    const [, formAction] = useActionState(loginWrapper, undefined);

    return (
        <Form action={formAction} className="grid gap-5" noValidate>
            <input type="email" name="login" autoComplete="username" />
            <input type="password" name="password" />
            <input type="submit" value="login" />
        </Form>
    );
}
