import { twMerge } from "tailwind-merge";

export default function Header({
    children,
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    return (
        <header
            className={twMerge(
                "[grid-area:header] sticky z-50 bottom-6 md:top-0 md:bottom-auto p-2 pb-8 h-22 md:pb-2 md:h-auto",
                className
            )}
            {...rest}
        >
            <div
                className="
                    absolute bottom-2 left-2 right-2 max-w-[1320px] min-h-12 mx-auto
                    md:static md:min-h-[none]
                    backdrop-blur-[24px] rounded-lg outline outline-1 outline-gray-400 dark:backdrop-blur-[26px] dark:outline-gray-600
                    bg-opacity-15 bg-gray-900 text-gray-50 dark:bg-opacity-10 dark:bg-gray-100 dark:text-gray-950
                    "
            >
                <div
                    className="
                        grid [grid-template-areas:'primaryNav_primaryNav''headerLogo_primaryNavButton'] grid-cols-[auto_auto] justify-between items-center md:[grid-template-areas:'headerLogo_primaryNav']
                        max-w-screen-xl px-4 py-2 mx-auto md:h-16 xl:px-6
                        "
                >
                    {children}
                </div>
            </div>
        </header>
    );
}
