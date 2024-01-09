'use server'
import prisma from "@/lib/prisma"
import {S3Client, PutObjectCommand, PutObjectAclCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  })


// function for prisma delete user
export async function deleteAccount(prevState, formData) {
    
    const usermail = formData.get('email');

    try {
        await prisma.user.delete({
            where: {email: usermail}
        })
        return {message : 'success'}
    } catch (error) {
       return { message: `User could not be deleted, ${error}`}
    }
}



const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "video/mp4",
    "video/quicktime"
  ]

const maxFileSize = 1048576 * 10 // 10 MB

export async function getSignedURL({session , fileType, fileSize, checksum}) {
    if(!session) {
        return { failure: `not authenticated`}
    }
    console.log(session ,fileSize, fileType, checksum)

    if(!allowedFileTypes.includes(fileType)) {
        return { failure: `File type not allowed `}
    }

    if(fileSize > maxFileSize){
        return { failure : 'File size too large'}
    }

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "test-file",
        ContentType: fileType,
        ContentLength: fileSize,
        ChecksumSHA256: checksum,
        Metadata: {
            userId: `${session.user.id}`
        } 
    })

    const url = await getSignedUrl(
        s3Client,
        putObjectCommand,
        { expiresIn: 60}
    )
    return {success:{url:url} }
}
