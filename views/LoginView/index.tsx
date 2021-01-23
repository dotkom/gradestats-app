import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useUser } from 'common/hooks/useUser';
import { useQueryParam } from 'common/hooks/useQueryParam';

import styles from './login-view.module.scss';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import Head from 'next/head';

const TEXT = {
  TITLE: 'grades.no - logg inn',
  DESCRIPTION: 'Logg inn',
  HEADING: 'Logg inn med Feide',
  CONTENT: {
    WHY_LOGIN: {
      HEADING: 'Hvorfor må jeg logge inn?',
      PARAGRAPH: `
        Grades.no er drevet av frivillige studenter, og vi setter stor pris på bidragene andre studenter kommer med
        til innholdet på siden! For at vi skal kunne fortsette arbeidet og gjøre det lettere for oss å moderere
        innholdet dere legger til er det nødvendig at vi vet hvem som legger inn innholdet.
      `,
    },
    PRIVACY: {
      HEADING: 'Hvilken informasjon lagres?',
      PARAGRAPH: `
        Ved å logge inn vil enkel brukerinformasjon fra Feide lagres for å kunne verifisere deg som student.
        Informasjonen som lagres er e-postadressen din (vanligvis <navn>@stud.ntnu.no) og navnet ditt.
        Denne informasjonen vil ikke vises til andre brukere uten ditt samtykke ved et senere tidspunkt.
      `,
    },
  },
};

export const LoginView: FC = () => {
  const router = useRouter();
  const [user] = useUser();
  const [returnToPath] = useQueryParam('returnToPath', '/');

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push('/');
  }, [user]);

  return (
    <>
      <Head>
        <title>{TEXT.TITLE}</title> 
        <meta property="og:title" content={TEXT.TITLE} />
        <meta name="description" content={TEXT.DESCRIPTION} />
        <meta property="og:description" content={TEXT.DESCRIPTION} />
      </Head>
      <div className={styles.container}>
        <Heading className={styles.title} as="h1" size="h3">
          {TEXT.HEADING}
        </Heading>
        <Link href={{ pathname: '/api/auth/login', query: { returnToPath } }}>
          <a>
            <button className={styles.feideButton} type="button">
              Logg inn
            </button>
          </a>
        </Link>
        <div>
          <Heading className={styles.paragraphTitle} as="h2" size="h4">
            {TEXT.CONTENT.WHY_LOGIN.HEADING}
          </Heading>
          <Text className={styles.paragraph}>{TEXT.CONTENT.WHY_LOGIN.PARAGRAPH}</Text>
          <Heading className={styles.paragraphTitle} as="h2" size="h4">
            {TEXT.CONTENT.PRIVACY.HEADING}
          </Heading>
          <Text className={styles.paragraph}>{TEXT.CONTENT.PRIVACY.PARAGRAPH}</Text>
        </div>
      </div>
    </>
  );
};
