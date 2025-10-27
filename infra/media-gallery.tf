# S3 Bucket for Media Gallery
resource "aws_s3_bucket" "media_gallery" {
  bucket = "simonphilip-media-gallery" # Change this to your desired bucket name

  tags = {
    Name        = "Media Gallery Bucket"
    Project     = "Portfolio"
    Environment = "Production"
  }
}

# Enable versioning (optional but recommended)
resource "aws_s3_bucket_versioning" "media_gallery_versioning" {
  bucket = aws_s3_bucket.media_gallery.id

  versioning_configuration {
    status = "Disabled" # Change to "Enabled" if you want versioning
  }
}

# Server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "media_gallery_encryption" {
  bucket = aws_s3_bucket.media_gallery.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Block public access (we use presigned URLs)
resource "aws_s3_bucket_public_access_block" "media_gallery_public_access_block" {
  bucket = aws_s3_bucket.media_gallery.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CORS configuration for uploads
resource "aws_s3_bucket_cors_configuration" "media_gallery_cors" {
  bucket = aws_s3_bucket.media_gallery.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE", "HEAD"]
    allowed_origins = ["*"] # Change to your domain in production: ["https://yourdomain.com"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# Lifecycle rule to clean up temporary search images (optional)
resource "aws_s3_bucket_lifecycle_configuration" "media_gallery_lifecycle" {
  bucket = aws_s3_bucket.media_gallery.id

  rule {
    id     = "delete-temp-files"
    status = "Enabled"

    filter {
      prefix = "temp/"
    }

    expiration {
      days = 1 # Delete temporary search images after 1 day
    }
  }
}

# AWS Rekognition Collection
# Note: Terraform doesn't have native Rekognition collection resource
# You'll need to create this via AWS CLI:
# aws rekognition create-collection --collection-id media-gallery-faces --region ap-south-1

# Output the bucket name
output "media_gallery_bucket_name" {
  value       = aws_s3_bucket.media_gallery.id
  description = "The name of the S3 bucket for media gallery"
}

output "media_gallery_bucket_arn" {
  value       = aws_s3_bucket.media_gallery.arn
  description = "The ARN of the S3 bucket for media gallery"
}

# IAM Policy for Media Gallery Access (attach to your IAM user/role)
resource "aws_iam_policy" "media_gallery_policy" {
  name        = "MediaGalleryAccessPolicy"
  description = "Policy for media gallery S3 and Rekognition access"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:ListBucket",
          "s3:DeleteObject"
        ]
        Resource = [
          aws_s3_bucket.media_gallery.arn,
          "${aws_s3_bucket.media_gallery.arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "rekognition:IndexFaces",
          "rekognition:SearchFacesByImage",
          "rekognition:ListFaces",
          "rekognition:DeleteFaces",
          "rekognition:CreateCollection",
          "rekognition:DescribeCollection",
          "rekognition:ListCollections"
        ]
        Resource = "*"
      }
    ]
  })
}

output "media_gallery_policy_arn" {
  value       = aws_iam_policy.media_gallery_policy.arn
  description = "ARN of the IAM policy for media gallery access"
}
