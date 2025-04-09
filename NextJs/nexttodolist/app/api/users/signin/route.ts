// app/api/signin/route.ts
import { NextResponse } from 'next/server';
import { userExists } from '@/lib/authActions';
import dbConnect from '@/lib/db';
import {comparePassword, generateHash, generateSalt} from '@/lib/passwordActions';
import {createUserSession} from '@/lib/sessionActions';
import User from '@/models/User';
import { cookies } from 'next/headers';
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;
  const user = await userExists(email);

  if (user) {
    const salt = user?.salt;
    const success = comparePassword(user.password,password,salt);

    if(!success)
      return NextResponse.json({message : 'Could not create User'},{status : 500});
    
    await createUserSession(user.userName,user.role, await cookies());

    return NextResponse.json({ message: 'User Entered' }, { status: 200 });
  }

  return NextResponse.json({ message: 'User Does Not Exists !' }, { status: 404 });
}
