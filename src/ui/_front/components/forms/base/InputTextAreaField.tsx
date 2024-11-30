import { twMerge } from "tailwind-merge";
import TextareaAutosize, {
    TextareaAutosizeProps,
} from "react-textarea-autosize";

export default function InputTextAreaField({
    className,
    ...rest
}: Readonly<TextareaAutosizeProps>) {
    return (
        <TextareaAutosize
            className={twMerge(
                "w-full min-h-28 px-2 py-1 border-none rounded resize-y",
                "outline outline-1 !outline-offset-0 !ring-0 focus:outline-2 focus:outline-indigo-500",
                "bg-neutral-300 outline-neutral-400",
                "dark:bg-neutral-700 dark:outline-neutral-600",
                "group-[[inert]]:bg-neutral-300 dark:group-[[inert]]:bg-neutral-800 group-[[inert]]:outline-neutral-200 dark:group-[[inert]]:outline-neutral-700",
                className
            )}
            minRows={6}
            rows={6}
            {...rest}
        />
    );
}
