'use client';

import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type formData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type ErrorData = {
  userError:string;
  passwordError: string;
  confirmPasswordError: string;
};

export default function signup() {
  const [fData, setFData] = useState<formData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const rt = useRouter();

  const [error, setError] = useState<ErrorData>({
    userError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFData((f) => ({ ...f, [name]: value }));
    return;
}

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError((e) => ({
      userError:'',
      passwordError: '',
      confirmPasswordError: '',
    }));

    if (fData.password.length < 8) {
      setError((e) => ({
        ...e,
        passwordError: 'Password length should be minimum 8 characters',
      }));
    } else if (fData.password !== fData.confirmPassword) {
      setError((e) => ({ ...e, confirmPasswordError: 'Password mismatch!' }));
    } else {
      //  You can send data to backend here
      try {
        const res = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify(fData),
        });

        const userExist = await res.json();

        if (res.status == 200) {
          alert('Signup successful!');
          rt.push('/dashboard');
        } else if(userExist.message === 'User Exists !')
          {
            setError((e)=>({...e, userError:'User already exists!'}));
          }
          else {
          alert('Signup failed');
        }
      } catch (err) {
        console.error('Signup error:', err);
      }
    }

    return;
  }

  

  return (
    <>
      <form method="POST" onSubmit={(e) => submitHandler(e)}>
        <div className="bg-base-200 min-h-screen flex justify-center items-center">
          <div className="flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold mb-10">SignUp now!</h1>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="fieldset-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                  {error.userError.length > 0 && (
                    <p className="text-error text-md">{error.userError}</p>
                  )}
                  <label className="fieldset-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  {error.passwordError.length > 0 && (
                    <p className="text-error text-md">{error.passwordError}</p>
                  )}
                  <label className="fieldset-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="input"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  {error.confirmPasswordError.length > 0 && (
                    <p className="text-error text-md">
                      {error.confirmPasswordError}
                    </p>
                  )}
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button type="submit" className="btn btn-success mt-4">
                    signup
                  </button>
                  <Link href="/signin">
                    <button className="btn btn-dash mt-4 w-full">
                      Already a member ?
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
