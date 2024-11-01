"use client";

import Form from "next/form";
import { useActionState } from "react";
import { login } from "@/lib/actions/auth";

export default function Page() {
    const [state, formAction, pending] = useActionState(login, null);

    return (
        <>
            {state?.message}
            <Form action={formAction} className="grid gap-5" noValidate>
                <input type="email" name="login" autoComplete="username" />
                <input type="password" name="password" />
                <input type="submit" value="login" disabled={pending} />
            </Form>
        </>
    );
}
