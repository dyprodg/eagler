// actions.test.js
import {
  deleteAccount,
  getSignedURL,
  getLatestPosts,
  getUserPosts,
  deletePost,
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
  },
  post: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
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

  it("should delete account", async () => {
    const formData = new Map();
    formData.set("email", "test@example.com");
    await deleteAccount(null, formData);
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { email: "test@example.com" },
    });
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
});
