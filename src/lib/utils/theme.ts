import { useEffect } from "react";

/**
 * Source: https://larsmagnus.co/blog/how-to-make-images-react-to-light-and-dark-mode
 * Make <picture> <source> elements with media="(prefers-color-scheme:)"
 * respect custom theme preference overrides.
 * Otherwise the `media` preference will only respond to the OS-level setting
 */
export const updateSourceMedia = (
    colorPreference: "light" | "dark" | null
): void => {
    const pictures = document.querySelectorAll("picture");

    pictures.forEach((picture) => {
        const sources: NodeListOf<HTMLSourceElement> =
            picture.querySelectorAll(`
          source[media*="prefers-color-scheme"], 
          source[data-media*="prefers-color-scheme"]
        `);

        sources.forEach((source) => {
            if (
                colorPreference &&
                source?.dataset.media?.includes(colorPreference)
            ) {
                source.media = "all";
            } else if (!colorPreference && source?.dataset.media) {
                source.media = source.dataset.media;
            } else if (source) {
                source.media = "none";
            }
        });
    });
};

export const useSetSourceMedia = () => {
    useEffect(() => {
        const pictures = document.querySelectorAll("picture");

        pictures.forEach((picture) => {
            const sources: NodeListOf<HTMLSourceElement> =
                picture.querySelectorAll(`
                    source[media*="prefers-color-scheme"], 
                    source[data-media*="prefers-color-scheme"]
                `);

            sources.forEach((source) => {
                if (source?.media.includes("prefers-color-scheme")) {
                    source.dataset.media = source.media;
                }
            });
        });
    }, []);
};
