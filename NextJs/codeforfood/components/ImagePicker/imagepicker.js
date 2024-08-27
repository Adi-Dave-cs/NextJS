"use client";

import styles from "./imagepicker.module.css";
import { useRef, useState } from "react";
import Image from "next/image";

export default function Imagepicker({ label, name }) {
  const inputRef = useRef();
  const [pickedImage, setPickedImage] = useState(null);

  function handleChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }
  function handleClick() {
    inputRef.current.click();
  }
  return (
    <>
      <div className={styles.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={styles.controls}>
          <div className={styles.preview}>
            {!pickedImage && <p>No Image has been selected</p>}
            {pickedImage && (
              <Image src={pickedImage} alt="Image selected by the user" fill />
            )}
          </div>
          <input
            className={styles.input}
            type="file"
            id={name}
            accept="image/png , image/jpeg"
            name={name}
            ref={inputRef}
            onChange={handleChange}
            required
          />
          <button className={styles.button} type="button" onClick={handleClick}>
            Pick an Image
          </button>
        </div>
      </div>
    </>
  );
}
