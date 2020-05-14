import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useUser } from 'common/hooks/userUser';

const LoginPage = () => {
  const router = useRouter();
  const [user] = useUser();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push('/');
  }, [user]);

  return (
    <>
      <h1>Login to Example</h1>
      <div className="form-container">
        <Link href="/api/auth/login">
          <a>
            <button className="btn btn-default" type="button">
              Login
            </button>
          </a>
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
