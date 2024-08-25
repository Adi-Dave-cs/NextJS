"use client";
import logoImg from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/main_header.module.css";
import { usePathname } from "next/navigation";

export default function MainHeader() {
  const route = usePathname();
  return (
    <>
      <div className={styles.header__menubar}>
        <ul className={styles.header__list}>
          <li>
            <Link href="/" className={styles.logo}>
              <Image src={logoImg} width={48} alt="Foodie Company logo" />
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link
              href="/meals"
              className={`${styles.nolink} ${
                route == "/meals" ? styles.active : ""
              } `}
            >
              Browse meals
            </Link>
          </li>
          <li>
            <Link
              href="/community"
              className={`${styles.nolink} ${
                route == "/community" ? styles.active : ""
              } `}
            >
              Foodie Community
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
