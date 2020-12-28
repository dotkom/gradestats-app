import { GithubUser } from 'common/api/github/repo';
import { GRADES_API_URL } from 'common/constants';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import React, { FC } from 'react';

import styles from './about-view.module.scss';

const UA_ARTICLE = {
  NAME: 'Denne tjenesten gjør at du kan sjekke karakterene i alle emner',
  HREF:
    'https://www.universitetsavisa.no/student/denne-tjenesten-gjor-at-du-kan-sjekke-karakterene-i-alle-emner/101265',
};

const GRADES_API_V2 = {
  DOCS: {
    HREF: `${GRADES_API_URL}/api/v2/docs/`,
  },
  HREF: `${GRADES_API_URL}/api/v2/`,
};

interface Props {
  contributors: GithubUser[];
}

export const AboutView: FC<Props> = ({ contributors }) => {
  return (
    <article className={styles.container}>
      <Heading className={styles.sectionHeading} as="h1" size="h2">
        Om siden
      </Heading>
      <section>
        <Heading className={styles.contributorsTitle} as="h2" size="h3">
          Datagrunnlaget
        </Heading>
        <Heading className={styles.contributorsTitle} as="h3" size="h4">
          Hvor hentes informasjonen fra?
        </Heading>
        <Text>Karakterstatistikk </Text>

        <Heading className={styles.contributorsTitle} as="h3" size="h4">
          Grades.no har et åpent API!
        </Heading>
        <Text>
          <a href={GRADES_API_V2.HREF}>{GRADES_API_V2.HREF}</a>
          <a href={GRADES_API_V2.DOCS.HREF}>{GRADES_API_V2.DOCS.HREF}</a>
        </Text>
      </section>
      <section>
        <Heading className={styles.contributorsTitle} as="h2" size="h3">
          Takk til...
        </Heading>
        <div className={styles.contributorsSection}>
          <Heading className={styles.contributorsTitle} as="h3" size="h4">
            Utviklerne
          </Heading>
          <div className={styles.contributorsText}>
            <Text>Dette prosjektet har blitt holdt i live av en rekke studenter gjennom flere generasjoner.</Text>
            <Text>
              Universitetsavisa har også skrevet en kort artikkel om nettsiden og dens oppbrinnelse:
              <a href={UA_ARTICLE.HREF} target="_blank" rel="noopener noreferrer">
                {UA_ARTICLE.NAME}
              </a>
            </Text>
          </div>
          <ul className={styles.contributorsList}>
            {contributors
              .sort((userA, userB) => userB.contributions - userA.contributions)
              .map((user) => (
                <li key={user.id} className={styles.contributorsItem}>
                  <a href={user.url} target="_blank" rel="noopener noreferrer">
                    <img className={styles.contributorImage} src={user.avatarUrl} alt={user.name ?? user.username} />
                    <Text size="h5">{user.name ?? user.username}</Text>
                    <Text>{user.name && <span>({user.username})</span>}</Text>
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <Heading className={styles.contributorsTitle} as="h2" size="h3">
            Linjeforeningen Online
          </Heading>
          <Text>Online holder denne tjenesten i live</Text>
          <ul className={styles.contributorsList}>
            <li className={styles.contributorsItem}>
              <a href="https://github.com/dotkom" target="_blank" rel="noopener noreferrer">
                <img
                  className={styles.contributorImage}
                  src="https://avatars0.githubusercontent.com/u/693951?s=400&v=4"
                  alt="Logo dotkom"
                />
                <Text size="h5">Drifts- og Utviklingskomiteen i Linjeforeningen Online</Text>
                <Text>Dotkom</Text>
              </a>
            </li>
            <li className={styles.contributorsItem}>
              <a href="https://online.ntnu.no" target="_blank" rel="noopener noreferrer">
                <img
                  className={styles.contributorImage}
                  src="https://online.ntnu.no/img/online_logo.svg"
                  alt="Logo Linjeforeningen Online"
                />
                <Text size="h5">Linjeforeningen Online</Text>
                <Text>online.ntnu.no</Text>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section></section>
    </article>
  );
};
