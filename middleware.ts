import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const { pathname } = req.nextUrl

  const signinUrl = req.nextUrl.clone()
  signinUrl.pathname = "/signin"

  const dashboardUrl = req.nextUrl.clone()
  dashboardUrl.pathname = "/dashboard"

  if (!token) {
    // If no token and accessing protected routes, redirect to signin or return 401
    if (isProtectedRoute(pathname)) {
      return handleUnauthorized(req, signinUrl)
    }
    return NextResponse.next()
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)
    await jwtVerify(token, secret)

    // If authenticated and on /signin or /signup, redirect to /dashboard
    if (isAuthPage(pathname)) {
      return NextResponse.redirect(dashboardUrl)
    }

    return NextResponse.next()
  } catch (error) {
    console.error({ error })

    // Delete invalid token and redirect to signin
    const response = handleUnauthorized(req, signinUrl)
    response.cookies.set("token", "", { expires: new Date(0), path: "/" })
    return response
  }
}

// **Define which routes are protected**
function isProtectedRoute(pathname: string) {
  return (
    pathname.startsWith("/api/dashboard") || pathname.startsWith("/dashboard")
  )
}

// **Check if the user is visiting auth pages (signin/signup)**
function isAuthPage(pathname: string) {
  return pathname === "/signin" || pathname === "/signup"
}

// **Handle unauthorized access**
function handleUnauthorized(req: NextRequest, signinUrl: URL) {
  return isApiRoute(req)
    ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    : NextResponse.redirect(signinUrl)
}

// **Check if the request is for an API route**
function isApiRoute(req: NextRequest) {
  return req.nextUrl.pathname.startsWith("/api")
}

// **Apply middleware to protected and auth-related routes**
export const config = {
  matcher: ["/api/dashboard/:path*", "/dashboard/:path*", "/signin", "/signup"],
}
