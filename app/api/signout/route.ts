import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  (await cookies()).set('token', '', { expires: new Date(0), path: '/' });

  return NextResponse.json({ message: 'Logged out successfully' });
}
