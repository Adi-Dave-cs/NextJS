"use client";
import Image from "next/image";
import burgerImg from "@/assets/burger.jpg";
import curryImg from "@/assets/curry.jpg";
import dumplingsImg from "@/assets/dumplings.jpg";
import macncheeseImg from "@/assets/macncheese.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import schnitzelImg from "@/assets/schnitzel.jpg";
import tomatoSaladImg from "@/assets/tomato-salad.jpg";
import styles from "./image-slideshow.module.css";
import { useEffect, useState } from "react";

const images = [
  { image: burgerImg, alt: "A delicious, juicy burger" },
  { image: curryImg, alt: "A delicious, spicy curry" },
  { image: dumplingsImg, alt: "Steamed dumplings" },
  { image: macncheeseImg, alt: "Mac and cheese" },
  { image: pizzaImg, alt: "A delicious pizza" },
  { image: schnitzelImg, alt: "A delicious schnitzel" },
  { image: tomatoSaladImg, alt: "A delicious tomato salad" },
];

export default function ImageSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const Interval = setInterval(() => {
      setIdx((prevIdx) => (prevIdx + 1) % images.length);
    }, 5000);
    return () => clearInterval(Interval);
  }, []);

  return (
    <>
      <div className={styles.slider}>
        {images.map((image, index) => (
          <Image
            src={image.image}
            key={index}
            alt={image.alt}
            style={{ width: "100%", height: "100%" }}
            className={index == idx ? styles.activeTile : styles.inActiveTile}
          />
        ))}
      </div>
    </>
  );
}
