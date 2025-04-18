import { NextResponse , NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User'; 
import { redisClient } from '@/lib/redis/redis';
import { generateHash } from '@/lib/passwordActions';
type Param = {
    params: Promise<{
    userEmail: string;
}>;};

export async function POST(request : NextRequest,context : Param) {
    try{
    await dbConnect();
    const userProvider = await context.params;
    const uemail = userProvider.userEmail;

    const body = await request.json();
    const { email, password, verification_code } = body;
    const code = await redisClient.get(`verification_code:${email}`);

    if(!code) return NextResponse.json({message:"No verification code"},{status : 403});

    if(code != verification_code)
    {
        return NextResponse.json({error:"Code not matched"},{status:403})
    }
    const newUser = await User.findOne({userEmail : uemail});
    newUser.password = await generateHash(password,newUser.salt);
    await newUser.save();
    await redisClient.del(`verification_code:${email}`);
    return NextResponse.json({message : "Password Changed successfully"},{status:200});
    }
    catch(err)
    {
        console.error("Error in verification",err);
        return NextResponse.json(err,{status:500});
    }
}