"use client";
import styles from "./error.module.css";

export default function Error({ error }) {
  return (
    <>
      <div className={styles.error}>
        <h1>Error has occured!</h1>
        <h3>{error.Error}</h3>
      </div>
    </>
  );
}
