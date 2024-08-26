import Link from "next/link";
import styles from "./page.module.css";
import MealGrid from "@/components/meals/meal-grid";
import getMeals from "@/lib/meals";
import { Suspense } from "react";
import loading from "./loading";

export default async function mealsPage() {
  const meals = await getMeals();
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals ,created{" "}
          <span className={styles.highlight}>by you !</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself!</p>
        <p className={styles.cta}>
          <Link href="/meals/share" className={styles.nolink}>
            Share your favorite recipe!
          </Link>
        </p>
      </header>
      <Suspense fallback={loading}>
        <main className={styles.main}>
          <MealGrid meals={meals} />
        </main>
      </Suspense>
    </>
  );
}
