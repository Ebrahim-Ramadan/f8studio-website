import { getProjectImageData } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const { id, imageId } = await params

    const image = await getProjectImageData(id, imageId)

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    // Convert Buffer to Uint8Array for the response
    const imageBuffer = Buffer.isBuffer(image.image_data)
      ? image.image_data
      : Buffer.from(image.image_data)

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': image.mime_type || 'image/jpeg',
        'Cache-Control': 'no-store, max-age=0',
        'Content-Disposition': `inline; filename="${image.filename}"`,
      },
    })
  } catch (error) {
    console.error('Error fetching image:', error)
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 })
  }
}
