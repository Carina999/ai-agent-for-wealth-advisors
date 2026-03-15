import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: 'documents/',
    })

    return NextResponse.json({
      files: blobs.map((blob) => ({
        pathname: blob.pathname,
        filename: blob.pathname.split('/').pop() || 'unknown',
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      })),
    })
  } catch (error) {
    console.error('Error listing files:', error)
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
  }
}
