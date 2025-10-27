# Media Gallery Setup Guide

This guide will walk you through setting up the Admin Panel and Gallery features with AWS Rekognition facial recognition.

## 🏗️ Architecture Overview

The solution uses a **serverless architecture** compatible with AWS Amplify Hosting:

- **S3 Bucket**: Stores high-quality photos and videos
- **AWS Rekognition**: Facial recognition collection for face indexing and search
- **Next.js API Routes**: Serverless Lambda functions for backend operations
- **Client-side Pages**: React components for admin upload and gallery display

### Pages Created
1. `/admin` - Upload interface for admins to add photos/videos
2. `/gallery` - Public gallery with download and facial recognition search

### API Endpoints Created
- `POST /api/media/upload` - Generate presigned S3 upload URLs
- `GET /api/media/list` - List all media from S3 bucket
- `POST /api/media/index-face` - Index faces in uploaded images to Rekognition
- `POST /api/media/search-face` - Search faces using webcam capture

---

## 📋 Prerequisites

- AWS Account with appropriate permissions
- AWS CLI configured on your machine
- Node.js 18+ and npm installed
- Access to AWS Management Console

---

## 🚀 Setup Steps

### Step 1: Create S3 Bucket

1. **Open AWS S3 Console**: https://s3.console.aws.amazon.com/
2. **Click "Create bucket"**
3. **Configure bucket**:
   - **Bucket name**: `your-media-bucket-name` (must be globally unique)
   - **Region**: `ap-south-1` (or your preferred region)
   - **Block Public Access**: Keep all public access blocked (we'll use presigned URLs)
   - **Bucket Versioning**: Disabled (optional, can enable if needed)
   - **Encryption**: Enable server-side encryption (SSE-S3)
4. **Click "Create bucket"**

#### Configure CORS for the bucket

1. Go to your bucket → **Permissions** tab → **CORS configuration**
2. Add this CORS policy:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": ["ETag"]
    }
]
```

3. **Save changes**

---

### Step 2: Create AWS Rekognition Collection

AWS Rekognition requires a collection to store face indexes.

#### Using AWS CLI:

```bash
# Create the collection
aws rekognition create-collection \
  --collection-id "media-gallery-faces" \
  --region ap-south-1

# Verify the collection was created
aws rekognition list-collections --region ap-south-1
```

#### Using AWS Console:

1. Go to **AWS Rekognition Console**: https://console.aws.amazon.com/rekognition/
2. Navigate to **Collections** in the sidebar
3. Click **Create collection**
4. Enter collection ID: `media-gallery-faces`
5. Click **Create**

**Note**: AWS Rekognition is available in specific regions. If `ap-south-1` doesn't support it, use `us-east-1` or `us-west-2`.

---

### Step 3: Set Up IAM Permissions

Your AWS credentials need permissions for S3 and Rekognition operations.

#### Option A: Create a new IAM User (Recommended)

1. **Open IAM Console**: https://console.aws.amazon.com/iam/
2. **Click "Users" → "Create user"**
3. **User name**: `media-gallery-service`
4. **Select "Access key - Programmatic access"**
5. **Click "Next: Permissions"**
6. **Click "Attach policies directly"**
7. **Attach these policies**:
   - `AmazonS3FullAccess` (or create a custom policy with S3 permissions)
   - `AmazonRekognitionFullAccess` (or create a custom policy)
8. **Complete user creation and save the credentials**

#### Option B: Custom IAM Policy (More Secure)

Create a custom policy with minimal permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::your-media-bucket-name",
        "arn:aws:s3:::your-media-bucket-name/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "rekognition:IndexFaces",
        "rekognition:SearchFacesByImage",
        "rekognition:ListFaces",
        "rekognition:DeleteFaces",
        "rekognition:CreateCollection",
        "rekognition:DescribeCollection"
      ],
      "Resource": "*"
    }
  ]
}
```

---

### Step 4: Configure Environment Variables

1. **Copy the example environment file**:

```bash
cp .env.example .env.local
```

2. **Edit `.env.local` with your AWS configuration**:

