"use client";

import { useSession } from "next-auth/react";
import { Post } from "@/app/components/Post";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { getLatestPosts } from "@/app/actions";
import SpinnerLoader from "@/app/components/loaders/SpinnerLoader";
import ScrollToTopButton from "@/app/components/ScrollToTopButton";


const Timeline = () => {
  //useEffect for redirection in case no user is logged in
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      redirect("/");
    }
  }, [session, router]);


  const [posts, setPosts] = useState([]);
  const [lastPostId, setLastPostId] = useState(null);
  const loaderRef = useRef(null);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const newPosts = await getLatestPosts(lastPostId);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      const newLastPostId = newPosts[newPosts.length - 1]?.id;
      if (newLastPostId) {
        setLastPostId(newLastPostId);
      }
    } catch (error) {
      console.error("error loading posts");
    }
  },[lastPostId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          fetchPosts();
        }
      },
      { threshold: 1.0 },
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.disconnect();
      }
    };
  }, [lastPostId, fetchPosts]);

  const checkScrollTop = useCallback(() => {
    if (!showScrollTopButton && window.pageYOffset > 400) {
      setShowScrollTopButton(true);
    } else if (showScrollTopButton && window.pageYOffset <= 400) {
      setShowScrollTopButton(false);
    }
  }, [showScrollTopButton]);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [checkScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll
    });
  };

  return (
    <div>
      <div className="max-w-[90%] md:max-w-[90%] lg:max-w-[70%] xl:max-w-[50%] 2xl:max-w-[40%] mx-auto">
        <div className="flex w-full h-screen flex-col items-center">
          <div className="p-4 space-y-4">
            {posts.map((post) => (
              <Post className="" key={post.id} post={post} session={session}/>
            ))}
            <div className="w-full justify-center" ref={loaderRef}>
              <SpinnerLoader />
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton
        isVisible={showScrollTopButton}
        scrollToTop={scrollToTop}
      />
    </div>
  );
};

export default Timeline;
