"use client";

import "@/front-ui/assets/globals.css";
import { useState } from "react";
import { route } from "@/lib/router/router";
import { useSetSourceMedia } from "@/lib/utils/theme";

import LayoutWrapper from "@/ui/_front/components/LayoutWrapper";
import LayoutHeader from "@/ui/_front/components/layout-header/LayoutHeader";
import HeaderLogo from "@/ui/_front/components/layout-header/HeaderLogo";
import PrimaryNavigationButton from "@/ui/_front/components/layout-header/PrimaryNavigationButton";
import PrimaryNavigation from "@/ui/_front/components/layout-header/PrimaryNavigation";
import LayoutMain from "@/ui/_front/components/LayoutMain";
import LayoutFooter from "@/ui/_front/components/LayoutFooter";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useSetSourceMedia();

    const [primaryNavExpanded, setPrimaryNavExpanded] = useState(false);

    return (
        <LayoutWrapper>
            <LayoutHeader>
                <HeaderLogo
                    href={route("front.page.permalink")}
                    title="Jeremy's Portfolio"
                    alt="Cima Alfa: Jeremy's Portfolio"
                />

                <PrimaryNavigationButton
                    primaryNavExpanded={primaryNavExpanded}
                    setPrimaryNavExpanded={setPrimaryNavExpanded}
                />

                <PrimaryNavigation />
            </LayoutHeader>

            <LayoutMain>{children}</LayoutMain>

            <LayoutFooter>&copy; 2024</LayoutFooter>
        </LayoutWrapper>
    );
}
