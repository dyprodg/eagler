"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Post } from "@/app/components/Post";
import { deletePost, getUserPosts } from "@/app/actions";
import { redirect, useRouter } from "next/navigation";

const Profile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      redirect("/");
    }
  }, [session, router]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (session?.user?.id) {
        try {
          const userPosts = await getUserPosts(session.user.id);
          setPosts(userPosts);
        } catch (err) {
          console.error("Error fetching user posts:", err);
          setError("Error loading posts");
        }
      }
    };

    fetchUserPosts();
  }, [session]);

  if (!session) {
    return <div>Loading...</div>;
  }

  const handleDeletePost = async (post) => {
    try {
      const response = await deletePost(session, post);

      // Check if the post deletion was successful
      if (response.success) {
        // Filter out the deleted post from the posts state
        setPosts(posts.filter((p) => p.id !== post.id));
        setError(null); // Clear any existing errors
      } else if (response.failure) {
        // Handle failure case
        setError(response.failure);
      }
    } catch (error) {
      console.log("Error deleting post:", error);
      setError(`Error deleting post, ${error}`);
    }
  };

  return (
    <div className="w-full flex flex-col m-4 mt-24 justify-center items-center">
      <h1 className="text-2xl font-bold">{session?.user?.username} Profile</h1>
      <div className="max-w-[90%]">
        {error && <p>{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {posts.map((post) => (
            <div key={post.id}>
              <Post post={post} />
              <button
                className="border border-black rounded-full py-1 px-4 m-1 hover:scale-105 active:bg-red-600 transition ease-in-out"
                onClick={() => handleDeletePost(post)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
