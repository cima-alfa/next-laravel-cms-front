import "@/front-ui/assets/globals.css";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
}
