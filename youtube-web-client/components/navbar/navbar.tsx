"use client";
import { signInWithGoogle, signOut } from "../../firebase/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from "../../firebase/firebase";
import Image from "next/image";
import Link from "next/link";
import Upload from "./upload";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image
          src="/youtube-logo.svg"
          alt="Youtube Logo"
          width={90}
          height={20}
        />
      </Link>
      {user && <Upload />}
      <div>
        {user ? (
          // If user is signed in, show a welcome message (or something else)
          <button className={styles.signin} onClick={signOut}>
            Sign Out
          </button>
        ) : (
          // If user is not signed in, show sign-in button
          <button className={styles.signin} onClick={signInWithGoogle}>
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}
