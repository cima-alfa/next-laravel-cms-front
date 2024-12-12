"use client";

import { ChangeEvent } from "@/back-ui/components/forms";
import Form from "next/form";
import { useActionState, useState } from "react";
import ButtonBase from "@/back-ui/components/ButtonBase";
import { twMerge } from "tailwind-merge";
import InputSelect from "@/back-ui/components/forms/InputSelect";
import { Settings } from "@/lib/data/settings";
import InputText from "@/back-ui/components/forms/InputText";
import { updateSettings } from "@/lib/actions/settings";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
    settings: Settings;
}

export default function EmailsSettingsForm({
    className,
    settings,
    ...rest
}: Readonly<Props>) {
    const initialState = {
        "mail.mailers.default.transport":
            settings["mail.mailers.default.transport"] ?? "",
        "mail.mailers.default.host":
            settings["mail.mailers.default.host"] ?? "",
        "mail.mailers.default.port":
            settings["mail.mailers.default.port"] ?? "",
        "mail.mailers.default.username":
            settings["mail.mailers.default.username"] ?? "",
        "mail.mailers.default.password":
            settings["mail.mailers.default.password"] ?? "",
        "mail.mailers.default.encryption":
            settings["mail.mailers.default.encryption"] ?? "",
        "mail.mailers.default.from.email":
            settings["mail.mailers.default.from.email"] ?? "",
        "mail.mailers.default.from.name":
            settings["mail.mailers.default.from.name"] ?? "",
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

    const [state, formAction, pending] = useActionState(
        updateSettings.bind(null, "emails"),
        null
    );

    const handleReset = () => {
        setFormState(initialState);
    };

    return (
        <>
            {state?.message}

            <Form
                action={formAction}
                noValidate
                className={twMerge("group grid gap-5", className)}
                {...rest}
            >
                <InputSelect
                    label="Method"
                    name="mail.mailers.default.transport"
                    key={formState["mail.mailers.default.transport"]}
                    defaultValue={formState["mail.mailers.default.transport"]}
                    state={state}
                    onChange={(e) => handleInput(e, formState, setFormState)}
                >
                    <option value="log">Log</option>
                    <option value="smtp">SMTP</option>
                </InputSelect>

                {formState["mail.mailers.default.transport"] === "smtp" && (
                    <>
                        <InputText
                            label="Host"
                            name="mail.mailers.default.host"
                            value={formState["mail.mailers.default.host"]}
                            state={state}
                            onChange={(e) =>
                                handleInput(e, formState, setFormState)
                            }
                        />

                        <InputText
                            label="Port"
                            name="mail.mailers.default.port"
                            type="number"
                            value={formState["mail.mailers.default.port"]}
                            state={state}
                            onChange={(e) =>
                                handleInput(e, formState, setFormState)
                            }
                            datalist={["25", "2525", "465", "587"]}
                        />

                        <InputSelect
                            label="Security"
                            name="mail.mailers.default.encryption"
                            key={formState["mail.mailers.default.encryption"]}
                            defaultValue={
                                formState["mail.mailers.default.encryption"]
                            }
                            state={state}
                            onChange={(e) =>
                                handleInput(e, formState, setFormState)
                            }
                        >
                            <option value="">None</option>
                            <option value="ssl">SSL</option>
                            <option value="tls">TLS</option>
                        </InputSelect>

                        <InputText
                            label="Username"
                            name="mail.mailers.default.username"
                            value={formState["mail.mailers.default.username"]}
                            state={state}
                            onChange={(e) =>
                                handleInput(e, formState, setFormState)
                            }
                            inputMode="email"
                        />

                        <InputText
                            label="Password"
                            name="mail.mailers.default.password"
                            type="password"
                            state={state}
                            onChange={(e) =>
                                handleInput(e, formState, setFormState)
                            }
                        />
                    </>
                )}

                <InputText
                    label="From E-Mail"
                    name="mail.mailers.default.from.email"
                    type="email"
                    autoComplete="email"
                    value={formState["mail.mailers.default.from.email"]}
                    state={state}
                    onChange={(e) => handleInput(e, formState, setFormState)}
                />

                <InputText
                    label="From Name"
                    name="mail.mailers.default.from.name"
                    autoComplete="name"
                    value={formState["mail.mailers.default.from.name"]}
                    state={state}
                    onChange={(e) => handleInput(e, formState, setFormState)}
                />

                <div className="flex justify-between">
                    <ButtonBase disabled={pending} mode="success">
                        Save
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
        </>
    );
}
