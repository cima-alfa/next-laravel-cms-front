import type { Config } from "tailwindcss";
import type { PluginUtils } from "tailwindcss/types/config";
import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import { cpColors, cpTypography } from "./src/ui/_back/assets/tailwind.config";

const config: Config = {
    content: [
        "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            containers: {
                "8xl": "96rem",
            },
            colors: {
                ...cpColors,
            },
            typography: ({ theme }: PluginUtils) => ({
                ...cpTypography(theme),
            }),
        },
    },
    plugins: [containerQueries, typography, forms],
};

export default config;
