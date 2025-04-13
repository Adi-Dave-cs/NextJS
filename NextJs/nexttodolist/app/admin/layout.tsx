"use client";

import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import ThemeToggle from "@/components/ThemeProvider/ThemeToggler";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const rt = useRouter();

async function clickhandler() {
    const res = await fetch('/api/users/logout',{method:'POST'});
    if(res){
      toast.success('Logout successful');
      rt.push('/');
    }
    return;
}
  return (
    <>
    <Toaster/>
      <ThemeProvider/>
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <Link href="./" className="mx-2 max-md:text-xl text-4xl font-extrabold">NextTodoList</Link>
        </div>
        <div>
          <ThemeToggle/>
        </div>
        <div>
          
        <button className="btn btn-success btn-block rounded-lg" >
            <p className="min-md:text-2xl max-md:text-xl" onClick={clickhandler}>LogOut!</p> 
        </button>

        </div>
        
      </div>
        {children}
      </>
  );
}
