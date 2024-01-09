'use server'
import prisma from "@/lib/prisma"



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
    return {success: {url:"test"}}
}