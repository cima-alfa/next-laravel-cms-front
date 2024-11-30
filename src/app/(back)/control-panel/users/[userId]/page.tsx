import UserProfile from "@/back-ui/components/app/users/UserProfile";
import { fetchUser, User } from "@/lib/data/users";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ userId: string }>;
}

export default async function Page({ params }: Readonly<Props>) {
    const { userId } = await params;

    const user = await fetchUser(userId);
    const currentUser = (await fetchUser()) as User;

    if (!user) {
        return notFound();
    }

    return (
        <>
            <h1>User: {user.name_display}</h1>

            <UserProfile user={user} currentUser={currentUser} />
        </>
    );
}
