import Link from "next/link";
import styles from "./page.module.css";
import MealGrid from "@/components/meals/meal-grid";
import getMeals from "@/lib/meals";
import { Suspense } from "react";

async function Meals() {
  const meals = await getMeals();
  return <MealGrid meals={meals} />;
}
export default async function mealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals ,created{" "}
          <span className={styles.highlight}>for you !</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself!</p>
        <p className={styles.cta}>
          <Link href="/meals/share" className={styles.nolink}>
            Share your favorite recipe!
          </Link>
        </p>
      </header>

      <main className={styles.main}>
        <Suspense
          fallback={
            <>
              <div className={`${styles.centered} ${styles.loader}`}>
                <h3 style={{ textAlign: "center" }}>Fetching Meals ...</h3>
              </div>
            </>
          }
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