```bash
# AWS Configuration
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# S3 Bucket for Media Storage
MEDIA_BUCKET_NAME=your-media-bucket-name

# AWS Rekognition Collection ID
REKOGNITION_COLLECTION_ID=media-gallery-faces

# Existing OpenAI Configuration (already in use)
AWS_SECRET_NAME=your-secret-name-for-openai-key
```

**Important**:
- Replace `your-media-bucket-name` with your actual S3 bucket name
- Replace AWS credentials with your actual IAM user credentials
- Never commit `.env.local` to version control (already in `.gitignore`)

---

### Step 5: Install Dependencies

The required AWS SDK packages have already been installed. If you need to reinstall:

```bash
npm install
```

---

### Step 6: Test Locally

1. **Start the development server**:

```bash
npm run dev
```

2. **Test the Admin Panel**:
   - Open: http://localhost:3000/admin
   - Upload a test image with faces
   - Verify upload succeeds and faces are indexed

3. **Test the Gallery**:
   - Open: http://localhost:3000/gallery
   - Verify images appear
   - Click "Search by Face" and test webcam facial recognition
   - Test download functionality

---

### Step 7: Deploy to AWS Amplify

#### For Existing Amplify App:

1. **Set environment variables in Amplify Console**:
   - Go to your Amplify app → **Environment variables**
   - Add all variables from `.env.local`:
     - `AWS_REGION`
     - `AWS_ACCESS_KEY_ID`
     - `AWS_SECRET_ACCESS_KEY`
     - `MEDIA_BUCKET_NAME`
     - `REKOGNITION_COLLECTION_ID`

2. **Deploy your changes**:

```bash
git add .
git commit -m "Add media gallery with facial recognition"
git push origin main
```

3. **Amplify will automatically deploy** the changes

#### For New Amplify Deployment:

1. **Open AWS Amplify Console**: https://console.aws.amazon.com/amplify/
2. **Click "New app" → "Host web app"**
3. **Connect your Git repository** (GitHub, GitLab, Bitbucket, etc.)
4. **Configure build settings** (should auto-detect Next.js)
5. **Add environment variables** (see above)
6. **Deploy the app**

---

## 🎯 Usage

### Admin Panel (`/admin`)

1. Navigate to `/admin` on your deployed site
2. Drag and drop or click to select photos/videos
3. Click "Upload All" to upload media to S3
4. Images with faces are automatically indexed to AWS Rekognition
5. Monitor upload progress for each file

**Features**:
- Drag-and-drop interface
- Multi-file upload
- Automatic face indexing for images
- Progress tracking
- Upload status indicators

### Gallery Page (`/gallery`)

1. Navigate to `/gallery` to view all uploaded media
2. Switch between grid and list view
3. Click media to view full-screen
4. Click "Download" to download any photo/video

**Facial Recognition Search**:
1. Click "Search by Face" button
2. Allow camera permissions when prompted
3. Position your face in the camera
4. Click "Capture & Search"
5. Gallery filters to show only photos with matching faces

---

## 🔧 Troubleshooting

### Issue: "MEDIA_BUCKET_NAME not configured"
**Solution**: Ensure environment variables are set in `.env.local` (local) or Amplify Console (deployed)

### Issue: "Rekognition collection not found"
**Solution**: Create the Rekognition collection using AWS CLI or Console (see Step 2)

### Issue: "Failed to access camera"
**Solution**: Grant camera permissions in your browser. Check browser console for errors.

### Issue: "No matching faces found"
**Solution**:
- Ensure images with faces have been uploaded and indexed
- Check that faces are clearly visible in uploaded images
- Try adjusting the `FaceMatchThreshold` in `app/api/media/search-face/route.ts` (lower = more matches)

### Issue: Upload fails with 403 error
**Solution**:
- Verify IAM permissions for S3 PutObject
- Check CORS configuration on S3 bucket
- Ensure presigned URL hasn't expired

### Issue: Face indexing fails
**Solution**:
- Verify Rekognition permissions in IAM
- Ensure image contains detectable faces
- Check that Rekognition is available in your region

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use IAM roles** instead of access keys when possible
3. **Rotate AWS credentials** regularly
4. **Set S3 bucket policies** to restrict access
5. **Add authentication** to the `/admin` route (recommended for production)
6. **Enable CloudFront** for S3 content delivery (optional, improves performance)
7. **Set up CloudWatch alarms** for monitoring usage and costs

