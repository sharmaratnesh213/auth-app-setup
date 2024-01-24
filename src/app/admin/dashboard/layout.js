"use client"
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import axios from "axios";

function Layout({ children }) {

  const [verified, setVerified] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    try {
      axios.get('/api/auth/logout');
      router.push('/admin/login');
      alert("You were logged out!")
    } catch (err) {
      console.log("Some error occured!")
      alert("Unable to logout, try after a minute.")
    }
  }

  const handleRefresh = () => {
    window.location.reload();
  }

  useEffect(() => {
    const verifyToken = () => {
      setVerified(false);
      try {
        axios.get('/api/auth/verify-token');
        setVerified(true);
      } catch (error) {
        setVerified(false);
        router.push('/admin/login');
      }
    }

    verifyToken();

  }, []);

  if (!verified) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.col1}>
          <Link href="/admin/dashboard/form">
            <button className={styles.formBtn}>Form Data</button>
          </Link>
          <Link href="/admin/dashboard/newsletter">
            <button className={styles.newsBtn}>Newsletter</button>
          </Link>
          <div className={styles.query}>Total Query:</div>
          <div className={styles.query}>Unresolved Query:</div>
        </div>

        <div className={styles.col2}>
          <button onClick={handleRefresh} className={styles.refreshBtn}>Refresh</button>
          <button onClick={handleLogout} className={styles.signoutBtn}>Signout</button>
        </div>
      </div>
      {children}
    </>
  );
}

export default Layout;
