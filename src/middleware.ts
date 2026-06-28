import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminLogin = request.nextUrl.pathname === "/po-console/login";
  const isAdminArea =
    request.nextUrl.pathname.startsWith("/po-console") && !isAdminLogin;

  if (isAdminArea && !user) {
    return NextResponse.redirect(new URL("/po-console/login", request.url));
  }

  if (isAdminLogin && user) {
    return NextResponse.redirect(new URL("/po-console", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/po-console/:path*"],
};
