'use client';

import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';


type formData = {
  email: string;
  password: string;
  verification_code: string;
};

export default function Forget_password() {
  const rt = useRouter();
  const [confirm,setConfirm] = useState<Boolean>(false);
  const [error,setError] = useState<String>('');

  const [fData, setFData] = useState<formData>({
      email: '',
      password: '',
      verification_code:'',
    });
  
  async function sendEmail()
  {
    const res = await fetch(`/api/users/checkUser/${fData['email']}`);

    if(res.status != 200)
    {
      setError(e=>"User Already Exists!");
      return;
    }
    setError('');
    const email = await fetch(`/api/users/sendEmail/${fData['email']}`,{method : 'POST'});
    if(email.status != 200)
    {
      toast.error("Email not sent! Some internal error, contact the owner");
      return;
    }

    if(email.status == 200)
    {
      setConfirm(true);
      toast.success("Mail sent! Please check your emails.");
      return;
    }
    setConfirm(false);
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>)
  {
    e.preventDefault();
    try {
      const succeeded = await fetch(`/api/users/verifyAndChange/${fData['email']}`,{method:'POST' , body: JSON.stringify(fData)});
      if(succeeded.status == 200)
      {
        toast.success('Password Changed! Redirecting to signin ...');
        rt.push('/signin');
        return;
      }

      toast.error('Password not updated');
    } catch (err) {
      console.error('Error:', err);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFData((f) => ({ ...f, [name]: value }));
    return;
}

  return (
    <>
    <Toaster/>
    <form onSubmit={(e) => submitHandler(e)} method='POST'>
      <div className="bg-base-200 min-h-screen flex justify-center items-center">
        <div className="flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-10">Change Password!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="fieldset-label">Email</label>
                <input type="email" name="email" className="input" onChange={handleChange} placeholder="Email" />
                {
                  error.length>0 && <p className='text-md text-red-500'>User does not exist!</p>
                }
                {
                  !confirm &&
                  <button type="button" className="btn btn-success mt-4" onClick={sendEmail}>
                    Confirm
                  </button>
                }
                {
                confirm &&
                <>
                <label className="fieldset-label">Password</label>
                <input
                  type="password"
                  name='password'
                  className="input"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <label className="fieldset-label">Verification Code</label>
                <input
                  type="text"
                  name='verification_code'
                  className="input"
                  placeholder="verification code"
                  onChange={handleChange}
                />
                <button type="submit" className="btn btn-success mt-4">
                  Change
                </button>
                </>
                }
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
