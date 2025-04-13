import { getUserFromSession } from "./sessionActions";
import { cookies } from "next/headers";

export const getCurrentUser = async ()=>{
    const cookie = await cookies();
    return await getUserFromSession(cookie.get('session_identifier')?.value ?? 'unknown');
};