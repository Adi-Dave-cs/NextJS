'use client';

import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';


type formData = {
  email: string;
  password: string;
};

export default function Signin() {
  const rt = useRouter();
  
  const [fData, setFData] = useState<formData>({
      email: '',
      password: '',
    });

  async function submitHandler(e: React.FormEvent<HTMLFormElement>)
  {
    e.preventDefault();
    try {
      const res = await fetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify(fData),
      });

      const userExist = await res.json();

      if (res.status == 200) {
        alert('Signin successful!');
        rt.push('/dashboard');
      } 
      else {
        alert('SignIn failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFData((f) => ({ ...f, [name]: value }));
    return;
}

  return (
    <>
    <form onSubmit={(e) => submitHandler(e)} method='POST'>
      <div className="bg-base-200 min-h-screen flex justify-center items-center">
        <div className="flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-10">Signin now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="fieldset-label">Email</label>
                <input type="email" name="email" className="input" onChange={handleChange} placeholder="Email" />
                <label className="fieldset-label">Password</label>
                <input
                  type="password"
                  name='password'
                  className="input"
                  placeholder="Password"
                  onChange={handleChange}

                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button type="submit" className="btn btn-success mt-4">
                  Login
                </button>
                <Link href="/signup">
                  <button className="btn btn-dash mt-4 w-full">
                    Not a member ?
                  </button>
                </Link>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </form>
    </>
  );
}
