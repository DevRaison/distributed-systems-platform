import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    authenticated: false,
    message: "Auth sandbox endpoint active" 
  });
}

export async function POST() {
  return NextResponse.json({ 
    success: true, 
    token: "mock-sandbox-token" 
  });
}
