import { NextRequest, NextResponse } from 'next/server';
import { RekognitionClient, IndexFacesCommand } from '@aws-sdk/client-rekognition';

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

const rekognitionClient = new RekognitionClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

export async function POST(request: NextRequest) {
  try {
    const { s3Key, fileName } = await request.json();

    if (!s3Key) {
      return NextResponse.json(
        { error: 's3Key is required' },
        { status: 400 }
      );
    }

    const bucketName = process.env.MEDIA_BUCKET_NAME;
    const collectionId = process.env.REKOGNITION_COLLECTION_ID;

    if (!bucketName || !collectionId) {
      return NextResponse.json(
        { error: 'MEDIA_BUCKET_NAME or REKOGNITION_COLLECTION_ID not configured' },
        { status: 500 }
      );
    }

    // Index faces in the image
    const command = new IndexFacesCommand({
      CollectionId: collectionId,
      Image: {
        S3Object: {
          Bucket: bucketName,
          Name: s3Key,
        },
      },
      ExternalImageId: fileName || s3Key,
      DetectionAttributes: ['ALL'],
      MaxFaces: 10,
      QualityFilter: 'AUTO',
    });

    const response = await rekognitionClient.send(command);

    if (!response.FaceRecords || response.FaceRecords.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No faces detected in the image',
        facesIndexed: 0,
      });
    }

    return NextResponse.json({
      success: true,
      facesIndexed: response.FaceRecords.length,
      faceIds: response.FaceRecords.map((record) => record.Face?.FaceId),
      message: `Successfully indexed ${response.FaceRecords.length} face(s)`,
    });
  } catch (error: any) {
    console.error('Error indexing faces:', error);

    // Handle specific Rekognition errors
    if (error.name === 'InvalidParameterException') {
      return NextResponse.json(
        { error: 'Invalid image or no faces detected' },
        { status: 400 }
      );
    }

    if (error.name === 'ResourceNotFoundException') {
      return NextResponse.json(
        { error: 'Rekognition collection not found. Please create the collection first.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to index faces' },
      { status: 500 }
    );
  }
}
