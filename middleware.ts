import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtVerify} from 'jose';

export async function middleware(req: NextRequest) {
  const signinUrl = req.nextUrl.clone()
  signinUrl.pathname = '/signin'

  const token = req.cookies.get('token')?.value;

  if (!token) {
    if(isApiRoute(req)){
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    else{
      return NextResponse.redirect(signinUrl);
    }
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.error({error});
    if(isApiRoute(req)){
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }
    else{
      return NextResponse.redirect(signinUrl);
    }
  }
}

// Apply middleware to protected API routes
export const config = {
  matcher: ['/api/dashboard/:path*','/dashboard/:path*'],
};

function isApiRoute(req: NextRequest) {
  return req.nextUrl.pathname.startsWith('/api');
}
