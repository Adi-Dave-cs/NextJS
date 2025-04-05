"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TodoComponent from '@/components/TodoComponent/TodoComponentExample';
import Pricing from '@/components/Pricing/Pricing';

export default function Home() {

  return (
    <div
      className="w-full h-full bg-base-200"
    >

      <div className="bg-base-300 w-full h-max px-8 py-8 ">
        <p className="min-md:text-4xl max-md:text-2xl text-center font-extrabold capitalize">
          <span className="opacity-70">All your </span>
          <span className="font-extrabold text-green-500 primary-content">
            TODOS
          </span>
          <span className="opacity-70"> in one place</span>
        </p>
        <div className="flex relative item-center mt-8 bg-base-100 rounded-md shadow-md p-2 justify-center">
          <div className="max-lg:stack min-lg:flex transition-all duration-700 max-lg:gap-2 min-lg:gap-10 min-lg:justify-center min-lg:items-center mb-3 min-md:size-8/12">
              <TodoComponent
                key = {1}
                title="Visit NexToDo"
                description="visit NexTodo!"
                completed={false}
                username="Me"
              />

              <TodoComponent
                key = {2}
                title="SignUp !"
                description="Sign Up!"
                completed={false}
                username="Me"
              />

                <TodoComponent
                key = {3}
                title="Share"
                description="Share it with your circle!"
                completed={false}
                username="Me"
              />
          </div>
        </div>
        <h2 className="min-md:text-4xl max-md:text-2xl font-extrabold mt-10 text-3xl text-center">
          <span className="opacity-70"> Just Get Stuff </span>{' '}
          <span className=" text-green-500 ">Done! </span>
        </h2>
      </div>
      <div className="p-3 bg-base-100 m-3">
        <h2 className="text-center m-3 mb-10 max-md:text-2xl text-4xl font-extrabold">
          <span className="opacity-60">Pricing ? It's totally </span>{' '}
          <span className="text-warning">FREE!!</span>
        </h2>
        <Pricing />
      </div>
      <footer className=" w-full h-[50px] flex justify-center items-center">
        <p className="font-extrabold text-center m-10 ">
          <span className="opacity-60 text-shadow-md text-shadow-amber-200">Made with</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="crimson"
            className="size-5 h-[30px] w-[30px] inline shadow-lg "
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        </p>
      </footer>
    </div>
  );
}
