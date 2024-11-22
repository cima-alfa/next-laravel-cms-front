"use client";

import Form from "next/form";
import { useActionState } from "react";
import { register } from "@/lib/actions/auth";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const params = useSearchParams();

    const [state, formAction, pending] = useActionState(
        register.bind(null, params.get("expires"), params.get("signature")),
        null
    );

    return (
        <>
            {state?.message}
            <Form action={formAction} className="grid gap-5" noValidate>
                <div className="pb-5">
                    <input
                        type="text"
                        name="username"
                        required
                        autoComplete="username"
                    />
                </div>

                <div className="pb-5">
                    <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                    />
                </div>

                <div className="pb-5">
                    <input
                        name="password"
                        type="password"
                        required
                        autoComplete="new-password"
                    />
                </div>

                <div className="pb-5">
                    <input
                        name="password_confirmation"
                        type="password"
                        required
                        autoComplete="new-password"
                    />
                </div>

                <div className="pt-2">
                    <button type="submit" disabled={pending}>
                        Register now
                    </button>
                </div>
            </Form>
        </>
    );
}
