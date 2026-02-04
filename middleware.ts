import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const APP_STORE_URL = 'https://apps.apple.com/app/id6751104982';
const DEEP_LINK_PATHS = ['/provider/', '/event/', '/booking/', '/profile/'];

function isMobileDevice(userAgent: string): boolean {
  return /iPhone|iPad|iPod|Android/i.test(userAgent);
}

function isIOS(userAgent: string): boolean {
  return /iPhone|iPad|iPod/i.test(userAgent);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // Serve apple-app-site-association with correct content type
  if (pathname === '/.well-known/apple-app-site-association') {
    const response = NextResponse.next();
    response.headers.set('Content-Type', 'application/json');
    return response;
  }

  // Check if this is a deep link path and user is on mobile
  const isDeepLink = DEEP_LINK_PATHS.some(path => pathname.startsWith(path));

  if (isDeepLink && isMobileDevice(userAgent)) {
    // Check for app-redirect query param to force redirect to app store
    if (request.nextUrl.searchParams.get('app-redirect') === 'true') {
      return NextResponse.redirect(APP_STORE_URL);
    }

    // For iOS, Universal Links will automatically try to open the app
    // If user lands here, it means app isn't installed or they chose to open in browser
    // We can show a banner or redirect based on your preference

    // Add header to indicate this is a deep link for the app banner
    const response = NextResponse.next();
    response.headers.set('X-Deep-Link', 'true');
    response.headers.set('X-App-Store-URL', APP_STORE_URL);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/.well-known/apple-app-site-association',
    '/provider/:path*',
    '/event/:path*',
    '/booking/:path*',
    '/profile/:path*',
  ],
};
