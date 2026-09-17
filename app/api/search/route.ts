import { searchDocumentation } from '@/lib/docs/repository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const productId = searchParams.get('productId') || undefined;

  const results = await searchDocumentation(query, productId);
  return NextResponse.json({ results });
}
