"use client";

import { createPage, updatePage } from "@/lib/actions/pages";
import { Page } from "@/lib/data/pages";
import Form from "next/form";
import { useActionState } from "react";

interface Props {
    mode: "create" | "edit";
    page?: Page;
}

export default function PageForm({ mode, page }: Readonly<Props>) {
    let action;

    switch (mode) {
        case "edit":
            action = updatePage.bind(null, (page as Page).id);

            break;

        default:
            action = createPage;

            break;
    }

    const [state, formAction, pending] = useActionState(action, null);

    return (
        <>
            {state?.message}
            <Form action={formAction} className="grid gap-5" noValidate>
                <input type="text" name="title" defaultValue={page?.title} />
                <textarea name="text" defaultValue={page?.text}></textarea>
                <input type="submit" value="save" disabled={pending} />
            </Form>
        </>
    );
}
