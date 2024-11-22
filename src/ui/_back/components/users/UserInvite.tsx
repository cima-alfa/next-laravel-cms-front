"use client";

import InputText from "@/back-ui/components/forms/InputText";
import PanelBase from "@/back-ui/components/layout/PanelBase";
import { invite } from "@/lib/actions/auth";
import Form from "next/form";
import { useActionState, useState } from "react";

export default function UserInvite() {
    const [formState, setFormState] = useState<{
        [key: string]: string;
    }>({
        email: "",
    });

    const handleInput = (
        event: React.ChangeEvent<HTMLInputElement>,
        state: { [key: string]: string },
        setState: React.Dispatch<
            React.SetStateAction<{
                [key: string]: string;
            }>
        >
    ) => {
        const data = { ...state };

        data[event.target.name] = event.target.value;

        setState(data);
    };

    const [state, formAction, pending] = useActionState(invite, null);

    return (
        <PanelBase>
            {state?.message}
            <Form
                action={formAction}
                noValidate
                className="group grid gap-4 grid-cols-[1fr_auto]"
            >
                <InputText
                    label="E-Mail"
                    name="email"
                    value={formState.email}
                    state={state}
                    autoComplete="email"
                    onChange={(e) => handleInput(e, formState, setFormState)}
                />

                <input type="submit" value="Invite" disabled={pending} />
            </Form>
        </PanelBase>
    );
}
