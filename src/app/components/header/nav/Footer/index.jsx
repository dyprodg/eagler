"use client";
import { signOut } from "next-auth/react";
import styles from "./style.module.scss";

export default function Footer() {

  const handleLogout = async () => {
    await signOut({ callbackUrl: `${window.location.origin}/`});
  };
  return (
    <div className={styles.footer}>
      <a href="/contact" className="hover:underline">Contact</a>
      <a href="/impressum" className="hover:underline">Impressum</a>
      <button onClick={handleLogout} className="hover:underline">
        Logout
      </button>
    </div>
  );
}
