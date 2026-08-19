import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const AUTH_COOKIE_NAME = 'admin_auth_token';

// Simple deterministic signature token for the admin session
function getExpectedToken(): string {
  // Simple token based on current admin password and a secret salt
  return Buffer.from(`admin-session:${ADMIN_PASSWORD}:auth-key`).toString('base64');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin passkey' },
        { status: 401 }
      );
    }

    const token = getExpectedToken();
    const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ success: false, message: 'Authentication error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  const expectedToken = getExpectedToken();

  if (token && token === expectedToken) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
}
