import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import Prisma from '@/lib/prisma';

interface SignupRequest {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const { email, password }: SignupRequest = await req.json();
  console.log({email,password});
  

  const hashedPassword = await bcrypt.hash(password, 10);

  // Store user in DB (Replace with actual DB logic)
  const user = await Prisma.user.create({ data: { email, password: hashedPassword } });

  return NextResponse.json({ user }, { status: 201 });
}

export async function GET(req: Request) {
    console.log({req})
    return NextResponse.json({ message: 'Signup route' });
}
