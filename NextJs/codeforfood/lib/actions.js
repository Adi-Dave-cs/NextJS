"use server";
import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

function isValidEmail(emailId) {
  const emailRegex = "/^[w.%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/";
  return emailRegex.test(email);
}
export async function shareMeal(formdata) {
  const meal = {
    creator: formdata.get("name"),
    creator_email: formdata.get("email"),
    title: formdata.get("title"),
    summary: formdata.get("summary"),
    instructions: formdata.get("instructions"),
    image: formdata.get("image"),
    slug: "",
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.instructions) ||
    isValidEmail(meal.creator_email) ||
    !meal.image ||
    meal.image.size === 0
  ) {
    throw new Error("Invalid Input");
  }
  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
