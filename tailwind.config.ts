import type { Config } from "tailwindcss";
import type { PluginUtils } from "tailwindcss/types/config";
import typography from "@tailwindcss/typography";
import { cpColors, cpTypography } from "./src/ui/_back/assets/tailwind.config";

const config: Config = {
    content: [
        "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                ...cpColors,
            },
            typography: ({ theme }: PluginUtils) => ({
                ...cpTypography(theme),
            }),
        },
    },
    plugins: [typography],
};

export default config;
