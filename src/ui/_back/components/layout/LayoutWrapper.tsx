import ControlPanelBar from "@/ui/components/ControlPanelBar";
import { twMerge } from "tailwind-merge";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin-ext"],
});

export default function LayoutWrapper({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    return (
        <div
            className={twMerge(
                `
                grid [grid-template-areas:'cp-bar''main''footer''header'] grid-rows-[auto_1fr_auto_auto] min-h-dvh w-full pb-6
                md:[grid-template-areas:'cp-bar_cp-bar''header_main''header_footer'] md:grid-rows-[auto_1fr_auto] md:grid-cols-[auto_1fr]
                md:pb-0
                bg-cp-neutral-100 text-cp-black-100 dark:bg-cp-neutral-900 dark:text-cp-white-100
                `,
                inter.className,
                className
            )}
            {...rest}
        >
            <ControlPanelBar className="[grid-area:cp-bar] sticky top-0" />

            {children}
        </div>
    );
}
