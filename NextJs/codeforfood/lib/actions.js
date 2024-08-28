"use server";

import { saveMeal } from "./meals";

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

  await saveMeal(meal);
}
