"use client";

import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import ThemeToggle from "@/components/ThemeProvider/ThemeToggler";
import { useRouter } from "next/navigation";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const rt = useRouter();
  return (
    <>
        <ThemeProvider/>
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <Link href="./" className="mx-2 max-md:text-xl text-4xl font-extrabold">NextTodoList</Link>
        </div>
        <div>
          <ThemeToggle/>
        </div>
      </div>
        {children}
      </>
  );
}
