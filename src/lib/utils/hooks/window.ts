import "client-only";
import { useEffect, useState } from "react";

export type WindowSize = {
    width: number | undefined;
    height: number | undefined;
};

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        async function handleResize() {
            //await new Promise((resolve) => setTimeout(resolve, 250));

            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
};
