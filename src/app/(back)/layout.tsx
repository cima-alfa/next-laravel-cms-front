import LayoutHeader from "@/back-ui/components/layout/layout-header/LayoutHeader";
import PrimaryNavigation from "@/back-ui/components/layout/layout-header/PrimaryNavigation";
import LayoutFooter from "@/back-ui/components/layout/LayoutFooter";
import LayoutMain from "@/back-ui/components/layout/LayoutMain";
import LayoutWrapper from "@/back-ui/components/layout/LayoutWrapper";
import "@/back-ui/assets/globals.css";
import AppTopLoader from "nextjs-toploader";
import { cpColors } from "@/back-ui/assets/tailwind.config";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AppTopLoader
                showSpinner={false}
                color={cpColors["cp-primary"][500]}
            />

            <LayoutWrapper>
                <LayoutHeader>
                    <PrimaryNavigation />
                </LayoutHeader>

                <LayoutMain>{children}</LayoutMain>

                <LayoutFooter>
                    {new Date().getFullYear()} CMS by Jeremy Stepanek
                </LayoutFooter>
            </LayoutWrapper>
        </>
    );
}
