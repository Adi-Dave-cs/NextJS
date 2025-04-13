import { getUserFromSession } from "./sessionActions";
import { cookies } from "next/headers";

export const getCurrentUser = async ()=>{
    return await getUserFromSession(await cookies());
};