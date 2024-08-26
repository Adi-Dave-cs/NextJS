import { getMeal } from "@/lib/meals";
import { Suspense } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import NotFound from "@/app/not-found";

export default async function dynamicPage({ params }) {
  const data = await getMeal(params.meal_slug);
  if (!data) {
    return (
      <>
        <NotFound />
      </>
    );
  }
  data.instructions = data.instructions.replace(/\n/g, "<br/>");
  return (
    <>
      <Suspense
        fallback={
          <>
            <div className={`${styles.centered} ${styles.loader}`}>
              <h1>Loading ...</h1>
            </div>
          </>
        }
      >
        <header className={styles.header}>
          <div className={styles.image}>
            <Image src={data?.image} fill />
          </div>
          <div className={styles.headerText}>
            <h1>{data?.title}</h1>
            <p className={styles.creator}>
              by <a href={`mailto:${data?.creator_email}`}> {data.creator} </a>
            </p>
            <p className={styles.summary}>{data?.summary}</p>
          </div>
        </header>
        <main>
          <p
            className={styles.instructions}
            dangerouslySetInnerHTML={{ __html: data.instructions }}
          ></p>
        </main>
      </Suspense>
    </>
  );
}
