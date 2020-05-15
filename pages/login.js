import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useUser } from 'common/hooks/userUser';
import { useQueryParam } from 'common/hooks/useQueryParam';

const LoginPage = () => {
  const router = useRouter();
  const [user] = useUser();
  const [returnToPath] = useQueryParam('returnToPath', '/');

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push('/');
  }, [user]);

  return (
    <>
      <h1>Logg inn med FEIDE</h1>
      <div className="form-container">
        <h2>Hvorfor må jeg logge inn?</h2>
        <p>
          Grades.no er drevet av frivillige studenter, og vi setter stor pris på bidragene andre studenter kommer med
          til innholdet på siden! For at vi skal kunne fortsette arbeidet og gjøre det lettere for oss å moderere
          innholdet dere legger til er det nødvendig at vi vet hvem som legger inn innholdet.
        </p>
        <h2>Hvilken informasjon lagres?</h2>
        <p>Ved å lagre innhold på siden lagres e-postadressen til FEIDE-brukeren din (vanligvis navn@stud.ntnu.no).</p>
        <Link href={{ pathname: '/api/auth/login', query: { returnToPath } }}>
          <a>
            <button className="feide-button" type="button">
              Logg inn
            </button>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .feide-button {
          background-color: #1f4698;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 44px;
          width: min-content;
          padding: 11px 28px;
          margin: 0;
          border: none;
          white-space: nowrap;
          font-size: 14px;
          font-weight: 600;
          font-style: normal;
        }
      `}</style>
    </>
  );
};

export default LoginPage;
