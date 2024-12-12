"use client";

import { ChangeEvent } from "@/back-ui/components/forms";
import Form from "next/form";
import { useActionState, useState } from "react";
import ButtonBase from "@/back-ui/components/ButtonBase";
import { twMerge } from "tailwind-merge";
import { Pages } from "@/lib/data/pages";
import InputSelect from "@/back-ui/components/forms/InputSelect";
import { Settings } from "@/lib/data/settings";
import InputText from "@/back-ui/components/forms/InputText";
import { updateSettings } from "@/lib/actions/settings";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
    settings: Settings;
    pages: Pages;
}

export default function GeneralSettingsForm({
    className,
    settings,
    pages,
    ...rest
}: Readonly<Props>) {
    const initialState = {
        "general.website_name": settings["general.website_name"] ?? "",
        "general.frontpage": settings["general.frontpage"] ?? "",
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
        updateSettings.bind(null, "general"),
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
                <InputText
                    label="Website Name"
                    name="general.website_name"
                    value={formState["general.website_name"]}
                    state={state}
                    onChange={(e) => handleInput(e, formState, setFormState)}
                />

                <InputSelect
                    label="Front Page"
                    name="general.frontpage"
                    key={formState["general.frontpage"]}
                    defaultValue={formState["general.frontpage"]}
                    state={state}
                    onChange={(e) => handleInput(e, formState, setFormState)}
                >
                    {pages?.data.map((page, index) => (
                        <option value={page.id} key={index}>
                            {page.title}
                        </option>
                    ))}
                </InputSelect>

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
