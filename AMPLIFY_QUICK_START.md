# Amplify Deployment - Quick Start

## TL;DR - What You Need to Do

### 1. Commit and Push Code ✅
```bash
git add .
git commit -m "Add media gallery with Amplify support"
git push origin main
```

### 2. Set Environment Variables in Amplify Console 🔧

Go to: **Amplify Console** → **Your App** → **Environment variables**

Add these 3 variables:
```
AWS_REGION = ap-south-1
MEDIA_BUCKET_NAME = simonphilip-media-gallery
REKOGNITION_COLLECTION_ID = media-gallery-faces
```

**⚠️ DO NOT ADD:**
- ❌ AWS_ACCESS_KEY_ID
- ❌ AWS_SECRET_ACCESS_KEY

(These are handled by IAM roles)

### 3. Configure IAM Role Permissions 🔐

**Option A: Quick (Less Secure)**
1. Go to **IAM Console** → Find your Amplify service role
2. Attach these policies:
   - `AmazonS3FullAccess`
   - `AmazonRekognitionFullAccess`
   - `SecretsManagerReadWrite` (for OpenAI key)

**Option B: Secure (Recommended)**

Create a custom policy with this JSON:
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
        "arn:aws:s3:::simonphilip-media-gallery",
        "arn:aws:s3:::simonphilip-media-gallery/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "rekognition:IndexFaces",
        "rekognition:SearchFacesByImage",
        "rekognition:ListFaces",
        "rekognition:DeleteFaces",
        "rekognition:DescribeCollection"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": "arn:aws:secretsmanager:ap-south-1:*:secret:*"
    }
  ]
}
```

Attach this policy to your Amplify service role.

### 4. Deploy 🚀

Push code or click "Redeploy" in Amplify Console.

Monitor the build (takes ~5-10 minutes).

### 5. Test 🧪

Test these URLs:
- ✅ Admin: `https://your-app.amplifyapp.com/admin`
- ✅ Gallery: `https://your-app.amplifyapp.com/gallery`

---

## What Changed in Your Code

✅ **Added files:**
- `amplify.yml` - Build configuration
- `AMPLIFY_DEPLOYMENT.md` - Full deployment guide
- `AMPLIFY_QUICK_START.md` - This file

✅ **Modified files:**
- `app/api/tailor/route.ts` - Removed explicit credentials (now uses IAM roles)

✅ **Existing configuration (already correct):**
- `next.config.mjs` - Already supports API routes (no static export)
- All media API routes - Already don't specify credentials

---

## Common Issues & Fixes

### Issue: AccessDenied errors
**Fix:** Check IAM role permissions (Step 3)

### Issue: Environment variables not found
**Fix:** Set variables in Amplify Console (Step 2), then redeploy

### Issue: Collection not found
**Fix:** Create Rekognition collection:
```bash
aws rekognition create-collection \
  --collection-id media-gallery-faces \
  --region ap-south-1
```

### Issue: Build fails
**Fix:** Check CloudWatch logs for specific error

---

## Files to Commit

Make sure these are in your repo:
```
✅ amplify.yml
✅ app/api/media/
✅ app/admin/page.tsx
✅ app/gallery/page.tsx
✅ AMPLIFY_DEPLOYMENT.md
✅ AMPLIFY_QUICK_START.md
```

---

## After Deployment

1. **Test upload** at `/admin`
2. **Index existing images** (click purple button)
3. **Test face search** at `/gallery`
4. **Set up cost alerts** in AWS Billing
5. **Add authentication** to `/admin` (recommended)

---

For detailed instructions, see: **AMPLIFY_DEPLOYMENT.md**
