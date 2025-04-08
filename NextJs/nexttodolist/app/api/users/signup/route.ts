// app/api/signup/route.ts
import { NextResponse } from 'next/server';
import { userExists } from '@/lib/authActions';
import dbConnect from '@/lib/db';

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
  const uName = email.slice(0, email.indexOf('@'));

  const users = await userExists(uName);

  if (!users) {
    console.log('Signup received:', { email, password });
    return NextResponse.json({ message: 'User created' }, { status: 200 });
  }

  return NextResponse.json({ message: 'User Exists !' }, { status: 401 });
}
