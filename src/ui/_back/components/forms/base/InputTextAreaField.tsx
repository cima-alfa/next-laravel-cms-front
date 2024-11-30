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
                "outline outline-1 !outline-offset-0 !ring-0 focus:outline-2 focus:outline-cp-action-primary-500",
                "bg-cp-neutral-300 outline-cp-neutral-400",
                "dark:bg-cp-neutral-700 dark:outline-cp-neutral-600",
                "group-[[inert]]:bg-cp-neutral-300 dark:group-[[inert]]:bg-cp-neutral-800 group-[[inert]]:outline-cp-neutral-200 dark:group-[[inert]]:outline-cp-neutral-700",
                className
            )}
            minRows={6}
            rows={6}
            {...rest}
        />
    );
}
