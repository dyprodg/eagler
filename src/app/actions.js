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


export async function getSignedURL(session) {
    if(!session) {
        return { failure: 'not authenticated'}
    }
    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "test-file"
    })

    const url = await getSignedUrl(
        s3Client,
        putObjectCommand,
        { expiresIn: 60}
    )
    return {success:{url:url} }
}
