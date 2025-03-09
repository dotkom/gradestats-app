import { redirect } from 'next/navigation';

import styles from './login-view.module.scss';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import { getServerSession } from 'next-auth';
import LoginButton from './login-button';

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

export default async function LoginPage() {
  const session = await getServerSession();

  if (session?.user) {
    return redirect('/');
  }

  return (
    <>
      <title>{TEXT.TITLE}</title>
      <meta property="description" content={TEXT.DESCRIPTION} />
      <div className={styles.container}>
        <Heading className={styles.title} as="h1" size="h3">
          {TEXT.HEADING}
        </Heading>
        <LoginButton />
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
}
