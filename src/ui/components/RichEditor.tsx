"use client";

import { Editor } from "@tinymce/tinymce-react";
import {
    Editor as TinyMCEEditor,
    EditorEvent,
    Events,
    RawEditorOptions,
} from "tinymce";
import { useState } from "react";
import dynamic from "next/dynamic";
import { SimpleObject } from "@cms/helpers";
import { twMerge } from "tailwind-merge";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
    init?: RawEditorOptions;
    initialValue?: string;
    name?: string;
    limit?: number;
}

function RichEditor({
    className,
    init = {},
    initialValue = "",
    name,
    limit,
}: Readonly<Props>) {
    const defaultInit: RawEditorOptions = {
        promotion: false,
        branding: false,
        min_height: 417,
    };

    const [value, setValue] = useState(initialValue);
    const [length, setLength] = useState(0);

    const handleInit = (event: unknown, editor: TinyMCEEditor) => {
        setLength(editor.getContent({ format: "text" }).length);
    };

    const handleUpdate = (value: string, editor: TinyMCEEditor) => {
        const length = editor.getContent({ format: "text" }).length;

        if (limit === undefined || length <= limit) {
            setValue(value);
            setLength(length);
        }
    };

    const handleBeforeAddUndo = (
        event: EditorEvent<Events.AddUndoEvent>,
        editor: TinyMCEEditor
    ) => {
        const length = editor.getContent({ format: "text" }).length;

        if (limit !== undefined && length > limit) {
            event.preventDefault();
        }
    };

    return (
        <div className={twMerge("not-prose", className)}>
            <Editor
                init={{ ...defaultInit, ...init } as SimpleObject}
                initialValue={initialValue}
                value={value}
                onInit={handleInit}
                onEditorChange={handleUpdate}
                onBeforeAddUndo={handleBeforeAddUndo}
                tinymceScriptSrc="/assets/lib/tinymce/tinymce.min.js"
                licenseKey="gpl"
                textareaName={name}
            />
            {limit !== undefined && <p>Remaining: {limit - length}</p>}
        </div>
    );
}

export default dynamic(() => Promise.resolve(RichEditor), {
    ssr: false,
});
