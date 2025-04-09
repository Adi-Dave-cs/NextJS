// app/api/signup/route.ts
import { NextResponse } from 'next/server';
import { userExists } from '@/lib/authActions';
import dbConnect from '@/lib/db';
import {generateHash, generateSalt} from '@/lib/passwordActions';
import {createUserSession} from '@/lib/sessionActions';
import User from '@/models/User';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    await dbConnect();
    return NextResponse.json({ message: 'Connected' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Not Connected' }, { status: 404 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, confirmPassword } = body;
  const users = await userExists(email);

  if (!users) {
    const genSalt = generateSalt();
    const hashedPassword = await generateHash(password,genSalt);
    const userSalt = generateSalt();
    const uName = email.slice(0,email.indexOf('@')) + '_' + userSalt;
    const newuser = new User({userEmail:email, userName:uName, salt : genSalt,role:'user', password:hashedPassword });
    const success = await newuser.save();
    if(!success)
      return NextResponse.json({message : 'Could not create User'},{status : 500});
    
    await createUserSession(uName,'user', await cookies());

    return NextResponse.json({ message: 'User created' }, { status: 200 });
  }

  return NextResponse.json({ message: 'User Exists !' }, { status: 401 });
}
