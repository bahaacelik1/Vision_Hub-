import { NextResponse } from 'next/server';
import { registerUser, RegisterInput } from '@vision/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = RegisterInput.parse(body);
    const user = await registerUser(input);
    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Kayıt başarısız';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
