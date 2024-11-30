import { Mode, ModeName, Modes } from "@/back-ui/components/styles";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    mode?: `${Mode}`;
}

const modes: Modes = {
    white: "text-cp-black-100 bg-cp-white-100 hover:bg-cp-white-200 focus:bg-cp-white-200 active:bg-cp-white-300",
    black: "text-cp-white-100 bg-cp-black-100 hover:bg-cp-black-200 focus:bg-cp-black-200 active:bg-cp-black-300",
    mono: "text-cp-white-100 bg-cp-black-100 hover:bg-cp-black-200 focus:bg-cp-black-200 active:bg-cp-black-300 dark:text-cp-black-100 dark:bg-cp-white-100 dark:hover:bg-cp-white-200 dark:focus:bg-cp-white-200 dark:active:bg-cp-white-300",
    primary:
        "bg-cp-primary-600 hover:bg-cp-primary-700 focus:bg-cp-primary-700 active:bg-cp-primary-800 dark:bg-cp-primary-400 dark:hover:bg-cp-primary-300 dark:focus:bg-cp-primary-300 dark:active:bg-cp-primary-200",
    neutral:
        "bg-cp-neutral-600 hover:bg-cp-neutral-700 focus:bg-cp-neutral-700 active:bg-cp-neutral-800 dark:bg-cp-neutral-400 dark:hover:bg-cp-neutral-300 dark:focus:bg-cp-neutral-300 dark:active:bg-cp-neutral-200",
    accent: "bg-cp-accent-600 hover:bg-cp-accent-700 focus:bg-cp-accent-700 active:bg-cp-accent-800 dark:bg-cp-accent-400 dark:hover:bg-cp-accent-300 dark:focus:bg-cp-accent-300 dark:active:bg-cp-accent-200",
    actionPrimary:
        "bg-cp-action-primary-600 hover:bg-cp-action-primary-700 focus:bg-cp-action-primary-700 active:bg-cp-action-primary-800 dark:bg-cp-action-primary-400 dark:hover:bg-cp-action-primary-300 dark:focus:bg-cp-action-primary-300 dark:active:bg-cp-action-primary-200",
    actionSecondary:
        "bg-cp-action-secondary-600 hover:bg-cp-action-secondary-700 focus:bg-cp-action-secondary-700 active:bg-cp-action-secondary-800 dark:bg-cp-action-secondary-400 dark:hover:bg-cp-action-secondary-300 dark:focus:bg-cp-action-secondary-300 dark:active:bg-cp-action-secondary-200",
    impartial:
        "bg-cp-impartial-600 hover:bg-cp-impartial-700 focus:bg-cp-impartial-700 active:bg-cp-impartial-800 dark:bg-cp-impartial-400 dark:hover:bg-cp-impartial-300 dark:focus:bg-cp-impartial-300 dark:active:bg-cp-impartial-200",
    info: "bg-cp-info-600 hover:bg-cp-info-700 focus:bg-cp-info-700 active:bg-cp-info-800 dark:bg-cp-info-400 dark:hover:bg-cp-info-300 dark:focus:bg-cp-info-300 dark:active:bg-cp-info-200",
    success:
        "bg-cp-success-600 hover:bg-cp-success-700 focus:bg-cp-success-700 active:bg-cp-success-800 dark:bg-cp-success-400 dark:hover:bg-cp-success-300 dark:focus:bg-cp-success-300 dark:active:bg-cp-success-200",
    warning:
        "bg-cp-warning-600 hover:bg-cp-warning-700 focus:bg-cp-warning-700 active:bg-cp-warning-800 dark:bg-cp-warning-400 dark:hover:bg-cp-warning-300 dark:focus:bg-cp-warning-300 dark:active:bg-cp-warning-200",
    alert: "bg-cp-alert-600 hover:bg-cp-alert-700 focus:bg-cp-alert-700 active:bg-cp-alert-800 dark:bg-cp-alert-400 dark:hover:bg-cp-alert-300 dark:focus:bg-cp-alert-300 dark:active:bg-cp-alert-200",
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
                "disabled:!bg-cp-impartial-500 disabled:cursor-not-allowed",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
}
