#!/bin/bash

exec > >(tee -a /var/log/custom/scriptoutputs.log) 2>&1

echo "Starting the start.sh script..."
echo "Starting the start.sh script..."
echo "Starting the start.sh script..."
echo "Starting the start.sh script..."
echo "Starting the start.sh script..."
echo "Starting the start.sh script..."

# Clean Up

docker container prune -f
docker image prune -f

# Login to ECR
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 283919506801.dkr.ecr.eu-central-1.amazonaws.com

# Pull the Docker image from ECR
docker pull 283919506801.dkr.ecr.eu-central-1.amazonaws.com/eagler-docker:latest

# Retrieve secrets from AWS Secrets Manager
SECRET_ARN="arn:aws:secretsmanager:eu-central-1:283919506801:secret:eagler-secrets-A8629Z"
SECRETS=$(aws secretsmanager get-secret-value --secret-id ${SECRET_ARN} --query SecretString --output text)

# Parse secrets and set environment variables
DATABASE_URL=$(echo $SECRETS | jq -r .DATABASE_URL)
NEXTAUTH_SECRET=$(echo $SECRETS | jq -r .NEXTAUTH_SECRET)
AWS_ACCESS_KEY=$(echo $SECRETS | jq -r .AWS_ACCESS_KEY)
AWS_SECRET_ACCESS_KEY=$(echo $SECRETS | jq -r .AWS_SECRET_ACCESS_KEY)
AWS_BUCKET_NAME=$(echo $SECRETS | jq -r .AWS_BUCKET_NAME)
AWS_BUCKET_REGION=$(echo $SECRETS | jq -r .AWS_BUCKET_REGION)
AWS_STORAGE_BUCKET_NAME=$(echo $SECRETS | jq -r .AWS_STORAGE_BUCKET_NAME)

# Calculate URLs
IMAGE_UPLOAD_URL="http://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/"
IMAGE_STORAGE_URL="http://${AWS_STORAGE_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/"

# Start the Docker container with all the environment variables
docker run \
  -e DATABASE_URL="$DATABASE_URL" \
  -e NEXTAUTH_SECRET="$NEXTAUTH_SECRET" \
  -e AWS_ACCESS_KEY="$AWS_ACCESS_KEY" \
  -e AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
  -e AWS_BUCKET_NAME="$AWS_BUCKET_NAME" \
  -e AWS_BUCKET_REGION="$AWS_BUCKET_REGION" \
  -e AWS_STORAGE_BUCKET_NAME="$AWS_STORAGE_BUCKET_NAME" \
  -e IMAGE_UPLOAD_URL="$IMAGE_UPLOAD_URL" \
  -e IMAGE_STORAGE_URL="$IMAGE_STORAGE_URL" \
  -p 80:3000 \
  --log-driver=awslogs \
  --log-opt awslogs-region=eu-central-1 \
  --log-opt awslogs-group=eagler/ec2 \
  --log-opt awslogs-stream={instance_id} \
  -d \
  283919506801.dkr.ecr.eu-central-1.amazonaws.com/eagler-docker:latest


sleep 10