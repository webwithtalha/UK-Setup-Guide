import { NextResponse } from 'next/server';
import { connectDB, getConnectionStatus } from '@/lib/db/models';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ 
      success: true, 
      status: getConnectionStatus(),
      message: '✅ MongoDB connected successfully!' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      status: 'error',
      message: error instanceof Error ? error.message : 'Connection failed' 
    }, { status: 500 });
  }
}