### Adding Authentication to Admin Panel (Recommended)

Consider adding authentication middleware to protect the `/admin` route:

```typescript
// app/admin/layout.tsx
import { redirect } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Add your authentication check here
  const isAuthenticated = false; // Replace with actual auth check

  if (!isAuthenticated) {
    redirect('/login');
  }

  return <>{children}</>;
}
```

---

## 📊 Cost Estimation

### AWS Services Used:

1. **S3 Storage**: ~$0.023 per GB/month
2. **S3 Requests**: ~$0.005 per 1,000 PUT/GET requests
3. **AWS Rekognition**:
   - Index faces: $1.00 per 1,000 faces
   - Search faces: $1.00 per 1,000 searches
4. **Amplify Hosting**: Free tier includes 1,000 build minutes/month

**Example Monthly Cost** (1,000 images, 500 searches):
- S3 Storage (10GB): $0.23
- S3 Requests: $0.05
- Rekognition Index: $1.00
- Rekognition Search: $0.50
- **Total**: ~$2/month

---

## 🛠️ Advanced Configuration

### Customizing Face Match Threshold

Edit `app/api/media/search-face/route.ts`:

```typescript
FaceMatchThreshold: 70, // Change this value (0-100)
// Higher = stricter matching
// Lower = more lenient matching
```

### Changing S3 Upload Expiry Time

Edit `app/api/media/upload/route.ts`:

```typescript
const uploadUrl = await getSignedUrl(s3Client, command, {
  expiresIn: 300 // Change this value (seconds)
});
```

### Adding Video Thumbnail Generation

Consider adding AWS Lambda with FFmpeg to generate video thumbnails automatically.

---

## 📝 API Reference

### POST /api/media/upload
Generate presigned S3 URL for uploading media.

**Request**:
```json
{
  "fileName": "photo.jpg",
  "fileType": "image/jpeg"
}
```

**Response**:
```json
{
  "uploadUrl": "https://...",
  "key": "uploads/123456-photo.jpg",
  "fileUrl": "https://..."
}
```

### GET /api/media/list
List all media in the S3 bucket.

**Response**:
```json
{
  "media": [
    {
      "key": "uploads/123456-photo.jpg",
      "url": "https://...",
      "size": 1024000,
      "lastModified": "2025-01-15T10:30:00Z",
      "type": "image",
      "fileName": "photo.jpg"
    }
  ]
}
```

### POST /api/media/index-face
Index faces in an uploaded image.

**Request**:
```json
{
  "s3Key": "uploads/123456-photo.jpg",
  "fileName": "photo.jpg"
}
```

**Response**:
```json
{
  "success": true,
  "facesIndexed": 2,
  "faceIds": ["uuid-1", "uuid-2"],
  "message": "Successfully indexed 2 face(s)"
}
```

### POST /api/media/search-face
Search for faces using a webcam image.

**Request**:
```json
{
  "imageData": "data:image/jpeg;base64,/9j/4AAQ..."
}
```

**Response**:
```json
{
  "success": true,
  "matches": [
    {
      "faceId": "uuid-1",
      "externalImageId": "photo.jpg",
      "similarity": 95.5,
      "confidence": 99.8
    }
  ],
  "message": "Found 1 matching face(s)"
}
```

---

## 📚 Additional Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS Rekognition Documentation](https://docs.aws.amazon.com/rekognition/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [AWS Amplify Hosting](https://docs.amplify.aws/)

---

## 🐛 Support

If you encounter issues:

1. Check AWS CloudWatch logs for API errors
2. Verify IAM permissions
3. Test API endpoints using curl or Postman
4. Check browser console for client-side errors
5. Ensure all environment variables are set correctly

---

## ✅ Checklist

Before going to production:

- [ ] S3 bucket created and CORS configured
- [ ] Rekognition collection created
- [ ] IAM user/role with proper permissions
- [ ] Environment variables configured
- [ ] Local testing completed
- [ ] Deployed to Amplify
- [ ] Admin authentication added (recommended)
- [ ] Cost monitoring set up
- [ ] Backup strategy implemented

---

Made with ❤️ using Next.js, AWS S3, and AWS Rekognition
