import AddTodoComponent from "@/components/AddTodoComponent/AddTodoComponent";
import { getCurrentUser } from "@/lib/userAction";
import TodoComponent from "@/components/TodoComponent/TodoComponent";


export default async function Dashboard()
{
    const user= await getCurrentUser();
    const userName = user?.uName.toString();
    const todos = await fetch(`${process.env.HOST_URL}/api/todos/${userName}`,{method : 'GET'}).then(res => res.json());
    return <>
    <div className="w-full h-full">
    {
    todos.length>0 &&
    <div className="w-full">
        <p className="text-3xl text-center font-extrabold mt-5"> Todos </p>
        <ul className="w-full flex flex-col gap-2 items-center">
        {
            todos.map((todo : any) => <li key={todo._id}><TodoComponent id={todo._id} userName={user?.uName} title={todo.TodoTitle} description={todo.TodoDescription} /></li>)
        }
        </ul>
    </div>
    }
    {
        todos.length == 0 &&
        <div className="max-md:text-3xl min-md:text-6xl text-center font-extrabold text-wrap">
            No todos yet! <span className="text-primary">Add</span> a few to see them ...!
        </div>
    }
    <div className="flex justify-center items-center mt-10">
        <AddTodoComponent userid={user?.uName}/>
    </div>
    </div>
    </>;
}