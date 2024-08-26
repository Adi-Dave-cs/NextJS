import sql from "better-sqlite3";
const db = sql("meals.db");

export default async function getMeals() {
  // Adding the below line to simulate the loading state by adding a random delay
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return db.prepare("Select * from meals").all();
}
