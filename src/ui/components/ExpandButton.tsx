"use client";

import eventListener from "@/lib/utils/events";
import { useRef, useState } from "react";

interface Props extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    controls: string;
    expanded?: boolean;
    keepExpanded?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ExpandButton({
    children,
    className,
    controls,
    expanded = false,
    keepExpanded = false,
    onClick,
    ...rest
}: Readonly<Props>) {
    const targetExpanded = useRef(expanded);
    const [ariaExpanded, setAriaExpanded] = useState(expanded);

    const toggleTargetElement = (targetElement: Element | null) => {
        targetExpanded.current = !targetExpanded.current;

        targetElement?.setAttribute(
            "data-expanded",
            `${targetExpanded.current}`
        );

        setAriaExpanded(targetExpanded.current);
    };

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        eventListener.remove(
            document,
            `click.expandButtonTargetHandler.${controls}`
        );

        const targetElement = document.querySelector(`#${controls}`);

        toggleTargetElement(targetElement);

        if (!targetExpanded.current) {
            if (onClick !== undefined) {
                onClick(event);
            }

            return;
        }

        eventListener.add(
            document,
            `click.expandButtonTargetHandler.${controls}`,
            (event: Event) => {
                event.preventDefault();

                if (
                    keepExpanded &&
                    (event.target as HTMLElement).parentElement?.closest(
                        `#${controls}`
                    ) === targetElement
                ) {
                    return;
                }

                toggleTargetElement(targetElement);

                eventListener.remove(
                    document,
                    `click.expandButtonTargetHandler.${controls}`
                );
            }
        );

        if (onClick !== undefined) {
            onClick(event);
        }
    };

    return (
        <button
            className={className}
            aria-controls={controls}
            aria-expanded={ariaExpanded}
            type="button"
            onClick={handleClick}
            {...rest}
        >
            {children}
        </button>
    );
}
