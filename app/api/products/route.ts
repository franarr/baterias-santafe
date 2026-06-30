import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { verifyToken, COOKIE_NAME } from '@/lib/jwt';
import { sanitizeProductInput } from '@/lib/products';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

function isUniqueError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /unique|constraint/i.test(msg);
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

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const result = sanitizeProductInput(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  try {
    const [created] = await db.insert(products).values(result.data).returning();
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    if (isUniqueError(err)) {
      return NextResponse.json(
        { error: `Ya existe un producto con el slug "${result.data.slug}". Cambiá el slug.` },
        { status: 409 }
      );
    }
    console.error('POST /api/products', err);
    return NextResponse.json({ error: 'No se pudo crear el producto' }, { status: 500 });
  }
}
