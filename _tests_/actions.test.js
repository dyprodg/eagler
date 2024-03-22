// actions.test.js
import {
  deleteAccount,
  getSignedURL,
  getLatestPosts,
  getUserPosts,
  deletePost,
  setLike,
} from "@/app/actions";
import prisma from "@/lib/prisma";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


jest.mock("@/lib/prisma", () => ({
  user: {
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
  userAuth: {
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
  post: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
  like: {
    findFirst: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("@aws-sdk/client-s3", () => ({
  S3Client: jest.fn(),
  PutObjectCommand: jest.fn(),
  DeleteObjectCommand: jest.fn(),
}));

jest.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: jest.fn(),
}));

describe("actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  it("should get signed URL", async () => {
    const session = { user: { id: "1" } };
    const fileType = "image/jpeg";
    const fileSize = 5000;
    const checksum = "checksum";
    const content = "content";
    await getSignedURL({ session, fileType, fileSize, checksum, content });
    expect(prisma.post.create).toHaveBeenCalled();
  });

  it("should get latest posts", async () => {
    await getLatestPosts(1);
    expect(prisma.post.findMany).toHaveBeenCalled();
  });

  it("should get user posts", async () => {
    await getUserPosts("1");
    expect(prisma.post.findMany).toHaveBeenCalled();
  });

  it("should delete post", async () => {
    const session = { user: { id: "1" } };
    const post = { id: "1" };
    prisma.post.findUnique.mockResolvedValue({
      userId: "1",
      imageUrl: "http://example.com/image.jpeg",
    });
    await deletePost(session, post);
    expect(prisma.post.delete).toHaveBeenCalledWith({ where: { id: "1" } });
  });

  it("should delete the user if they exist", async () => {
    const prevState = {};
    const formData = new Map();
    formData.set('email', 'test@example.com');

    prisma.user.findUnique = jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com' });
    prisma.userAuth.findUnique = jest.fn().mockResolvedValue({ id: 1, userId: 1 });
    prisma.user.delete = jest.fn().mockResolvedValue(true);
    prisma.userAuth.delete = jest.fn().mockResolvedValue(true);

    const result = await deleteAccount(prevState, formData);

    expect(result).toEqual({ message: 'success' });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(prisma.userAuth.findUnique).toHaveBeenCalledWith({ where: { userId: 1 } });
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(prisma.userAuth.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("should return an error message if the deletion fails", async () => {
    const prevState = {};
    const formData = new Map();
    formData.set('email', 'test@example.com');

    prisma.user.findUnique = jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com' });
    prisma.user.delete = jest.fn().mockRejectedValue(new Error('Deletion failed'));

    const result = await deleteAccount(prevState, formData);

    expect(result).toEqual({ message: 'User could not be deleted, Error: Deletion failed' });
  });

  it("should set like for a post", async () => {
    const session = { user: { id: "1" } };
    const post = { id: "1" };
  
    // Test case when like exists
    prisma.like.findFirst = jest.fn().mockResolvedValue({ id: 1 });
    prisma.like.delete = jest.fn().mockResolvedValue(true);
  
    let result = await setLike(session, post);
  
    expect(result).toEqual({ success: "Like removed" });
    expect(prisma.like.findFirst).toHaveBeenCalledWith({
      where: {
        userId: session.user.id,
        postId: post.id,
      },
    });
    expect(prisma.like.delete).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  
    // Test case when like does not exist
    prisma.like.findFirst = jest.fn().mockResolvedValue(null);
    prisma.like.create = jest.fn().mockResolvedValue(true);
  
    result = await setLike(session, post);
  
    expect(result).toEqual({ success: "Like added" });
    expect(prisma.like.findFirst).toHaveBeenCalledWith({
      where: {
        userId: session.user.id,
        postId: post.id,
      },
    });
    expect(prisma.like.create).toHaveBeenCalledWith({
      data: {
        userId: session.user.id,
        postId: post.id,
      },
    });
  });

});

