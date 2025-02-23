import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtVerify} from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)
    const { payload, protectedHeader } = await jwtVerify(token, secret);
    console.log({ payload, protectedHeader });
    return NextResponse.next();
  } catch (error) {
    console.error({error});
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }
}

// Apply middleware to protected API routes
export const config = {
  matcher: '/api/dashboard/:path*',
};
