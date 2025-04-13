"use client";

import { FormEvent } from "react";
import toast from "react-hot-toast";
import { motion } from "motion/react"
import { useRouter } from "next/navigation";

export default function UserComponent({id,userName,userEmail} : {userName:string | undefined; id: string; userEmail : string;})
{
    const rt = useRouter();
    async function deleteUser(e: FormEvent)
    {
        e.preventDefault();
        const deletedUser = await fetch(`/api/admin/`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({id:id}),
        });

        if(deletedUser.status == 200)
            {
                toast.success('Deletion done!');
                rt.push('/admin');
                return;
            }
        
            toast.error("Could not delete!");
            return;
    }
    
    return <>
    <motion.div className="card"  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} initial={{ scale: 0 , x : -100}} animate={{ scale: 1, x:0 }} transition={{duration:0.25}} >
        <div className="card-body min-md:w-fit max-md:w-fit m-1 border-2 rounded-lg">
            <p className="min-md:text-xl max-md:text-md text-wrap">
                <span className="text-2xl font-extrabold">UserName : </span>{userName}
            </p>
            <p className="min-md:text-xl max-md:text-md">
                <span className="text-2xl font-extrabold">Email : </span>{userEmail}
            </p>
            <button className="border-1 btn" onClick={(e)=>deleteUser(e)}>
                Delete
            </button>
        </div>
    </motion.div>
    </>;
}