import { twMerge } from "tailwind-merge";

interface Props extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    primaryNavExpanded: boolean;
    setPrimaryNavExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ButtonPrimaryNavigation({
    className,
    primaryNavExpanded,
    setPrimaryNavExpanded,
    ...rest
}: Readonly<Props>) {
    return (
        <button
            className={twMerge(
                `
                [grid-area:primaryNavButton] relative peer w-5 h-5
                before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1.5 before:-translate-x-1/2 before:w-full before:h-0.5 before:transition-transform
                after:absolute after:top-1/2 after:left-1/2 after:translate-y-1.5 after:-translate-x-1/2 after:w-full after:h-0.5 after:transition-transform
                [&[aria-expanded=true]]:before:-translate-y-1/2 [&[aria-expanded=true]]:after:-translate-y-1/2 [&[aria-expanded=true]]:before:-rotate-45 [&[aria-expanded=true]]:after:rotate-45
                before:bg-gray-950 dark:before:bg-gray-50 after:bg-gray-950 dark:after:bg-gray-50
                md:hidden
                `,
                className
            )}
            aria-controls="primaryNav"
            aria-expanded={primaryNavExpanded}
            type="button"
            onClick={() => setPrimaryNavExpanded(!primaryNavExpanded)}
            {...rest}
        >
            <span className="sr-only">Primary Navigation</span>
        </button>
    );
}
