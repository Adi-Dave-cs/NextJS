'use client';
import React from 'react';

type TodoProps = {
  title?: string;
  description?: string;
  completed?: boolean;
  username?: string;
};

const TodoComponent = ({
  title,
  description,
  completed,
  username,
}: TodoProps) => (
  <div className="min-md:w-full max-md:w-1/2 h-full my-2 bg-base-300 rounded-md min-md:shadow-sm max-md:shadow-md shadow-green-200">
    <div className="card-body">
      <div className="flex justify-between">
        <h2 className="max-md:m-1 min-md:m-2 font-extrabold min-md:text-3xl max-md:text-xl min-md:text-center">
          {title}
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          className="stroke-[green] hover:drop-shadow-sm hover:drop-shadow-green-400 mx-2 item-baseline min-md:size-10 max-md:size-6 opacity-30 hover:opacity-90 w-[40px] h-[40px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <h3 className="m-2 min-md:text-xl max-md:text-sm opacity-50">{description}</h3>
    </div>
  </div>
);

export default TodoComponent;
