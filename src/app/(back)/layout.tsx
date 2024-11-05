import LayoutHeader from "@/back-ui/components/layout/layout-header/LayoutHeader";
import PrimaryNavigation from "@/back-ui/components/layout/layout-header/PrimaryNavigation";
import LayoutFooter from "@/back-ui/components/layout/LayoutFooter";
import LayoutMain from "@/back-ui/components/layout/LayoutMain";
import LayoutWrapper from "@/back-ui/components/layout/LayoutWrapper";
import "@/back-ui/assets/globals.css";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LayoutWrapper>
            <LayoutHeader>
                <PrimaryNavigation />
            </LayoutHeader>

            <LayoutMain>{children}</LayoutMain>

            <LayoutFooter>
                {new Date().getFullYear()} CMS by Jeremy Stepanek
            </LayoutFooter>
        </LayoutWrapper>
    );
}
