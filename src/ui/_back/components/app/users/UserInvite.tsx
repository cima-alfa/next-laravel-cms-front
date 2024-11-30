"use client";

import InputText from "@/back-ui/components/forms/InputText";
import { ChangeEvent } from "@/back-ui/components/forms";
import PanelBase from "@/back-ui/components/layout/PanelBase";
import { invite } from "@/lib/actions/auth";
import Form from "next/form";
import { useActionState, useState } from "react";
import ButtonBase from "@/back-ui/components/ButtonBase";

export default function UserInvite({
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    const initialState = {
        email: "",
    };

    const [formState, setFormState] = useState<{
        [key: string]: string;
    }>(initialState);

    const handleInput = (
        event: ChangeEvent,
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

    const handleReset = () => {
        setFormState(initialState);
    };

    return (
        <PanelBase className={className} {...rest}>
            <h2>Invite User</h2>

            {state?.message}

            <Form action={formAction} noValidate className="group grid gap-5">
                <InputText
                    label="E-Mail"
                    name="email"
                    value={formState.email}
                    state={state}
                    autoComplete="email"
                    onChange={(e) => handleInput(e, formState, setFormState)}
                />

                <div className="flex justify-between">
                    <ButtonBase disabled={pending} mode="success">
                        Invite
                    </ButtonBase>

                    <ButtonBase
                        type="reset"
                        disabled={pending}
                        mode="warning"
                        onClick={handleReset}
                    >
                        Reset
                    </ButtonBase>
                </div>
            </Form>
        </PanelBase>
    );
}
