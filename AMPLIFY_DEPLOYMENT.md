# AWS Amplify Deployment Guide

This guide covers deploying your media gallery with facial recognition to AWS Amplify.

## Prerequisites

- AWS Account
- GitHub/GitLab/Bitbucket repository
- S3 bucket created (from MEDIA_GALLERY_SETUP.md)
- Rekognition collection created (from MEDIA_GALLERY_SETUP.md)

---

## Step 1: Push Code to Repository

1. **Commit all changes**:
```bash
git add .
git commit -m "Add media gallery with Amplify configuration"
git push origin main
```

2. **Verify files are committed**:
   - ✅ `amplify.yml` (build configuration)
   - ✅ `app/api/media/**` (API routes)
   - ✅ `app/admin/page.tsx` (admin page)
   - ✅ `app/gallery/page.tsx` (gallery page)

---

## Step 2: Create Amplify App

1. **Open AWS Amplify Console**: https://console.aws.amazon.com/amplify/

2. **Click "New app" → "Host web app"**

3. **Connect your repository**:
   - Select GitHub/GitLab/Bitbucket
   - Authorize AWS Amplify
   - Select your repository
   - Select branch: `main` (or your default branch)

4. **Configure app settings**:
   - App name: `media-gallery` (or your preferred name)
   - Click "Next"

5. **Build settings**:
   - Amplify should auto-detect `amplify.yml`
   - If not, it will detect Next.js automatically
   - Click "Next"

6. **Review and Deploy**:
   - Click "Save and deploy"
   - **⚠️ WAIT - Don't deploy yet! We need to configure environment variables first**
   - Click "Cancel" or let it fail (we'll redeploy)

---

## Step 3: Configure Environment Variables

**IMPORTANT**: Do NOT use AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY in Amplify. We'll use IAM roles instead (Step 4).

1. **In Amplify Console**, go to your app
2. **Click "Environment variables"** (left sidebar under "Hosting")
3. **Add these variables**:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `AWS_REGION` | Your AWS region | `ap-south-1` |
| `MEDIA_BUCKET_NAME` | Your S3 bucket name | `simonphilip-media-gallery` |
| `REKOGNITION_COLLECTION_ID` | Your collection ID | `media-gallery-faces` |

**DO NOT ADD**:
- ❌ `AWS_ACCESS_KEY_ID` (security risk!)
- ❌ `AWS_SECRET_ACCESS_KEY` (security risk!)

These will be handled by IAM roles (next step).

4. **Click "Save"**

---

## Step 4: Configure IAM Role Permissions (CRITICAL!)

Your Amplify Lambda functions need permissions to access S3 and Rekognition. This is the most important step.

### Option A: Using Amplify Console (Easier)

1. **In Amplify Console**, go to your app
2. **Click "Build settings"** (left sidebar)
3. **Scroll to "Service role"**
4. **Click "Edit"** or **"Create new role"** if none exists

5. **Attach policies to the role**:
   - Go to IAM Console: https://console.aws.amazon.com/iam/
   - Find the role (usually named `amplifyconsole-backend-role` or similar)
   - Click "Add permissions" → "Attach policies"
   - Search and attach:
     - `AmazonS3FullAccess` (or create custom policy below)
     - `AmazonRekognitionFullAccess` (or create custom policy below)

### Option B: Custom IAM Policy (More Secure - Recommended)

1. **Go to IAM Console**: https://console.aws.amazon.com/iam/
2. **Click "Policies" → "Create policy"**
3. **Switch to JSON tab** and paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3MediaGalleryAccess",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR-BUCKET-NAME",
        "arn:aws:s3:::YOUR-BUCKET-NAME/*"
      ]
    },
    {
      "Sid": "RekognitionAccess",
      "Effect": "Allow",
      "Action": [
        "rekognition:IndexFaces",
        "rekognition:SearchFacesByImage",
        "rekognition:ListFaces",
        "rekognition:DeleteFaces",
        "rekognition:DescribeCollection",
        "rekognition:ListCollections"
      ],
      "Resource": "*"
    }
  ]
}
```

4. **Replace `YOUR-BUCKET-NAME`** with your actual bucket name
5. **Name the policy**: `MediaGalleryPolicy`
6. **Click "Create policy"**

7. **Attach to Amplify role**:
   - Go to "Roles" in IAM
   - Find your Amplify service role
   - Click "Add permissions" → "Attach policies"
   - Select `MediaGalleryPolicy`
   - Click "Attach policy"

---

## Step 5: Update SDK Client Configuration (If Needed)

Your API routes should automatically use the IAM role credentials. The AWS SDK will automatically detect them.

**Verify your API routes don't explicitly set credentials**:

Your code should look like this (no credentials):
```typescript
const rekognitionClient = new RekognitionClient({
  region: process.env.AWS_REGION || 'ap-south-1',
  // No credentials specified - will use IAM role automatically
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  // No credentials specified - will use IAM role automatically
});
```

✅ Your current code is already configured correctly!

---

## Step 6: Deploy to Amplify

1. **In Amplify Console**, go to your app
2. **Click "Redeploy this version"** or push a new commit:

```bash
git commit --allow-empty -m "Trigger Amplify deployment"
git push origin main
```

3. **Monitor the build**:
   - Provision (1-2 min)
   - Build (3-5 min)
   - Deploy (1-2 min)

4. **Check for errors**:
   - If build fails, check the logs
   - Common issues:
     - Node version mismatch
     - Missing dependencies
     - Build timeout

---

## Step 7: Test Your Deployment

1. **Get your Amplify URL**:
   - Example: `https://main.d1234abcd.amplifyapp.com`

