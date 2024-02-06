"use client";
import UploadForm from "@/app/components/UploadForm";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const Upload = () => {
  const { data: session } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (!session) {
      redirect("/");
    }
  }, [session, router]);


  return (
    <div className="flex w-full h-screen flex-col justify-center">
      <div className="m-6">
        <UploadForm />
      </div>
    </div>
  );
};

export default Upload;
