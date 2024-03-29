"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { getSignedURL } from "../actions";
import { useRouter } from "next/navigation";
import CheckMark from "./loaders/checkMark";

const UploadForm = () => {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const buttonDisabled = content.length < 1 || loading;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const computeSHA256 = async (file) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("creating");
    setLoading(true);
    if (file) {
      const signedURLResult = await getSignedURL({
        session: session,
        fileSize: file.size,
        fileType: file.type,
        checksum: await computeSHA256(file),
        content: content,
      });
      if (signedURLResult.failure !== undefined) {
        console.error(signedURLResult.failure);
        setStatusMessage(signedURLResult.failure);
        return;
      }
      const { url } = signedURLResult.success;
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
    }
    setStatusMessage("created");
    setLoading(false);
    setContent("");
    setFile(null);
    //setPreviewUrl(null);
    setSuccess(true);
    setTimeout(() => {
      router.push("/timeline");
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center">

      {success ? <CheckMark /> : 
      <form className="bumpup px-6 py-4 w-[1000px]" onSubmit={handleSubmit}>
      <h1 className="mb-10 text-2xl font-bold text-center"> Create Post</h1>
        {statusMessage && (
          <p className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 mb-4 rounded relative">
            {statusMessage}
          </p>
        )}
        <div className="flex gap-4 pb-4 justify-center">
          <div className="rounded-full h-12 w-12 overflow-hidden relative">
            <Image
              className="object-cover"
              src={/*user.image ||*/ "https://www.gravatar.com/avatar/?d=mp"}
              alt="avatar"
              priority={true}
              width={48}
              height={48}
            />
          </div>

          <div className="flex flex-col gap-2 w-full justify-center ">
            <div className="text-xl font-bold">{session?.user?.username}</div>

            <label className="w-full">
              <textarea
                className="w-full bg-transparent flex-1 outline-none resize-none border-none shadow-md rounded-md p-2"
                type="text"
                placeholder="Describe Post"
                maxLength={200}
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              
            </label>
            <div className="text-sm text-gray-500">{content.length}/200</div>
            <div className="flex w-full justify-center items-center">
              {previewUrl && file && (
                <div className="mt-4 max-w-[500px] max-h-[500px]">
                  <Image 
                    src={previewUrl} 
                    alt="Selected file" 
                    width={300}
                    height={300}
                    className=""
                  />
                </div>
              )}
            </div>
            <label className="flex">
              <div className="flex w-full justify-center">
                <div className="button">
                  <svg
                    className="svgIcon"
                    aria-label="Attach media"
                    role="img"
                    viewBox="0 0 384 512"
                  >
                    <title>Attach media</title>
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
                  </svg>
                </div>
              </div>
              <input
                className="bg-transparent flex-1 border-none outline-none hidden"
                name="media"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end items-center mt-5">
          <div className="text-neutral-500">
            {loading ? (
              <div className="loader">Loading...</div>
            ) : (
              <button
                type="submit"
                className="border bg-green-500 text-black rounded-xl px-4 py-2 active:scale-110"
                disabled={buttonDisabled}
              >
                Post
              </button>
            )}
          </div>
        </div>
      </form>
      }
    </div>
  );
};

export default UploadForm;
