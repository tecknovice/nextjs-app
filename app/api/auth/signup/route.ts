import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import Prisma from '@/lib/prisma';

interface SignupRequest {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const { email, password }: SignupRequest = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  //Check if user already exists (Replace with actual DB logic)
  const existingUser = await Prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Store user in DB (Replace with actual DB logic)
  const user = await Prisma.user.create({ data: { email, password: hashedPassword } });

  return NextResponse.json({ user }, { status: 201 });
}
