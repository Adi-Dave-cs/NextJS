"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster,toast } from "react-hot-toast";

type TodoData = {
    title : string;
    description : string;
}

export default function AddTodoComponent({userid}:{userid : string | undefined})
{
    const [fData, setFData] = useState<TodoData>({title:'', description:''});
    const rt = useRouter();

    function handleChange(e : React.ChangeEvent<HTMLInputElement>)
    {
        const {name, value} = e.target;
        setFData(f=>({...f, [name] : value}));
    }

    async function submitHandler(e : React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        try {
            const res = await fetch(`api/todos/${userid}/`, {
              method: 'POST',
              body: JSON.stringify(fData),
              headers: { 'Content-Type': 'application/json' },
            });
    
            if (res.status == 200) {
              toast.success('Adding Todo successful!');
              rt.push('/dashboard');
            }else {
              toast.error('Adding Todo failed');
            }
          } catch (err) {
            console.error('Todo error:', err);
          }
    }

    return <>
    <div className="min-md:w-fit p-5 max-md:w-1/2 rounded-lg mb-5 bg-base-100">
    <p className="text-xl max-md:text-lg text-center m-2">Add A Todo</p>
    <form onSubmit={submitHandler} className="min-md:flex max-md:flex max-md:flex-col gap-3" >
        <fieldset >
        <legend className="fieldset-legend">Title</legend>
        <input type="text" name="title" className="input" onChange={handleChange} required placeholder="Title" />
        </fieldset>
        <fieldset>
        <legend className="fieldset-legend">Description</legend>
        <input
            type="text"
            name='description'
            className="input"
            placeholder="Brief description"
            onChange={handleChange}
        />
        </fieldset>
        <fieldset className="flex justify-center max-md:flex-col min-md:items-end gap-2">
        <button type="submit" className="btn btn-primary">submit</button>
        <button type="reset" className="btn btn-accent">reset</button>
        </fieldset>
    </form>
    </div>
    </>;
}