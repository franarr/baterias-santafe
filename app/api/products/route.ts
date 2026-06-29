import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

async function isAuth(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    await verifyToken(token);
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all') === '1';

  const rows = all
    ? await db.select().from(products).orderBy(asc(products.id))
    : await db.select().from(products).where(eq(products.published, true)).orderBy(asc(products.id));

  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  if (!(await isAuth(request))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await request.json();

  const [created] = await db
    .insert(products)
    .values({
      ...body,
      vehicles: JSON.stringify(body.vehicles || []),
      features: JSON.stringify(body.features || []),
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
