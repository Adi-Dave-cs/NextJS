"use client";

import UserComponent from "@/components/UserComponent/UserComponent";


export default async function Admin()
{
    const res = await fetch(`${process.env.HOST_URL}/api/admin/`,{method : 'GET'});
    const users = res.json();
    return <>
    <div className="w-full h-full">
    {
    users.length>0 &&
    <div className="w-full">
        <p className="text-3xl text-center font-extrabold mt-5"> Users </p>
        <ul className="w-full flex gap-2">
        {
            users.map((user : any) => <li key={user._id}><UserComponent id={user._id} userName={user?.userName} userEmail={user.userEmail}/></li>)
        }
        </ul>
    </div>
    }
    {
        users.length == 0 &&
        <div className="max-md:text-3xl min-md:text-6xl text-center font-extrabold text-wrap">
            No users yet!
        </div>
    }
    </div>
    </>;
}