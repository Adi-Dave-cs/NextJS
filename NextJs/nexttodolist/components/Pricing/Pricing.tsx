import Link from "next/link";

export default function Pricing() {
    return (
      <div className="card bg-base-300 shadow-md shadow-green-200 min-md:w-[50%] max-md:w-[80%] h-max m-auto">
        <div className="card-body">
          <span className="badge badge-xs badge-warning">Just Login!</span>
          <div className="flex justify-between items-baseline">
            <h2 className="min-md:text-4xl max-md:text-xl font-bold">Free</h2>
            <span className="min-md:text-3xl max-md:text-sm">$0/mo</span>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 me-2 inline-block text-success h-[40px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-md min-md:text-2xl">Manipulate Todos</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 me-2 inline-block text-success h-[40px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-md min-md:text-2xl">
                Get Periodic Notifications
              </span>
            </li>
          </ul>
          <div className="mt-6 flex justify-evenly">
            <Link href="/signup">
            <button className="btn btn-success btn-block rounded-lg " >
            <p className="min-md:text-2xl max-md:text-xl">Join Now!</p> 
            </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  