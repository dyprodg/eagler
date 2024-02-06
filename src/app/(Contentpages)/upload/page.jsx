"use client";
import UploadForm from "@/app/components/UploadForm";
import { useSession } from "next-auth/react";
import useRedirectNoSession from "@/lib/nosession";

const Upload = () => {
  const { data: session } = useSession();
  useRedirectNoSession(session);

  return (
    <div className="flex w-full h-screen flex-col justify-center">
      <div className="m-6">
        <UploadForm />
      </div>
    </div>
  );
};

export default Upload;
