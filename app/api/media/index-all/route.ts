import { NextRequest, NextResponse } from 'next/server';
import { RekognitionClient, IndexFacesCommand } from '@aws-sdk/client-rekognition';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

const rekognitionClient = new RekognitionClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
});

export async function POST(request: NextRequest) {
  try {
    const bucketName = process.env.MEDIA_BUCKET_NAME;
    const collectionId = process.env.REKOGNITION_COLLECTION_ID;

    if (!bucketName || !collectionId) {
      return NextResponse.json(
        { error: 'MEDIA_BUCKET_NAME or REKOGNITION_COLLECTION_ID not configured' },
        { status: 500 }
      );
    }

    // List all objects in the uploads folder
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: 'uploads/',
    });

    const listResponse = await s3Client.send(listCommand);
    const objects = listResponse.Contents || [];

    // Filter for image files only
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const imageObjects = objects.filter((obj) => {
      const key = obj.Key || '';
      return imageExtensions.some((ext) => key.toLowerCase().endsWith(ext));
    });

    if (imageObjects.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No images found to index',
        indexed: 0,
      });
    }

    // Index each image
    const results = [];
    for (const obj of imageObjects) {
      const key = obj.Key!;
      const fileName = key.split('/').pop() || key;

      try {
        const command = new IndexFacesCommand({
          CollectionId: collectionId,
          Image: {
            S3Object: {
              Bucket: bucketName,
              Name: key,
            },
          },
          ExternalImageId: fileName,
          DetectionAttributes: ['ALL'],
          MaxFaces: 10,
          QualityFilter: 'AUTO',
        });

        const response = await rekognitionClient.send(command);

        results.push({
          key,
          fileName,
          success: true,
          facesFound: response.FaceRecords?.length || 0,
        });
      } catch (error: any) {
        console.error(`Error indexing ${key}:`, error);
        results.push({
          key,
          fileName,
          success: false,
          error: error.message || 'Failed to index',
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;
    const totalFaces = results.reduce((sum, r) => sum + (r.facesFound || 0), 0);

    return NextResponse.json({
      success: true,
      message: `Indexed ${successCount} of ${imageObjects.length} images, found ${totalFaces} face(s)`,
      totalImages: imageObjects.length,
      indexed: successCount,
      totalFaces,
      details: results,
    });
  } catch (error: any) {
    console.error('Error indexing all faces:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to index faces' },
      { status: 500 }
    );
  }
}
