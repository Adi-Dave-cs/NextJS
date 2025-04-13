import { NextResponse, type NextRequest } from "next/server"
import {
  getUserFromSession,
  updateUserSessionExpiration,
} from "@/lib/sessionActions"

const privateRoutes = ["/dashboard","/api/:path*","/admin"]
const adminRoutes = ["/admin","/api/admin"]

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
  
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    const sessionId = request.cookies.get('session_identifier')?.value ?? 'unknown';
    const user = await getUserFromSession(sessionId);
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
    const sessionId = request.cookies.get('session_identifier')?.value ?? 'unknown';
    const user = await getUserFromSession(sessionId);
    console.log("Entered admin api");
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