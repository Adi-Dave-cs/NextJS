import { removeUserFromSession } from "@/lib/sessionActions";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(req:NextRequest)
{
    try{        
        await removeUserFromSession(await cookies());
        return NextResponse.redirect(new URL('/signin'));
    }
    catch(err)
    {
        return NextResponse.json({message : `Error : ${err}`},{status : 500});
    }
}