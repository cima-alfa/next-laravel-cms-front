import { twMerge } from "tailwind-merge";
import PrimaryNavigationLink from "./PrimaryNavigationLink";
import { link } from "@/lib/router/router";
import { fetchAuthenticated } from "@/lib/data/auth";

export default async function PrimaryNavigation({
    className,
    ...rest
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    const isAuthenticated = await fetchAuthenticated();

    return (
        <nav
            id="--primary-navigation"
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
                    {!isAuthenticated && (
                        <>
                            <li>
                                <PrimaryNavigationLink
                                    href={link("front.login")}
                                    title=""
                                >
                                    Login
                                </PrimaryNavigationLink>
                            </li>
                            <li>
                                <PrimaryNavigationLink
                                    href={link("front.register")}
                                    title=""
                                >
                                    Register
                                </PrimaryNavigationLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
