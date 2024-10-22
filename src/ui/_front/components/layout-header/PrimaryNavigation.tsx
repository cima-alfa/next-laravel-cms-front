import { twMerge } from "tailwind-merge";
import PrimaryNavigationLink from "./PrimaryNavigationLink";
import { route } from "@/lib/router/router";

export default function PrimaryNavigation({
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    return (
        <nav
            id="primaryNav"
            className={twMerge(
                `
                [grid-area:primaryNav] overflow-clip peer-[[aria-expanded='false']]:h-0 transition-[height] will-change-[height]
                md:peer-[[aria-expanded='false']]:h-auto md:transition-none
                `,
                className
            )}
            {...rest}
        >
            <div className="pb-3 md:pb-0">
                <ul
                    className="
                        grid gap-2 md:flex
                        pb-3 border-b md:pb-0 md:border-b-0
                        border-gray-500 border-opacity-70 font-semibold
                        "
                >
                    <li>
                        <PrimaryNavigationLink href="/" title="">
                            Home
                        </PrimaryNavigationLink>
                    </li>
                    <li>
                        <PrimaryNavigationLink href="/about" title="">
                            About
                        </PrimaryNavigationLink>
                    </li>
                    <li>
                        <PrimaryNavigationLink href="/contact" title="">
                            Contact
                        </PrimaryNavigationLink>
                    </li>
                    <li>
                        <PrimaryNavigationLink
                            href={route("front.login")}
                            title=""
                        >
                            Login
                        </PrimaryNavigationLink>
                    </li>
                    <li>
                        <PrimaryNavigationLink
                            href={route("front.register")}
                            title=""
                        >
                            Register
                        </PrimaryNavigationLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
