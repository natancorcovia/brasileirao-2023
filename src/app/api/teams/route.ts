import { NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';

export async function GET() {
  try {
    const teams = await prisma.team.findMany();
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Erro ao buscar times:', error);
    return NextResponse.json({ error: 'Erro ao buscar times' }, { status: 500 });
  }
}
