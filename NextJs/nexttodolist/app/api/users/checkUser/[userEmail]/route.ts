import { NextResponse , NextRequest } from 'next/server';
import { userExists } from '@/lib/authActions';
import dbConnect from '@/lib/db';

type Param = {
    params: Promise<{
    userEmail: string;
}>;};

export async function GET(request: NextRequest, context:Param) {
  try {
    await dbConnect();
    const userProvider = await context.params;
    const email = userProvider.userEmail;

    const user = await userExists(email);

    if(!user) return NextResponse.json({message : 'User does not exist'},{status : 404});

    return NextResponse.json({ message: 'User Found' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Not Connected' }, { status: 404 });
  }
}