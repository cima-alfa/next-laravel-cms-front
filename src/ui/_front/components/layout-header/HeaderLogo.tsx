import LogoDark from "@/front-ui/assets/images/logo-dark-text-jeremys-portfolio.svg";
import LogoLight from "@/front-ui/assets/images/logo-light-text-jeremys-portfolio.svg";

import { getImageProps } from "next/image";
import { twMerge } from "tailwind-merge";

import Link from "next/link";

interface Props extends React.HtmlHTMLAttributes<HTMLAnchorElement> {
    href: string;
    title: string;
    alt?: string;
}

export default function HeaderLogo({
    className,
    href,
    title,
    alt = undefined,
    ...rest
}: Readonly<Props>) {
    const common = { alt: alt ?? title, width: 1024 };

    const {
        props: { src: logoDarkSrc },
    } = getImageProps({
        ...common,
        src: LogoDark,
        priority: true,
        loading: "eager",
    });

    const {
        props: { src: logoLightSrc, ...logoRest },
    } = getImageProps({
        ...common,
        src: LogoLight,
        priority: true,
        loading: "eager",
    });

    return (
        <Link
            href={href}
            title={title}
            className={twMerge(
                "[grid-area:headerLogo] h-8 md:h-full md:py-0.5",
                className
            )}
            {...rest}
        >
            <picture>
                <source
                    media="(prefers-color-scheme: light)"
                    srcSet={logoDarkSrc}
                />
                <source
                    media="(prefers-color-scheme: dark)"
                    srcSet={logoLightSrc}
                />
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img
                    src={logoDarkSrc}
                    {...logoRest}
                    className="h-full w-auto"
                />
            </picture>
        </Link>
    );
}
