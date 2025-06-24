import { NextResponse } from 'next/server'

export async function middleware(request: Request) {
  const userAuthorized = request.headers.get('cookie');
  
  if (!userAuthorized) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/link1',
    '/link2',
  ],
}
