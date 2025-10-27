import { NextRequest, NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
});

export async function GET(request: NextRequest) {
  try {
    const bucketName = process.env.MEDIA_BUCKET_NAME;
    if (!bucketName) {
      return NextResponse.json(
        { error: 'MEDIA_BUCKET_NAME not configured' },
        { status: 500 }
      );
    }

    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: 'uploads/',
    });

    const response = await s3Client.send(command);

    if (!response.Contents || response.Contents.length === 0) {
      return NextResponse.json({ media: [] });
    }

    // Generate presigned URLs for each object
    const mediaWithUrls = await Promise.all(
      response.Contents.map(async (item) => {
        if (!item.Key) return null;

        const getObjectCommand = new GetObjectCommand({
          Bucket: bucketName,
          Key: item.Key,
        });

        const url = await getSignedUrl(s3Client, getObjectCommand, {
          expiresIn: 3600, // 1 hour
        });

        // Determine media type
        const isVideo = /\.(mp4|mov|avi|wmv|flv|webm)$/i.test(item.Key);
        const isImage = /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(item.Key);

        return {
          key: item.Key,
          url,
          size: item.Size,
          lastModified: item.LastModified,
          type: isVideo ? 'video' : isImage ? 'image' : 'unknown',
          fileName: item.Key.split('/').pop() || item.Key,
        };
      })
    );

    const validMedia = mediaWithUrls.filter((item) => item !== null);

    return NextResponse.json({ media: validMedia });
  } catch (error) {
    console.error('Error listing media:', error);
    return NextResponse.json(
      { error: 'Failed to list media' },
      { status: 500 }
    );
  }
}
