"use client";

import InputText from "@/back-ui/components/forms/InputText";
import InputTextArea from "@/back-ui/components/forms/InputTextArea";
import { ChangeEvent, FocusEvent } from "@/back-ui/components/forms";
import {
    createPage,
    destroyPage,
    updatePage,
    updatePageMetadata,
} from "@/lib/actions/pages";
import { Page } from "@/lib/data/pages";
import Form from "next/form";
import { useActionState, useMemo, useState } from "react";
import ButtonBase from "@/back-ui/components/ButtonBase";
import { useRouter } from "nextjs-toploader/app";
import PanelBase from "@/back-ui/components/layout/PanelBase";
import InputSelect from "@/back-ui/components/forms/InputSelect";
import {
    AddAction,
    DeleteAction,
    ViewAction,
} from "@/back-ui/components/tables/TableActions";
import { link, permalink } from "@cms/router";
import { SimpleObject } from "@cms/helpers";
import RichEditor from "@/ui/components/RichEditor";

interface Props {
    mode: "create" | "edit";
    page?: Page;
}

export default function PageForm({ mode, page }: Readonly<Props>) {
    let actionContent;
    let actionMetadata;

    switch (mode) {
        case "edit":
            actionContent = updatePage.bind(null, (page as Page).id);
            actionMetadata = updatePageMetadata.bind(null, (page as Page).id);

            break;

        default:
            actionContent = createPage;
            actionMetadata = async () => {
                return { message: "" };
            };

            break;
    }

    const [stateContent, formActionContent, pendingContent] = useActionState(
        actionContent,
        null
    );
    const [stateMetadata, formActionMetadata, pendingMetadata] = useActionState(
        actionMetadata,
        null
    );

    const initialStateContent = useMemo(() => {
        return {
            title: page?.title ?? "",
            text: page?.text ?? "",
            published: page?.meta.published ?? true,
        };
    }, [page]);

    const [formStateContent, setFormStateContent] =
        useState<SimpleObject>(initialStateContent);

    const initialStateMetadata = useMemo(() => {
        return {
            permalink: page?.meta.permalink ?? "",
            title: page?.meta.title ?? "",
            description: page?.meta.description ?? "",
            robots: page?.meta.robots ?? "index,follow",
            sitemap_include: `${page?.meta.sitemap_include ?? true ? 1 : 0}`,
            sitemap_prio: `${page?.meta.sitemap_prio ?? 0.7}`,
            sitemap_change_freq: page?.meta.sitemap_change_freq ?? "monthly",
        };
    }, [page]);

    const [formStateMetadata, setFormStateMetadata] =
        useState<SimpleObject>(initialStateMetadata);

    const handleInput = async (
        event: ChangeEvent,
        state: SimpleObject,
        setState: React.Dispatch<React.SetStateAction<SimpleObject>>,
        form: "content" | "metadata"
    ) => {
        const data = { ...state };
        const metaData = { ...formStateMetadata };

        switch (form) {
            case "content":
                switch (event.target.type) {
                    case "checkbox":
                        data[event.target.name] = (
                            event.target as HTMLInputElement
                        ).checked;

                        break;

                    default:
                        data[event.target.name] = event.target.value;

                        break;
                }

                setState(data);

                if (mode === "create") {
                    switch (event.target.name) {
                        case "title":
                            metaData.permalink = formatPermalink(
                                event.target.value
                            );
                            metaData.title = event.target.value;

                            break;
                    }
                }

                setFormStateMetadata(metaData);

                break;

            default:
                switch (event.target.name) {
                    default:
                        metaData[event.target.name] = event.target.value;

                        break;
                }

                setFormStateMetadata(metaData);

                break;
        }
    };

    const handleBlur = async (
        event: FocusEvent,
        state: SimpleObject,
        setState: React.Dispatch<React.SetStateAction<SimpleObject>>,
        form: "content" | "metadata"
    ) => {
        switch (form) {
            case "content":
                const data = { ...state };

                data[event.target.name] = event.target.value;

                setState(data);

                break;

            default:
                const metaData = { ...formStateMetadata };

                switch (event.target.name) {
                    case "permalink":
                        metaData[event.target.name] = formatPermalink(
                            event.target.value
                        );

                        break;

                    default:
                        metaData[event.target.name] = event.target.value;

                        break;
                }

                setFormStateMetadata(metaData);

                break;
        }
    };

    const handleReset = (
        state: SimpleObject,
        setState: React.Dispatch<React.SetStateAction<SimpleObject>>
    ) => {
        setState(state);

        if (mode === "create") {
            setFormStateMetadata(initialStateMetadata);
        }
    };

    const router = useRouter();

    const handleCancel = () => {
        router.back();
    };

    const handleDeletePage = async (page: Page) => {
        if (
            !confirm(
                `Delete the following page: "${page.title}" ${
                    page.user ? `created by ${page.user?.name_display}` : ""
                }`
            )
        ) {
            return;
        }

        const result = await destroyPage(page.id, link("front.cp.pages.index"));

        if (result) {
            alert(result.message);
        }
    };

    const formatPermalink = (permalink: string) => {
        permalink = permalink.trim().replace(/\/{2,}/g, "/");

        if (permalink === "" || permalink === "/") {
            return "";
        }

        permalink = permalink
            .replace(/^\/|\/$/g, "")
            .replace(/[^\w\s\/\-_]+/g, "")
            .replace(/[\s_]+/g, "-")
            .trim()
            .toLowerCase();

        // const makeUnique = async (permalink: string): Promise<string> => {
        //     let uniquePermalink = permalink;
        //     let pageByPermalink = await fetchPageByPermalink(permalink);

        //     if (
        //         pageByPermalink === null ||
        //         pageByPermalink?.id !== page?.id
        //     ) {
        //         return uniquePermalink;
        //     }

        //     uniquePermalink = `${permalink}-${nanoid(6).toLowerCase()}`;
        //     pageByPermalink = await fetchPageByPermalink(uniquePermalink);

        //     return pageByPermalink === null ||
        //         pageByPermalink?.id !== page?.id
        //         ? uniquePermalink
        //         : await makeUnique(permalink);
        // };

        return permalink
            .replace(/\/{2,}/g, "/")
            .replace(/^\/|\/$/g, "")
            .trim();
    };

    return (
        <div className="grid @8xl/main:grid-cols-[3fr_1fr] gap-4 items-start">
            <div className="grid gap-2">
                {page ? (
                    <PanelBase className="flex gap-4 justify-between !py-2">
                        <AddAction
                            href={link("front.cp.pages.create")}
                            title="Create Page"
                        >
                            Create a new page
                        </AddAction>

                        <div className="flex gap-2">
                            <div className="flex gap-2 items-center mr-5">
                                <label
                                    htmlFor="page-published"
                                    className="text-sm font-semibold"
                                >
                                    Publish
                                </label>
                                <input
                                    id="page-published"
                                    type="checkbox"
                                    name="published"
                                    checked={
                                        formStateContent.published as boolean
                                    }
                                    onChange={(e) =>
                                        handleInput(
                                            e,
                                            formStateContent,
                                            setFormStateContent,
                                            "content"
                                        )
                                    }
                                />
                            </div>

                            <ViewAction
                                href={permalink(page)}
                                target="_blank"
                                title="Visit Page"
                            >
                                Visit page
                            </ViewAction>

                            <DeleteAction
                                onClick={() => handleDeletePage(page)}
                                title="Delete Page"
                            >
                                Delete page
                            </DeleteAction>
                        </div>
                    </PanelBase>
                ) : (
                    <PanelBase className="flex gap-4 justify-end !py-2">
                        <div className="flex gap-2 items-center">
                            <label
                                htmlFor="page-published"
                                className="text-sm font-semibold"
                            >
                                Publish
                            </label>
                            <input
                                id="page-published"
                                type="checkbox"
                                name="published"
                                checked={formStateContent.published as boolean}
                                onChange={(e) =>
                                    handleInput(
                                        e,
                                        formStateContent,
                                        setFormStateContent,
                                        "content"
                                    )
                                }
                            />
                        </div>
                    </PanelBase>
                )}

                <PanelBase>
                    <h2>Content</h2>

                    {stateContent?.message}
                    <Form
                        action={formActionContent}
                        className="grid gap-5"
                        noValidate
                    >
                        <input
                            type="hidden"
                            name="published"
                            value={`${formStateContent.published ? 1 : 0}`}
                        />

                        <InputText
                            label="Title"
                            name="title"
                            value={formStateContent.title as string}
                            state={stateContent}
                            onChange={(e) =>
                                handleInput(
                                    e,
                                    formStateContent,
                                    setFormStateContent,
                                    "content"
                                )
                            }
                        />

                        {/* <InputTextArea
                            label="Text"
                            name="text"
                            value={formStateContent.text as string}
                            state={stateContent}
                            onChange={(e) =>
                                handleInput(
                                    e,
                                    formStateContent,
                                    setFormStateContent,
                                    "content"
                                )
                            }
                        /> */}

                        <RichEditor
                            initialValue={formStateContent.text as string}
                            name="text"
                        />

                        <div className="flex justify-between gap-4">
                            <ButtonBase
                                disabled={pendingContent}
                                mode="success"
                            >
                                Save
                            </ButtonBase>

                            <div className="flex gap-4">
                                <ButtonBase
                                    type="reset"
                                    disabled={pendingContent}
                                    mode="warning"
                                    onClick={() =>
                                        handleReset(
                                            initialStateContent,
                                            setFormStateContent
                                        )
                                    }
                                >
                                    Reset
                                </ButtonBase>

                                <ButtonBase
                                    type="button"
                                    disabled={pendingContent}
                                    mode="alert"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </ButtonBase>
                            </div>
                        </div>
                    </Form>
                </PanelBase>
            </div>

            <PanelBase className="justify-self-start w-full md:max-w-screen-sm">
                <h2>Metadata</h2>

                {mode === "create" && (
                    <p className="italic">
                        <small>Becomes editable once page is created</small>
                    </p>
                )}

                {stateMetadata?.message}
                <Form
                    action={formActionMetadata}
                    className="grid gap-5"
                    noValidate
                    inert={mode === "create"}
                >
                    <InputText
                        label="Permalink"
                        name="permalink"
                        value={formStateMetadata.permalink as string}
                        state={stateMetadata}
                        onChange={(e) =>
                            handleInput(
                                e,
                                formStateMetadata,
                                setFormStateMetadata,
                                "metadata"
                            )
                        }
                        onBlur={(e) =>
                            handleBlur(
                                e,
                                formStateMetadata,
                                setFormStateMetadata,
                                "metadata"
                            )
                        }
                    />

                    <InputText
                        label="Title"
                        name="title"
                        value={formStateMetadata.title as string}
                        state={stateMetadata}
                        onChange={(e) =>
                            handleInput(
                                e,
                                formStateMetadata,
                                setFormStateMetadata,
                                "metadata"
                            )
                        }
                    />

                    <InputTextArea
                        label="Description"
                        name="description"
                        value={formStateMetadata.description as string}
                        state={stateMetadata}
                        onChange={(e) =>
                            handleInput(
                                e,
                                formStateMetadata,
                                setFormStateMetadata,
                                "metadata"
                            )
                        }
                    />

                    <InputSelect
                        label="Robots"
                        name="robots"
                        key={formStateMetadata.robots as string}
                        defaultValue={formStateMetadata.robots as string}
                        state={stateMetadata}
                        onChange={(e) =>
                            handleInput(
                                e,
                                formStateMetadata,
                                setFormStateMetadata,
                                "metadata"
                            )
                        }
                    >
                        <option value="index,follow">Index, Follow</option>
                        <option value="noindex,follow">No Index, Follow</option>
                        <option value="index,nofollow">Index, No Follow</option>
                        <option value="noindex,nofollow">
                            No Index, No Follow
                        </option>
                    </InputSelect>

                    <InputSelect
                        label="Include in Sitemap"
                        name="sitemap_include"
                        key={formStateMetadata.sitemap_include as string}
                        defaultValue={
                            formStateMetadata.sitemap_include as string
                        }
                        state={stateMetadata}
                        onChange={(e) =>
                            handleInput(
                                e,
                                formStateMetadata,
                                setFormStateMetadata,
                                "metadata"
                            )
                        }
                    >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </InputSelect>

                    <InputSelect
                        label="Priority"
                        name="sitemap_prio"
                        key={formStateMetadata.sitemap_prio as string}
                        defaultValue={formStateMetadata.sitemap_prio as string}
                        state={stateMetadata}
                        onChange={(e) =>
                            handleInput(
                                e,
                                formStateMetadata,
                                setFormStateMetadata,
                                "metadata"
                            )
                        }
                    >
                        <option>1.0</option>
                        <option>0.9</option>
                        <option>0.8</option>
                        <option>0.7</option>
                        <option>0.6</option>
                        <option>0.5</option>
                        <option>0.4</option>
                        <option>0.3</option>
                        <option>0.2</option>
                        <option>0.1</option>
                        <option>0.0</option>
                    </InputSelect>

                    <InputSelect
                        label="Change Frequency"
                        name="sitemap_change_freq"
                        key={formStateMetadata.sitemap_change_freq as string}
                        defaultValue={
                            formStateMetadata.sitemap_change_freq as string
                        }
                        state={stateMetadata}
                        onChange={(e) =>
                            handleInput(
                                e,
                                formStateMetadata,
                                setFormStateMetadata,
                                "metadata"
                            )
                        }
                    >
                        <option value="always">Always</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="never">Never</option>
                    </InputSelect>

                    {mode !== "create" && (
                        <div className="flex justify-between gap-4">
                            <ButtonBase
                                disabled={pendingMetadata}
                                mode="success"
                            >
                                Save
                            </ButtonBase>

                            <ButtonBase
                                type="reset"
                                disabled={pendingMetadata}
                                mode="warning"
                                onClick={() =>
                                    handleReset(
                                        initialStateMetadata,
                                        setFormStateMetadata
                                    )
                                }
                            >
                                Reset
                            </ButtonBase>
                        </div>
                    )}
                </Form>
            </PanelBase>
        </div>
    );
}
