import ControlPanelBar from "@/ui/components/ControlPanelBar";
import { twMerge } from "tailwind-merge";

export default function LayoutWrapper({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    return (
        <div
            className={twMerge(
                `
                grid [grid-template-areas:'cp-bar''main''footer''header'] grid-rows-[auto_1fr_auto_auto] min-h-dvh w-full
                md:[grid-template-areas:'cp-bar''header''main''footer'] md:grid-rows-[auto_auto_1fr_auto]
                bg-gray-100 text-gray-950 dark:bg-gray-900 dark:text-gray-50
                before:fixed before:z-40 before:inset-2 before:bottom-8 before:pointer-events-none before:rounded-t-md before:rounded-b-xl before:shadow-[0_0_0_3rem]
                md:before:bottom-2 md:before:rounded-t-xl md:before:rounded-b-lg
                before:shadow-gray-100 dark:before:shadow-gray-900
                `,
                className
            )}
            {...rest}
        >
            <ControlPanelBar className="[grid-area:cp-bar]" />

            {children}
        </div>
    );
}
