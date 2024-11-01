import "@/front-ui/assets/globals.css";
import { link } from "@/lib/router/router";

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
    return (
        <LayoutWrapper>
            <LayoutHeader>
                <HeaderLogo
                    href={link("front.page.permalink")}
                    title="Jeremy's Portfolio"
                    alt="Cima Alfa: Jeremy's Portfolio"
                />

                <PrimaryNavigationButton />

                <PrimaryNavigation />
            </LayoutHeader>

            <LayoutMain>{children}</LayoutMain>

            <LayoutFooter>&copy; 2024</LayoutFooter>
        </LayoutWrapper>
    );
}
