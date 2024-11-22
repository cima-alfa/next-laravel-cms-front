import { fetchUser } from "@/lib/data/users";
import ControlPanelBarClient from "@/ui/components/ControlPanelBar/ControlPanelBar";

export default async function ControlPanelBar({
    className,
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    const user = await fetchUser();

    return (
        <>
            {user && (
                <ControlPanelBarClient
                    className={className}
                    initialUser={user}
                />
            )}
        </>
    );
}
