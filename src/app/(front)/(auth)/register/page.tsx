"use client";

import { register } from "@/lib/actions/auth";
import { useActionState } from "react";

export default function Page() {
    const [, formAction] = useActionState(register, undefined);

    return (
        <form action={formAction} noValidate>
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
                <button type="submit">Register now</button>
            </div>
        </form>
    );
}
