import Link from 'next/link';

export default function signin() {
  return (
    <>
      <div className="bg-base-200 min-h-screen flex justify-center items-center">
        <div className="flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-10">Signin now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="fieldset-label">Email</label>
                <input type="email" className="input" placeholder="Email" />
                <label className="fieldset-label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
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
    </>
  );
}
