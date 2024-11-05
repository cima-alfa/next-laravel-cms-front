import "@/front-ui/assets/globals.css";
import { link } from "@/lib/router/router";

import LayoutWrapper from "@/front-ui/components/layout/LayoutWrapper";
import LayoutHeader from "@/front-ui/components/layout/layout-header/LayoutHeader";
import HeaderLogo from "@/front-ui/components/layout/layout-header/HeaderLogo";
import PrimaryNavigationButton from "@/front-ui/components/layout/layout-header/PrimaryNavigationButton";
import PrimaryNavigation from "@/front-ui/components/layout/layout-header/PrimaryNavigation";
import LayoutMain from "@/front-ui/components/layout/LayoutMain";
import LayoutFooter from "@/front-ui/components/layout/LayoutFooter";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LayoutWrapper>
            <LayoutHeader>
                <HeaderLogo
                    href={link("front.page.permalink")}
                    title="Jeremy's Portfolio"
                    alt="Cima Alfa: Jeremy's Portfolio"
                />

                <PrimaryNavigationButton controls="--primary-navigation" />

                <PrimaryNavigation />
            </LayoutHeader>

            <LayoutMain>{children}</LayoutMain>

            <LayoutFooter>&copy; 2024</LayoutFooter>
        </LayoutWrapper>
    );
}
