import { getCurrentUser } from "@/lib/userAction";


export default async function Dashboard()
{
    const user = await getCurrentUser();
    return <><h1 className="text-6xl text-pretty text-primary">hi {user?.uName} welcome to dashboard!</h1></>
}