import colors from "tailwindcss/colors";
import type { PluginUtils } from "tailwindcss/types/config";

export const cpColors = {
    "cp-white": {
        100: colors.stone["50"],
        200: colors.stone["100"],
        300: colors.stone["200"],
    },
    "cp-black": {
        100: colors.stone["950"],
        200: colors.stone["900"],
        300: colors.stone["800"],
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
};

export const cpTypography = (theme: PluginUtils["theme"]) => {
    return {
        DEFAULT: {
            css: {
                maxWidth: "none",
            },
        },

        light: {
            css: {
                a: { color: theme("colors[cp-action-secondary][800]") },
                "--tw-prose-body": theme("colors[cp-black][100]"),
                "--tw-prose-headings": "inherit",
                "--tw-prose-lead": "inherit",
                "--tw-prose-links": theme("colors[cp-action-primary][700]"),
                "--tw-prose-bold": "inherit",
                "--tw-prose-counters": "inherit",
                "--tw-prose-bullets": "inherit",
                "--tw-prose-hr": "inherit",
                "--tw-prose-quotes": "inherit",
                "--tw-prose-quote-borders": theme("colors[cp-info][700]"),
                "--tw-prose-captions": "inherit",
                "--tw-prose-code": "inherit",
                "--tw-prose-pre-code": "inherit",
                "--tw-prose-pre-bg": "transparent",
                "--tw-prose-th-borders": theme("colors[cp-black][100]"),
                "--tw-prose-td-borders": theme("colors[cp-black][100]"),
                "--tw-prose-invert-body": theme("colors[cp-white][100]"),
                "--tw-prose-invert-headings": "inherit",
                "--tw-prose-invert-lead": "inherit",
                "--tw-prose-invert-links": theme(
                    "colors[cp-action-primary][300]"
                ),
                "--tw-prose-invert-bold": "inherit",
                "--tw-prose-invert-counters": "inherit",
                "--tw-prose-invert-bullets": "inherit",
                "--tw-prose-invert-hr": "inherit",
                "--tw-prose-invert-quotes": "inherit",
                "--tw-prose-invert-quote-borders": theme(
                    "colors[cp-info][300]"
                ),
                "--tw-prose-invert-captions": "inherit",
                "--tw-prose-invert-code": "inherit",
                "--tw-prose-invert-pre-code": "inherit",
                "--tw-prose-invert-pre-bg": "transparent",
                "--tw-prose-invert-th-borders": theme("colors[cp-white][100]"),
                "--tw-prose-invert-td-borders": theme("colors[cp-white][100]"),
            },
        },

        dark: {
            css: {
                a: { color: theme("colors[cp-action-secondary][200]") },
                "--tw-prose-body": theme("colors[cp-white][100]"),
                "--tw-prose-headings": "inherit",
                "--tw-prose-lead": "inherit",
                "--tw-prose-links": theme("colors[cp-action-primary][300]"),
                "--tw-prose-bold": "inherit",
                "--tw-prose-counters": "inherit",
                "--tw-prose-bullets": "inherit",
                "--tw-prose-hr": "inherit",
                "--tw-prose-quotes": "inherit",
                "--tw-prose-quote-borders": theme("colors[cp-info][300]"),
                "--tw-prose-captions": "inherit",
                "--tw-prose-code": "inherit",
                "--tw-prose-pre-code": "inherit",
                "--tw-prose-pre-bg": "transparent",
                "--tw-prose-th-borders": theme("colors[cp-white][100]"),
                "--tw-prose-td-borders": theme("colors[cp-white][100]"),
                "--tw-prose-invert-body": theme("colors[cp-black][100]"),
                "--tw-prose-invert-headings": "inherit",
                "--tw-prose-invert-lead": "inherit",
                "--tw-prose-invert-links": theme(
                    "colors[cp-action-primary][700]"
                ),
                "--tw-prose-invert-bold": "inherit",
                "--tw-prose-invert-counters": "inherit",
                "--tw-prose-invert-bullets": "inherit",
                "--tw-prose-invert-hr": "inherit",
                "--tw-prose-invert-quotes": "inherit",
                "--tw-prose-invert-quote-borders": theme(
                    "colors[cp-info][700]"
                ),
                "--tw-prose-invert-captions": "inherit",
                "--tw-prose-invert-code": "inherit",
                "--tw-prose-invert-pre-code": "inherit",
                "--tw-prose-invert-pre-bg": "transparent",
                "--tw-prose-invert-th-borders": theme("colors[cp-black][100]"),
                "--tw-prose-invert-td-borders": theme("colors[cp-black][100]"),
            },
        },
    };
};
