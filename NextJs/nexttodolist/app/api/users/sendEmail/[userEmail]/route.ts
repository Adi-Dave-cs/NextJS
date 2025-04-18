import { NextResponse , NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import nodemailer from "nodemailer";
import { redisClient } from '@/lib/redis/redis';
import crypto from "crypto";

type Param = {
    params: Promise<{
    userEmail: string;
}>;};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adityaenterprise1947@gmail.com',
      pass: process.env.GOOGLE_MAIL_PASSWORD, // Your 16-char app password
    },
  });

export async function POST(request: NextRequest, context:Param) {
  try {
    await dbConnect();
    const userProvider = await context.params;
    const email = userProvider.userEmail;
    const verification_code = crypto.randomBytes(8).toString('hex').normalize();

    if(!verification_code)
    {
        if(process.env.LOGGER_ENABLED)
        {
            console.log('Verification code issue!');
        }
    }
    const info = await transporter.sendMail({
        from: 'adityaenterprise1947@gmail.com',
        to: `${email}`,
        subject: 'NextTodo Verification Code',
        html: `<h2>Hello from NextTodo!</h2><p>This is the verification code : ${verification_code} </p>`,
      });
    
    const stored = await redisClient.set(`verification_code:${email}`,verification_code,{ex: 20*60});
    
    if(!stored)
    {
        if(process.env.LOGGER_ENABLED)
        {
            console.log('Upstash redis => value not stored! Value : ',stored);
        }
    }
    if(!info) return NextResponse.json({message : 'Email not sent!'},{status : 500});

    return NextResponse.json({ message: 'User Found' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Not Connected' }, { status: 404 });
  }
}