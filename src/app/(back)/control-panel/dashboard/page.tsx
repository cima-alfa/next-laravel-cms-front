import UserSessions from "@/back-ui/components/dashboard/UserSessions";
import { fetchUserSessions } from "@/lib/data/users";

export default async function Page() {
    const sessions = await fetchUserSessions();

    return (
        <>
            <h1>Dashboard</h1>

            <UserSessions sessions={sessions} />
        </>
    );
}
