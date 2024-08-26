"use client";
import styles from "./loading.module.css";

export default function loading() {
  return (
    <>
      <div className={styles.centered}>
        <div className={styles.loader}></div>
        <h3 style={{ textAlign: "center" }}>Fetching Meals ...</h3>
      </div>
    </>
  );
}
