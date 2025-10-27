import { NextRequest, NextResponse } from 'next/server';
import {
  RekognitionClient,
  SearchFacesByImageCommand,
} from '@aws-sdk/client-rekognition';

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

const rekognitionClient = new RekognitionClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json();

    if (!imageData) {
      return NextResponse.json(
        { error: 'imageData is required (base64 encoded image)' },
        { status: 400 }
      );
    }

    const collectionId = process.env.REKOGNITION_COLLECTION_ID;

    if (!collectionId) {
      return NextResponse.json(
        { error: 'REKOGNITION_COLLECTION_ID not configured' },
        { status: 500 }
      );
    }

    // Convert base64 to buffer
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Validate that we have a valid buffer
    if (!buffer || buffer.length === 0) {
      return NextResponse.json(
        { error: 'Invalid image data' },
        { status: 400 }
      );
    }

    // Use image bytes directly instead of S3 for more reliable face searching
    const command = new SearchFacesByImageCommand({
      CollectionId: collectionId,
      Image: {
        Bytes: buffer,
      },
      MaxFaces: 10,
      FaceMatchThreshold: 70, // 70% confidence threshold
    });

    const response = await rekognitionClient.send(command);

    if (!response.FaceMatches || response.FaceMatches.length === 0) {
      return NextResponse.json({
        success: true,
        matches: [],
        message: 'No matching faces found',
      });
    }

    // Map matches to include relevant information
    const matches = response.FaceMatches.map((match) => ({
      faceId: match.Face?.FaceId,
      externalImageId: match.Face?.ExternalImageId,
      similarity: match.Similarity,
      confidence: match.Face?.Confidence,
    }));

    return NextResponse.json({
      success: true,
      matches,
      message: `Found ${matches.length} matching face(s)`,
    });
  } catch (error: any) {
    console.error('Error searching faces:', error);

    // Handle specific Rekognition errors
    if (error.name === 'InvalidParameterException') {
      return NextResponse.json(
        { error: 'Invalid image or no faces detected in the search image' },
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
      { error: 'Failed to search faces' },
      { status: 500 }
    );
  }
}
