import { fetchUser } from "@/lib/data/auth";
import ControlPanelBar from "@/ui/components/ControlPanelBar/ControlPanelBar";

export default async function ControlPanelBarWrapper({
    className,
}: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
    const user = await fetchUser();

    return (
        <>
            {user && (
                <ControlPanelBar className={className} initialUser={user} />
            )}
        </>
    );
}
