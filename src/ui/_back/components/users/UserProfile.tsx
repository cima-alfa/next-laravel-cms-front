"use client";

import InputField from "@/back-ui/components/forms/InputField";
import PanelBase from "@/back-ui/components/layout/PanelBase";
import { updateUser, updateUserPassword } from "@/lib/actions/auth";
import { User } from "@/lib/data/auth";
import { getDisplayNameOptions } from "@/lib/utils/helpers/users";
import Form from "next/form";
import { useActionState, useState } from "react";

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
        user.name_last,
        user.username
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!editable) {
            event.preventDefault();
        }
    };

    const [formProfileState, setFormProfileState] = useState<{
        [key: string]: string;
    }>({
        name_first: user.name_first ?? "",
        name_second: user.name_second ?? "",
        name_last: user.name_last ?? "",
        name_display: user.name_display_plain,
        phone_prefix: user.phone_prefix ?? "",
        phone: user.phone ?? "",
    });

    const [formUsernameState, setFormUsernameState] = useState<{
        [key: string]: string;
    }>({
        username: user.username,
    });

    const [formEmailState, setFormEmailState] = useState<{
        [key: string]: string;
    }>({
        email: user.email,
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

                    <InputField
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

                    <InputField
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

                    <InputField
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

                    <InputField
                        label="Display Name"
                        name="name_display"
                        value={formProfileState.name_display}
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
                        <div className="grid grid-cols-[min-content_1fr] gap-3">
                            <div className="flex gap-1">
                                <span className="self-end leading-6 py-1">
                                    +
                                </span>
                                <InputField
                                    label="Country Code"
                                    name="phone_prefix"
                                    type="number"
                                    value={formProfileState.phone_prefix}
                                    state={stateProfile}
                                    className="whitespace-nowrap"
                                    autoComplete="tel-country-code"
                                    onChange={(e) =>
                                        handleInput(
                                            e,
                                            formProfileState,
                                            setFormProfileState
                                        )
                                    }
                                />
                            </div>

                            <InputField
                                label="Phone Number"
                                name="phone"
                                value={formProfileState.phone}
                                state={stateProfile}
                                autoComplete="tel-national"
                                onChange={(e) =>
                                    handleInput(
                                        e,
                                        formProfileState,
                                        setFormProfileState
                                    )
                                }
                            />
                        </div>
                    ) : (
                        <InputField
                            label="Phone Number"
                            value={user.phone_number ?? ""}
                            autoComplete="tel"
                            readOnly
                        />
                    )}

                    {editable && (
                        <input
                            type="submit"
                            value="save"
                            disabled={pendingProfile}
                        />
                    )}
                </Form>
            </PanelBase>

            {currentUser.id === user.id && (
                <>
                    <PanelBase>
                        <h2>Information</h2>

                        {stateUsername?.message}
                        <Form
                            action={formActionUsername}
                            onSubmit={handleSubmit}
                            noValidate
                            className="group grid gap-4 grid-cols-[1fr_auto] mb-5"
                            inert={!editable}
                        >
                            <input
                                type="hidden"
                                name="update_user"
                                value="username"
                            />

                            <InputField
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
                                <input
                                    type="submit"
                                    value="save"
                                    disabled={pendingUsername}
                                />
                            )}
                        </Form>

                        {stateEmail?.message}
                        <Form
                            action={formActionEmail}
                            onSubmit={handleSubmit}
                            noValidate
                            className="group grid gap-4 grid-cols-[1fr_auto]"
                            inert={!editable}
                        >
                            <input
                                type="hidden"
                                name="update_user"
                                value="email"
                            />

                            <InputField
                                label="E-Mail"
                                name="email"
                                value={formEmailState.email}
                                state={stateEmail}
                                autoComplete="email"
                                onChange={(e) =>
                                    handleInput(
                                        e,
                                        formEmailState,
                                        setFormEmailState
                                    )
                                }
                            />

                            {editable && (
                                <input
                                    type="submit"
                                    value="save"
                                    disabled={pendingEmail}
                                />
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
                                <InputField
                                    label="Current Password"
                                    name="current_password"
                                    type="password"
                                    state={statePassword}
                                    autoComplete="off"
                                />

                                <InputField
                                    label="New Password"
                                    name="password"
                                    type="password"
                                    state={statePassword}
                                    autoComplete="new-password"
                                />

                                <InputField
                                    label="Password Confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    state={statePassword}
                                    autoComplete="off"
                                />

                                <input
                                    type="submit"
                                    value="save"
                                    disabled={pendingPassword}
                                />
                            </Form>
                        </PanelBase>
                    )}
                </>
            )}
        </div>
    );
}
