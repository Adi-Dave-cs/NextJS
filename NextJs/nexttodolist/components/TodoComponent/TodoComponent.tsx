"use client";

import { FormEvent } from "react";
import toast from "react-hot-toast";
import { motion } from "motion/react"
import { useRouter } from "next/navigation";

export default function TodoComponent({id,userName,title, description} : {userName:string | undefined; id: string; title : string; description : string;})
{
    const rt = useRouter();
    async function deleteTodo(e: FormEvent)
    {
        e.preventDefault();
        const deletedTodo = await fetch(`/api/todos/${userName}`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({id:id}),
        });

        if(deletedTodo.status == 200)
            {
                toast.success('Deletion done!');
                rt.push('/dashboard');
                return;
            }
        
            toast.error("Could not delete!");
            return;
    }
    async function markAsRead(e : FormEvent)
    {
        e.preventDefault();
        const updatedTodo = await fetch(`/api/todos/${userName}`,
        {
            method : 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:id,title:title,description:description,userName:userName,completed:true}),
        });

        console.log(updatedTodo.json());
        
        if(updatedTodo.status == 200)
        {
            toast.success('Marked as done!');
            rt.push('/dashboard');
            return;
        }

        toast.error('Could not update todo!');
        return;
    }
    return <>
    <motion.div className="card"  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} initial={{ scale: 0 , x : -100}} animate={{ scale: 1, x:0 }} transition={{duration:0.25}} >
        <div className="card-body min-md:w-90 max-md:w-50 m-1 border-2 rounded-lg">
            <p className="min-md:text-xl max-md:text-md">
                <span className="text-2xl font-extrabold">Title : </span>{title}
            </p>
            <p className="min-md:text-xl max-md:text-md">
                <span className="text-2xl font-extrabold">Description : </span>{description}
            </p>
            <button className="border-1 btn" onClick={markAsRead}>
                Mark As Done!
            </button>
            <button className="border-1 btn btn-error" onClick={(e)=>deleteTodo(e)}>
                Delete
            </button>
        </div>
    </motion.div>
    </>;
}