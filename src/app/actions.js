'use server'
import prisma from "@/lib/prisma"
import {S3Client, PutObjectCommand, PutObjectAclCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto'


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

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

export async function getSignedURL({session , fileType, fileSize, checksum, content}) {
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
    const key = generateFileName()
    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
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
    
    try {
        await prisma.post.create({
            data: {
                imageUrl: `https://eagler-upload.s3.eu-central-1.amazonaws.com/${key}`,
                userId: session.user.id,
                content: content ,
                user: session.user.username
            }
        });
        return { success: { url } };
    } catch (error) {
        console.error("Fehler beim Erstellen des Posts:", error);
        return { failure: "Fehler beim Speichern des Posts in der Datenbank" };
    }
    

}
