"use server";
import prisma from "@/lib/prisma";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// function for prisma delete user
export async function deleteAccount(prevState, formData) {
  const usermail = formData.get("email");

  try {
    const user = await prisma.user.findUnique({
      where: { email: usermail },
    });

    if (user) {
      const userAuth = await prisma.userAuth.findUnique({
        where: { userId: user.id },
      });

      if (userAuth) {
        await prisma.userAuth.delete({
          where: { id: userAuth.id },
        });
      }
    }

    await prisma.user.delete({
      where: { email: usermail },
    });

    return { message: "success" };
  } catch (error) {
    return { message: `User could not be deleted, ${error}` };
  }
}

const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
];

const maxFileSize = 1048576 * 10; // 10 MB

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export async function getSignedURL({
  session,
  fileType,
  fileSize,
  checksum,
  content,
}) {
  if (!session) {
    return { failure: `not authenticated` };
  }

  if (!allowedFileTypes.includes(fileType)) {
    return { failure: `File type not allowed ` };
  }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" };
  }
  const key = generateFileName();
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: `${session.user.id}`,
    },
  });

  const url = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 60 });

  try {
    await prisma.post.create({
      data: {
        imageUrl: `https://d2eppnsta31d93.cloudfront.net/${key}.jpeg`,
        userId: session.user.id,
        content: content,
      },
    });
    return { success: { url } };
  } catch (error) {
    console.error("Fehler beim Erstellen des Posts:", error);
    return { failure: "Fehler beim Speichern des Posts in der Datenbank" };
  }
}

export async function getLatestPosts(lastPostId) {
  try {
    const queryOptions = {
      take: 9,
      orderBy: {
        id: "desc",
      },
      include: {
        user: true,
        likes: true,
        comments: {
          include: {
            user: true,
            CommentLike: true,

          }
        }
      },
    };

    if (lastPostId) {
      queryOptions.cursor = {
        id: lastPostId,
      };
      queryOptions.skip = 1;
    }

    const posts = await prisma.post.findMany(queryOptions);

    return posts;
  } catch (error) {
    throw error;
  }
}

export async function getUserPosts(userid) {
  try {
    const queryOptions = {
      where: {
        userId: userid,
      },
      orderBy: {
        id: "desc",
      },
      include: {
        user: true,
        likes: true,
        comments: true,
      },
    };

    const userPosts = await prisma.post.findMany(queryOptions);

    return userPosts;
  } catch (error) {
    throw error;
  }
}

export async function deletePost(session, post) {
  try {
    // Find the post by id
    const foundPost = await prisma.post.findUnique({
      where: { id: post.id },
    });

    if (!foundPost) {
      throw new Error("Post not found");
    }

    // Check if the session user is the owner of the post
    if (session.user.id === foundPost.userId) {
      // Delete the post from the database
      await prisma.post.delete({
        where: { id: post.id },
      });

      // Extract the key from the post's imageUrl
      const imageUrl = foundPost.imageUrl;
      const key = imageUrl.split("/").pop();

      // Prepare the delete parameters
      const deleteParams = {
        Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
        Key: key,
      };

      // Delete the image from S3 using DeleteObjectCommand
      await s3Client.send(new DeleteObjectCommand(deleteParams));

      revalidatePath("/profile");
      return { success: "Post deleted successfully" };
    } else {
      return { failure: `You are not authorized to delete this post ${error}` };
    }
  } catch (error) {
    return { failure: error.message };
  }
}

export async function setLike(session, post) {
  try {
    const like = await prisma.like.findFirst({
      where: {
        userId: session.user.id,
        postId: post.id,
      },
    });

    if (like) {
      await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
      return { success: "Like removed" };
    } else {
      await prisma.like.create({
        data: {
          userId: session.user.id,
          postId: post.id,
        },
      });
      return { success: "Like added" };
    }
  } catch (error) {
    return { failure: `Error setting like ${error}` };
  }
}

export async function addComment(session, post, text) {
  try {
    await prisma.comment.create({
      data: {
        userId: session.user.id,
        postId: post.id,
        content: text,
      },
    });
    return { success: "Comment added" };
  } catch (error) {
    return { failure: `Error adding comment ${error}` };
  }
}

export async function deleteComment(session, comment) {
  try {
    const foundComment = await prisma.comment.findUnique({
      where: { id: comment.id },
    });

    if (!foundComment) {
      throw new Error("Comment not found");
    }

    if (session.user.id === foundComment.userId) {
      await prisma.comment.delete({
        where: { id: comment.id },
      });

      return { success: "Comment deleted" };
    } else {
      return { failure: `You are not authorized to delete this comment ${error}` };
    }
  } catch (error) {
    return { failure: error.message };
  }
}

export async function changeComment(session, comment, text) {
  try {
    const foundComment = await prisma.comment.findUnique({
      where: { id: comment.id },
    });

    if (!foundComment) {
      throw new Error("Comment not found");
    }

    if (session.user.id === foundComment.userId) {
      await prisma.comment.update({
        where: { id: comment.id },
        data: {
          content: text,
        },
      });

      return { success: "Comment changed" };
    } else {
      return { failure: `You are not authorized to change this comment ${error}` };
    }
  } catch (error) {
    return { failure: error.message };
  }
}

export async function setCommentLike(session, comment) {
  try {
    const like = await prisma.commentLike.findFirst({
      where: {
        userId: session.user.id,
        commentId: comment.id,
      },
    });

    if (like) {
      await prisma.commentLike.delete({
        where: {
          id: like.id,
        },
      });
      return { success: "Like removed" };
    } else {
      await prisma.commentLike.create({
        data: {
          userId: session.user.id,
          commentId: comment.id,
        },
      });
      return { success: "Like added" };
    }
  } catch (error) {
    return { failure: `Error setting like ${error}` };
  }
}