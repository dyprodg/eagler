"use client";
import { signOut } from "next-auth/react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";

export default function index() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
  return (
    <div className={styles.footer}>
      <a className="hover:underline">Contact</a>
      <a className="hover:underline">Impressum</a>
      <a className="hover:underline">FAQ</a>
      <button onClick={handleLogout} className="hover:underline">
        Logout
      </button>
    </div>
  );
}
