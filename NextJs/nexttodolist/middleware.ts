import { NextResponse, type NextRequest } from "next/server"
import {
  getUserFromSession,
  updateUserSessionExpiration,
} from "@/lib/sessionActions"

const privateRoutes = ["/dashboard","/api/:path*"]
const signinRoutes = ['/signin','/signup']
const adminRoutes = ["*/admin"]

export async function middleware(request: NextRequest) {
  const response = (await middlewareAuth(request)) ?? NextResponse.next()

  await updateUserSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value })
    },
    get: key => request.cookies.get(key),
  })

  return response
}

async function middlewareAuth(request: NextRequest) {
  const sessionId = request.cookies.get('session_identifier')?.value ?? 'unknown';
  const user = await getUserFromSession(sessionId);
  if(signinRoutes.includes(request.nextUrl.pathname))
  {
    if(user) return NextResponse.redirect(new URL('/dashboard',request.url));

    return;
  }
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    
    if(process.env.LOGGER_ENABLED)
    {
      console.log(request.cookies);
      console.log("Middleware triggered : ",user);
    }
    if (user == null) {
      return NextResponse.redirect(new URL("/signin", request.url))
    }
  }

  if (adminRoutes.includes(request.nextUrl.pathname)) {
    if (user == null) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    if (user.role !== "admin") {
      if(process.env.LOGGER_ENABLED)
        {
          console.log("Middleware not allowed admin");
        }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}