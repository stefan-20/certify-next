import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export async function GET(request: Request) {
  try {
    const results = await prisma.user.findMany({
      //   where:{
      //     email : {contains:query, mode:'insensitive'}
      //   }
    });

    const options = results.map((result) => ({
      value: result.id,
      label: result.email,
    }));
    return NextResponse.json({ results: options });
  } catch (error) {
    console.error('Failed to fetch options:', error);
    throw new Error('Failed to fetch options.');
  }
  // return NextResponse.json({message:'hello world'})
}
