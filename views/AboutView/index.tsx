import { GithubOrg, GithubRepo, GithubUser } from 'common/api/github/repo';
import { GRADES_API_URL } from 'common/constants';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import React, { FC } from 'react';

import styles from './about-view.module.scss';
import { ContributorCard } from './ContributorCard';
import { OrgCard } from './OrgCard';
import { RepoCard } from './RepoCard';

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
  organization: GithubOrg;
  repos: GithubRepo[];
}

export const AboutView: FC<Props> = ({ contributors, organization, repos }) => {
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
        </Text>
        <Text>
          <a href={GRADES_API_V2.DOCS.HREF}>{GRADES_API_V2.DOCS.HREF}</a>
        </Text>
      </section>
      <section>
        <Heading as="h3" size="h4">
          Historie
        </Heading>
        <Text>
          Universitetsavisa har også skrevet en kort artikkel om nettsiden og dens oppbrinnelse:
          <a href={UA_ARTICLE.HREF} target="_blank" rel="noopener noreferrer">
            {UA_ARTICLE.NAME}
          </a>
        </Text>
      </section>
      <section className={styles.reposSection}>
        <Heading className={styles.contributorsTitle} as="h3" size="h4">
          Kode
        </Heading>
        <Text>
          Grades.no er åpen kildekode, og alt ligger tilgjengelig på Github. Prosjektet er delt i to, `gradestats` som
          er back-end og `gradestats-app` som er front-end.
        </Text>
        <div className={styles.reposList}>
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </section>
      <section className={styles.contributorsSection}>
        <Heading className={styles.contributorsTitle} as="h3" size="h4">
          Utviklerne
        </Heading>
        <div className={styles.contributorsText}>
          <Text>Dette prosjektet har blitt holdt i live av en rekke studenter gjennom flere generasjoner.</Text>
        </div>
        <ul className={styles.contributorsList}>
          {contributors
            .sort((userA, userB) => userB.contributions - userA.contributions)
            .map((user) => (
              <ContributorCard key={user.id} user={user} />
            ))}
        </ul>
      </section>
      <section className={styles.orgsSection}>
        <Heading className={styles.orgsTitle} as="h2" size="h3">
          Med støtte fra
        </Heading>
        <Text className={styles.orgsText}>Online holder denne tjenesten i live</Text>
        <OrgCard className={styles.orgsCard} org={organization} />
      </section>
    </article>
  );
};
