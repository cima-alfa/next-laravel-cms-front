import { Mode, ModeName, Modes } from "@/back-ui/components/styles";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    mode?: `${Mode}`;
}

const modes: Modes = {
    white: "text-neutral-950 bg-neutral-50 hover:bg-neutral-100 focus:bg-neutral-100 active:bg-neutral-200",
    black: "text-neutral-50 bg-neutral-950 hover:bg-neutral-900 focus:bg-neutral-900 active:bg-neutral-800",
    mono: "text-neutral-50 bg-neutral-950 hover:bg-neutral-900 focus:bg-neutral-900 active:bg-neutral-800 dark:text-neutral-950 dark:bg-neutral-50 dark:hover:bg-neutral-100 dark:focus:bg-neutral-100 dark:active:bg-neutral-200",
    primary:
        "bg-sky-600 hover:bg-sky-700 focus:bg-sky-700 active:bg-sky-800 dark:bg-sky-400 dark:hover:bg-sky-300 dark:focus:bg-sky-300 dark:active:bg-sky-200",
    neutral:
        "bg-neutral-600 hover:bg-neutral-700 focus:bg-neutral-700 active:bg-neutral-800 dark:bg-neutral-400 dark:hover:bg-neutral-300 dark:focus:bg-neutral-300 dark:active:bg-neutral-200",
    accent: "bg-orange-600 hover:bg-orange-700 focus:bg-orange-700 active:bg-orange-800 dark:bg-orange-400 dark:hover:bg-orange-300 dark:focus:bg-orange-300 dark:active:bg-orange-200",
    actionPrimary:
        "bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800 dark:bg-indigo-400 dark:hover:bg-indigo-300 dark:focus:bg-indigo-300 dark:active:bg-indigo-200",
    actionSecondary:
        "bg-emerald-600 hover:bg-emerald-700 focus:bg-emerald-700 active:bg-emerald-800 dark:bg-emerald-400 dark:hover:bg-emerald-300 dark:focus:bg-emerald-300 dark:active:bg-emerald-200",
    impartial:
        "bg-slate-600 hover:bg-slate-700 focus:bg-slate-700 active:bg-slate-800 dark:bg-slate-400 dark:hover:bg-slate-300 dark:focus:bg-slate-300 dark:active:bg-slate-200",
    info: "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 dark:bg-blue-400 dark:hover:bg-blue-300 dark:focus:bg-blue-300 dark:active:bg-blue-200",
    success:
        "bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-800 dark:bg-green-400 dark:hover:bg-green-300 dark:focus:bg-green-300 dark:active:bg-green-200",
    warning:
        "bg-amber-600 hover:bg-amber-700 focus:bg-amber-700 active:bg-amber-800 dark:bg-amber-400 dark:hover:bg-amber-300 dark:focus:bg-amber-300 dark:active:bg-amber-200",
    alert: "bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800 dark:bg-red-400 dark:hover:bg-red-300 dark:focus:bg-red-300 dark:active:bg-red-200",
};

export default function ButtonBase({
    children,
    className,
    mode = "impartial",
    ...rest
}: Readonly<Props>) {
    return (
        <button
            className={twMerge(
                "px-6 py-3 rounded",
                "!leading-none font-semibold text-sm text-center",
                "transition-colors",
                clsx({
                    "text-neutral-50 dark:text-neutral-950":
                        mode != ModeName.white &&
                        mode != ModeName.black &&
                        mode != ModeName.mono,
                    [modes.white]: mode == ModeName.white,
                    [modes.black]: mode == ModeName.black,
                    [modes.mono]: mode == ModeName.mono,
                    [modes.primary]: mode == ModeName.primary,
                    [modes.neutral]: mode == ModeName.neutral,
                    [modes.accent]: mode == ModeName.accent,
                    [modes.actionPrimary]: mode == ModeName.actionPrimary,
                    [modes.actionSecondary]: mode == ModeName.actionSecondary,
                    [modes.impartial]: mode == ModeName.impartial,
                    [modes.info]: mode == ModeName.info,
                    [modes.success]: mode == ModeName.success,
                    [modes.warning]: mode == ModeName.warning,
                    [modes.alert]: mode == ModeName.alert,
                }),
                "disabled:!bg-slate-500 disabled:cursor-not-allowed",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
}
