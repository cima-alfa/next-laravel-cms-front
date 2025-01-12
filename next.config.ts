import { NextConfig } from "next";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

const nextConfig: NextConfig = {
    poweredByHeader: false,
    devIndicators: {
        appIsrStatus: false,
    },
    webpack: (config) => {
        config.plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: path.join(__dirname, "node_modules/tinymce"),
                        to: path.join(__dirname, "public/assets/lib/tinymce"),
                    },
                ],
            })
        );
        return config;
    },
};

export default nextConfig;
