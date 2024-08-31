import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
const fs = require("fs");
const db = sql("meals.db");

export default async function getMeals() {
  // Adding the below line to simulate the loading state by adding a random delay
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare("Select * from meals").all();
}

export async function getMeal(slug) {
  return db.prepare("Select * from meals where slug = ?").get(slug);
}

export async function saveMeal(meals) {
  // forces the meal title to be lower cased and slugified by the module.
  meals.slug = slugify(meals.title, { lower: true });
  // Sanitize user input
  meals.instructions = xss(meals.instructions);
  // extension of the image file
  const extension = meals.image.name.split(".").pop();
  // filename of the image to be stored.
  const filename = `${meals.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);
  // create an image buffer to write to.
  const bufferData = await meals.image.arrayBuffer();

  // write image from the buffer data
  stream.write(Buffer.from(bufferData), (err) => {
    if (err) {
      console.log("Saving image failed !!");
    }
  });
  meals.image = `/images/${filename}`;

  console.log(meals);
  db.prepare(
    `
      INSERT INTO meals VALUES (
         null,
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )`
  ).run(meals);
}
