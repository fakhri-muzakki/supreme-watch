import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  // verify signature
  // update payment
  // update order
  // reduce stock

  return NextResponse.json({ success: true });
}
