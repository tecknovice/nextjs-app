import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import Prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import {SignJWT} from 'jose';

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const { email, password }: LoginRequest = await req.json();

  const user = await Prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  // Generate JWT token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)
  const alg = 'HS256'
  
  const token = await new SignJWT({ id: user.id, email: user.email})
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  (await cookies()).set('token', token, { httpOnly: true, secure: true, path: '/' });

  return NextResponse.json({ message: 'Login successful' });
}
