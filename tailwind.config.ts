import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
    content: [
        "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                white: {
                    100: colors.neutral["100"],
                    200: colors.neutral["200"],
                    300: colors.neutral["300"],
                },
                black: {
                    100: colors.neutral["950"],
                    200: colors.neutral["900"],
                    300: colors.neutral["800"],
                },
                "cp-primary": colors.sky,
                "cp-neutral": colors.stone,
                "cp-accent": colors.orange,
                "cp-action-primary": colors.indigo,
                "cp-action-secondary": colors.emerald,
                "cp-impartial": colors.neutral,
                "cp-info": colors.blue,
                "cp-success": colors.green,
                "cp-warning": colors.amber,
                "cp-alert": colors.red,
            },
        },
    },
    plugins: [],
};
export default config;