2. **Test pages**:
   - ✅ Homepage: `https://your-url.amplifyapp.com/`
   - ✅ Admin: `https://your-url.amplifyapp.com/admin`
   - ✅ Gallery: `https://your-url.amplifyapp.com/gallery`

3. **Test API endpoints**:
   - Upload an image via `/admin`
   - Check if it appears in `/gallery`
   - Try face search with webcam

4. **Check CloudWatch logs** if issues occur:
   - Go to AWS Lambda Console
   - Find your Amplify functions (named like `amplify-...`)
   - Check logs in CloudWatch

---

## Step 8: Configure Custom Domain (Optional)

1. **In Amplify Console**, click "Domain management"
2. **Click "Add domain"**
3. **Enter your domain**: `example.com`
4. **Amplify will**:
   - Create SSL certificate
   - Configure DNS
   - Wait for verification (5-30 min)

---

## Troubleshooting

### Issue: "AccessDenied" errors in API

**Cause**: IAM role doesn't have permissions

**Solution**:
1. Check IAM role attached to Amplify
2. Verify S3 and Rekognition permissions
3. Check CloudWatch logs for specific permission errors

### Issue: Environment variables not working

**Cause**: Variables not set in Amplify Console

**Solution**:
1. Go to Amplify Console → Environment variables
2. Verify `AWS_REGION`, `MEDIA_BUCKET_NAME`, `REKOGNITION_COLLECTION_ID`
3. Redeploy after adding variables

### Issue: Build fails with "Module not found"

**Cause**: Dependencies not installed

**Solution**:
1. Run `npm install` locally
2. Commit `package-lock.json`
3. Push to trigger rebuild

### Issue: API routes return 500 error

**Cause**: Runtime error in Lambda function

**Solution**:
1. Check CloudWatch Logs:
   - Go to AWS Lambda Console
   - Find Amplify functions
   - View logs
2. Look for error messages
3. Check environment variables are set

### Issue: "Collection not found" error

**Cause**: Rekognition collection doesn't exist or wrong region

**Solution**:
```bash
# Create collection
aws rekognition create-collection \
  --collection-id media-gallery-faces \
  --region ap-south-1

# Verify
aws rekognition list-collections --region ap-south-1
```

### Issue: CORS errors when uploading

**Cause**: S3 bucket CORS not configured

**Solution**:
1. Go to S3 Console
2. Select your bucket → Permissions → CORS
3. Add CORS configuration from MEDIA_GALLERY_SETUP.md

---

## Environment Variables Summary

Set these in **Amplify Console** → **Environment variables**:

```bash
AWS_REGION=ap-south-1
MEDIA_BUCKET_NAME=simonphilip-media-gallery
REKOGNITION_COLLECTION_ID=media-gallery-faces
```

**Do NOT set** (handled by IAM role):
- ❌ AWS_ACCESS_KEY_ID
- ❌ AWS_SECRET_ACCESS_KEY

---

## Security Best Practices

1. ✅ **Use IAM roles** (not access keys)
2. ✅ **Enable CloudWatch logs** for monitoring
3. ✅ **Set up AWS WAF** (optional, for DDoS protection)
4. ✅ **Add authentication** to `/admin` route
5. ✅ **Enable Amplify access control** (optional)
6. ✅ **Rotate secrets** if using any API keys
7. ✅ **Set up cost alerts** in AWS Billing

---

## Post-Deployment Checklist

- [ ] Amplify app deployed successfully
- [ ] Environment variables configured
- [ ] IAM role has S3 + Rekognition permissions
- [ ] Admin page accessible
- [ ] Gallery page accessible
- [ ] Image upload works
- [ ] Face indexing works
- [ ] Face search works
- [ ] CloudWatch logs enabled
- [ ] Cost monitoring set up

---

## Continuous Deployment

Every push to `main` will automatically:
1. Trigger Amplify build
2. Run `npm run build`
3. Deploy to production
4. Update Lambda functions

To disable auto-deploy:
- Amplify Console → App settings → Branch settings → Edit
- Disable automatic builds

---

## Rollback

If deployment breaks:

1. **In Amplify Console**, click "Deployments"
2. **Find previous working version**
3. **Click "Redeploy"**

Or rollback code:
```bash
git revert HEAD
git push origin main
```

---

## Cost Monitoring

1. **Set up AWS Budgets**:
   - Go to AWS Billing Console
   - Create budget alert
   - Set threshold: $10/month

2. **Monitor Amplify costs**:
   - Amplify Console → Usage
   - Check build minutes
   - Check bandwidth usage

3. **Monitor AWS costs**:
   - Cost Explorer
   - Filter by service: S3, Rekognition, Lambda

---

## Support Resources

- [Amplify Next.js Docs](https://docs.amplify.aws/guides/hosting/nextjs/q/platform/js/)
- [Amplify Troubleshooting](https://docs.aws.amazon.com/amplify/latest/userguide/troubleshooting.html)
- [AWS Support](https://console.aws.amazon.com/support/)

---

## Quick Commands

```bash
# Trigger deployment
git commit --allow-empty -m "Deploy to Amplify"
git push origin main

# Check Rekognition collection
aws rekognition list-collections --region ap-south-1

# Check S3 bucket
aws s3 ls s3://YOUR-BUCKET-NAME/uploads/

# Test API locally before deploying
npm run dev
```

---

Made with ❤️ for AWS Amplify deployment
