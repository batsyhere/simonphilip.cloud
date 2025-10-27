#!/bin/bash

# Media Gallery Setup Script
# This script automates the AWS infrastructure setup for the media gallery

set -e

echo "========================================"
echo "Media Gallery Setup Script"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed${NC}"
    echo "Please install AWS CLI: https://aws.amazon.com/cli/"
    exit 1
fi

echo -e "${GREEN}✓ AWS CLI found${NC}"

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}Error: AWS credentials not configured${NC}"
    echo "Run 'aws configure' to set up your credentials"
    exit 1
fi

echo -e "${GREEN}✓ AWS credentials configured${NC}"

# Get configuration from user
echo ""
echo "Please provide the following information:"
echo ""

read -p "AWS Region (default: ap-south-1): " AWS_REGION
AWS_REGION=${AWS_REGION:-ap-south-1}

read -p "S3 Bucket Name (must be globally unique): " BUCKET_NAME
if [ -z "$BUCKET_NAME" ]; then
    echo -e "${RED}Error: Bucket name is required${NC}"
    exit 1
fi

read -p "Rekognition Collection ID (default: media-gallery-faces): " COLLECTION_ID
COLLECTION_ID=${COLLECTION_ID:-media-gallery-faces}

echo ""
echo "Configuration:"
echo "  Region: $AWS_REGION"
echo "  Bucket: $BUCKET_NAME"
echo "  Collection: $COLLECTION_ID"
echo ""

read -p "Continue with setup? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    echo "Setup cancelled"
    exit 0
fi

echo ""
echo "========================================"
echo "Starting Setup..."
echo "========================================"
echo ""

# Create S3 bucket
echo "Creating S3 bucket..."
if aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
    aws s3api create-bucket \
        --bucket "$BUCKET_NAME" \
        --region "$AWS_REGION" \
        --create-bucket-configuration LocationConstraint="$AWS_REGION" \
        2>/dev/null || true
    echo -e "${GREEN}✓ S3 bucket created${NC}"
else
    echo -e "${YELLOW}⚠ Bucket already exists, skipping creation${NC}"
fi

# Enable versioning (optional)
echo "Configuring bucket versioning..."
aws s3api put-bucket-versioning \
    --bucket "$BUCKET_NAME" \
    --versioning-configuration Status=Disabled \
    --region "$AWS_REGION"
echo -e "${GREEN}✓ Versioning configured${NC}"

# Enable encryption
echo "Enabling encryption..."
aws s3api put-bucket-encryption \
    --bucket "$BUCKET_NAME" \
    --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}' \
    --region "$AWS_REGION"
echo -e "${GREEN}✓ Encryption enabled${NC}"

# Block public access
echo "Blocking public access..."
aws s3api put-public-access-block \
    --bucket "$BUCKET_NAME" \
    --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true" \
    --region "$AWS_REGION"
echo -e "${GREEN}✓ Public access blocked${NC}"

# Configure CORS
echo "Configuring CORS..."
aws s3api put-bucket-cors \
    --bucket "$BUCKET_NAME" \
    --cors-configuration '{
        "CORSRules": [
            {
                "AllowedHeaders": ["*"],
                "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
                "AllowedOrigins": ["*"],
                "ExposeHeaders": ["ETag"],
                "MaxAgeSeconds": 3000
            }
        ]
    }' \
    --region "$AWS_REGION"
echo -e "${GREEN}✓ CORS configured${NC}"

# Configure lifecycle policy for temp files
echo "Configuring lifecycle policy..."
aws s3api put-bucket-lifecycle-configuration \
    --bucket "$BUCKET_NAME" \
    --lifecycle-configuration '{
        "Rules": [
            {
                "Id": "delete-temp-files",
                "Status": "Enabled",
                "Filter": {
                    "Prefix": "temp/"
                },
                "Expiration": {
                    "Days": 1
                }
            }
        ]
    }' \
    --region "$AWS_REGION"
echo -e "${GREEN}✓ Lifecycle policy configured${NC}"

# Create Rekognition collection
echo "Creating Rekognition collection..."
COLLECTION_EXISTS=$(aws rekognition list-collections --region "$AWS_REGION" --query "CollectionIds[?@=='$COLLECTION_ID']" --output text)

if [ -z "$COLLECTION_EXISTS" ]; then
    aws rekognition create-collection \
        --collection-id "$COLLECTION_ID" \
        --region "$AWS_REGION"
    echo -e "${GREEN}✓ Rekognition collection created${NC}"
else
    echo -e "${YELLOW}⚠ Rekognition collection already exists, skipping creation${NC}"
fi

# Generate .env.local file
echo ""
echo "Generating .env.local file..."
cat > .env.local << EOF
# AWS Configuration
AWS_REGION=$AWS_REGION
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here

# S3 Bucket for Media Storage
MEDIA_BUCKET_NAME=$BUCKET_NAME

# AWS Rekognition Collection ID
REKOGNITION_COLLECTION_ID=$COLLECTION_ID

# Existing OpenAI Configuration (if applicable)
AWS_SECRET_NAME=your-secret-name-for-openai-key
EOF

echo -e "${GREEN}✓ .env.local file created${NC}"

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your AWS credentials"
echo "2. Run 'npm install' to ensure all dependencies are installed"
echo "3. Run 'npm run dev' to test locally"
echo "4. Deploy to AWS Amplify"
echo ""
echo "Resources created:"
echo "  - S3 Bucket: $BUCKET_NAME"
echo "  - Rekognition Collection: $COLLECTION_ID"
echo "  - Configuration file: .env.local"
echo ""
echo -e "${YELLOW}⚠ Remember to add your AWS credentials to .env.local${NC}"
echo ""
