import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

function Layout({ children }) {
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
          <button className={styles.refreshBtn}>Refresh</button>
          <button className={styles.signoutBtn}>Signout</button>
        </div>
      </div>
      {children}
    </>
  );
}

export default Layout;
