import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useUser } from 'common/hooks/useUser';
import { useQueryParam } from 'common/hooks/useQueryParam';

import styles from './login-view.module.scss';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';

export const LoginView: FC = () => {
  const router = useRouter();
  const [user] = useUser();
  const [returnToPath] = useQueryParam('returnToPath', '/');

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push('/');
  }, [user]);

  return (
    <div className={styles.container}>
      <Heading className={styles.title} as="h1" size="h3">
        Logg inn med FEIDE
      </Heading>
      <div>
        <Heading className={styles.paragraphTitle} as="h2" size="h4">
          Hvorfor må jeg logge inn?
        </Heading>
        <Text className={styles.paragraph}>
          Grades.no er drevet av frivillige studenter, og vi setter stor pris på bidragene andre studenter kommer med
          til innholdet på siden! For at vi skal kunne fortsette arbeidet og gjøre det lettere for oss å moderere
          innholdet dere legger til er det nødvendig at vi vet hvem som legger inn innholdet.
        </Text>
        <Heading className={styles.paragraphTitle} as="h2" size="h4">
          Hvilken informasjon lagres?
        </Heading>
        <Text className={styles.paragraph}>
          Ved å lagre innhold på siden lagres e-postadressen til FEIDE-brukeren din (vanligvis {`<navn>@stud.ntnu.no`}).
        </Text>
        <Link href={{ pathname: '/api/auth/login', query: { returnToPath } }}>
          <a>
            <button className={styles.feideButton} type="button">
              Logg inn
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};
