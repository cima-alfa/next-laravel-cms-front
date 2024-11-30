"use client";

import InputError from "@/back-ui/components/forms/base/InputError";
import InputLabel from "@/back-ui/components/forms/base/InputLabel";
import InputText from "@/back-ui/components/forms/InputText";
import InputTextField from "@/back-ui/components/forms/base/InputTextField";
import { ChangeEvent, FocusEvent } from "@/back-ui/components/forms";
import PanelBase from "@/back-ui/components/layout/PanelBase";
import { updateUser, updateUserPassword } from "@/lib/actions/users";
import { User } from "@/lib/data/users";
import {
    formatPhoneCountryCode,
    formatPhoneNumber,
} from "@/lib/utils/helpers/strings";
import { getDisplayNameOptions } from "@/lib/utils/helpers/users";
import Form from "next/form";
import { useActionState, useId, useState } from "react";
import ButtonBase from "@/back-ui/components/ButtonBase";

interface Props {
    user: User;
    currentUser: User;
}

export default function UserProfile({ user, currentUser }: Readonly<Props>) {
    const editable = currentUser.id === user.id;

    const [stateProfile, formActionProfile, pendingProfile] = useActionState(
        updateUser,
        null
    );

    const [stateUsername, formActionUsername, pendingUsername] = useActionState(
        updateUser,
        null
    );

    const [stateEmail, formActionEmail, pendingEmail] = useActionState(
        updateUser,
        null
    );

    const [statePassword, formActionPassword, pendingPassword] = useActionState(
        updateUserPassword,
        null
    );

    const displayNameOptions = getDisplayNameOptions(
        user.name_first,
        user.name_second,
        user.name_last
    );

    const phoneCountryCodeId = useId();
    const phoneNumberId = useId();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!editable) {
            event.preventDefault();
        }
    };

    const initialProfileState = {
        name_first: user.name_first ?? "",
        name_second: user.name_second ?? "",
        name_last: user.name_last ?? "",
        name_display: user.name_display,
        name_display_plain: user.name_display_plain,
        phone_prefix: user.phone_prefix ?? "",
        phone: user.phone ?? "",
    };

    const [formProfileState, setFormProfileState] = useState<{
        [key: string]: string;
    }>(initialProfileState);

    const initialUsernameState = {
        username: user.username,
    };

    const [formUsernameState, setFormUsernameState] = useState<{
        [key: string]: string;
    }>(initialUsernameState);

    const initialEmailState = {
        email: user.email,
    };

    const [formEmailState, setFormEmailState] = useState<{
        [key: string]: string;
    }>(initialEmailState);

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

        switch (event.target.name) {
            case "phone_prefix":
                data[event.target.name] = formatPhoneCountryCode(
                    event.target.value
                );

                break;

            case "phone":
                data[event.target.name] = formatPhoneNumber(
                    event.target.value
                ).trimStart();

                break;

            case "name_display":
                data["name_display_plain"] = event.target.value;

                break;

            default:
                data[event.target.name] = event.target.value;

                break;
        }

        setState(data);
    };

    const handleBlur = (
        event: FocusEvent,
        state: { [key: string]: string },
        setState: React.Dispatch<
            React.SetStateAction<{
                [key: string]: string;
            }>
        >
    ) => {
        const data = { ...state };

        switch (event.target.name) {
            case "phone":
                data[event.target.name] = event.target.value.replace(
                    /^[^\d]|[^\d]$/,
                    ""
                );

                break;
        }

        setState(data);
    };

    const handleReset = (
        state: { [key: string]: string },
        setState: React.Dispatch<
            React.SetStateAction<{
                [key: string]: string;
            }>
        >
    ) => {
        setState(state);
    };

    return (
        <div className="grid gap-4 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:items-start 2xl:grid-cols-3 2xl:grid-rows-none max-w-screen-2xl">
            <PanelBase className="lg:row-span-2 2xl:row-span-1">
                <h2>Profile</h2>

                {stateProfile?.message}
                <Form
                    action={formActionProfile}
                    onSubmit={handleSubmit}
                    noValidate
                    className="group grid gap-5"
                    inert={!editable}
                >
                    <input type="hidden" name="update_user" value="profile" />

                    <InputText
                        label="First Name"
                        name="name_first"
                        value={formProfileState.name_first}
                        state={stateProfile}
                        autoComplete="given-name"
                        onChange={(e) =>
                            handleInput(
                                e,
                                formProfileState,
                                setFormProfileState
                            )
                        }
                    />

                    <InputText
                        label="Middle Name"
                        name="name_second"
                        value={formProfileState.name_second}
                        state={stateProfile}
                        autoComplete="additional-name"
                        onChange={(e) =>
                            handleInput(
                                e,
                                formProfileState,
                                setFormProfileState
                            )
                        }
                    />

                    <InputText
                        label="Surname"
                        name="name_last"
                        value={formProfileState.name_last}
                        state={stateProfile}
                        autoComplete="family-name"
                        onChange={(e) =>
                            handleInput(
                                e,
                                formProfileState,
                                setFormProfileState
                            )
                        }
                    />

                    <InputText
                        label="Display Name"
                        name="name_display"
                        value={
                            editable
                                ? formProfileState.name_display_plain
                                : formProfileState.name_display
                        }
                        state={stateProfile}
                        datalist={displayNameOptions}
                        autoComplete="name"
                        onChange={(e) =>
                            handleInput(
                                e,
                                formProfileState,
                                setFormProfileState
                            )
                        }
                    />

                    {editable ? (
                        <div>
                            <InputLabel
                                htmlFor={phoneCountryCodeId}
                                className="inline-block"
                            >
                                Country code
                            </InputLabel>{" "}
                            <span className="font-semibold text-sm">and</span>{" "}
                            <InputLabel
                                htmlFor={phoneNumberId}
                                className="inline-block"
                            >
                                Phone number
                            </InputLabel>
                            <div className="grid grid-cols-[auto_1fr] rounded focus-within:outline focus-within:outline-2 focus-within:outline-cp-action-primary-500">
                                <InputTextField
                                    id={phoneCountryCodeId}
                                    name="phone_prefix"
                                    value={`+${formProfileState.phone_prefix}`}
                                    aria-describedby={`${phoneNumberId}-error`}
                                    autoComplete="tel-country-code"
                                    onChange={(e) =>
                                        handleInput(
                                            e,
                                            formProfileState,
                                            setFormProfileState
                                        )
                                    }
                                    className="w-20 focus:z-10 rounded-e-none !outline-1 text-right"
                                    inputMode="numeric"
                                />

                                <InputTextField
                                    id={phoneNumberId}
                                    name="phone"
                                    type="tel"
                                    value={formProfileState.phone}
                                    aria-describedby={`${phoneNumberId}-error`}
                                    autoComplete="tel-national"
                                    onChange={(e) =>
                                        handleInput(
                                            e,
                                            formProfileState,
                                            setFormProfileState
                                        )
                                    }
                                    onBlur={(e) =>
                                        handleBlur(
                                            e,
                                            formProfileState,
                                            setFormProfileState
                                        )
                                    }
                                    className="rounded-s-none !outline-1 focus:z-10"
                                />
                            </div>
                            <InputError
                                id={`${phoneNumberId}-error`}
                                errors={[
                                    ...(stateProfile?.errors?.[
                                        "phone_prefix"
                                    ] ?? []),
                                    ...(stateProfile?.errors?.["phone"] ?? []),
                                ]}
                            />
                        </div>
                    ) : (
                        <InputText
                            label="Phone Number"
                            value={user.phone_number ?? ""}
                            autoComplete="tel"
                            readOnly
                        />
                    )}

                    {editable && (
                        <div className="flex justify-between">
                            <ButtonBase
                                disabled={pendingProfile}
                                mode="success"
                            >
                                Save
                            </ButtonBase>

                            <ButtonBase
                                type="reset"
                                disabled={pendingProfile}
                                mode="warning"
                                onClick={() =>
                                    handleReset(
                                        initialProfileState,
                                        setFormProfileState
                                    )
                                }
                            >
                                Reset
                            </ButtonBase>
                        </div>
                    )}
                </Form>
            </PanelBase>

            <PanelBase>
                <h2>Information</h2>

                {stateUsername?.message}
                <Form
                    action={formActionUsername}
                    onSubmit={handleSubmit}
                    noValidate
                    className="group grid gap-3 mb-6"
                    inert={!editable}
                >
                    <input type="hidden" name="update_user" value="username" />

                    <InputText
                        label="Username"
                        name="username"
                        value={formUsernameState.username}
                        state={stateUsername}
                        autoComplete="username"
                        onChange={(e) =>
                            handleInput(
                                e,
                                formUsernameState,
                                setFormUsernameState
                            )
                        }
                    />

                    {editable && (
                        <div className="flex justify-between">
                            <ButtonBase
                                disabled={pendingUsername}
                                mode="success"
                            >
                                Save
                            </ButtonBase>

                            <ButtonBase
                                type="reset"
                                disabled={pendingUsername}
                                mode="warning"
                                onClick={() =>
                                    handleReset(
                                        initialUsernameState,
                                        setFormUsernameState
                                    )
                                }
                            >
                                Reset
                            </ButtonBase>
                        </div>
                    )}
                </Form>

                {stateEmail?.message}
                <Form
                    action={formActionEmail}
                    onSubmit={handleSubmit}
                    noValidate
                    className="group grid gap-3"
                    inert={!editable}
                >
                    <input type="hidden" name="update_user" value="email" />

                    <InputText
                        label="E-Mail"
                        name="email"
                        type="email"
                        value={formEmailState.email}
                        state={stateEmail}
                        autoComplete="email"
                        onChange={(e) =>
                            handleInput(e, formEmailState, setFormEmailState)
                        }
                    />

                    {editable && (
                        <div className="flex justify-between">
                            <ButtonBase disabled={pendingEmail} mode="success">
                                Save
                            </ButtonBase>

                            <ButtonBase
                                type="reset"
                                disabled={pendingEmail}
                                mode="warning"
                                onClick={() =>
                                    handleReset(
                                        initialEmailState,
                                        setFormEmailState
                                    )
                                }
                            >
                                Reset
                            </ButtonBase>
                        </div>
                    )}
                </Form>
            </PanelBase>

            {editable && (
                <PanelBase>
                    <h2>Password</h2>

                    {statePassword?.message}
                    <Form
                        action={formActionPassword}
                        onSubmit={handleSubmit}
                        noValidate
                        className="group grid gap-5"
                        inert={!editable}
                    >
                        <InputText
                            label="Current Password"
                            name="current_password"
                            type="password"
                            state={statePassword}
                            autoComplete="off"
                        />

                        <InputText
                            label="New Password"
                            name="password"
                            type="password"
                            state={statePassword}
                            autoComplete="new-password"
                        />

                        <InputText
                            label="Password Confirmation"
                            name="password_confirmation"
                            type="password"
                            state={statePassword}
                            autoComplete="off"
                        />

                        <div className="flex justify-between">
                            <ButtonBase
                                disabled={pendingPassword}
                                mode="success"
                            >
                                Save
                            </ButtonBase>

                            <ButtonBase
                                type="reset"
                                disabled={pendingPassword}
                                mode="warning"
                            >
                                Reset
                            </ButtonBase>
                        </div>
                    </Form>
                </PanelBase>
            )}
        </div>
    );
}
