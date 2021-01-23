import { GithubOrg, GithubRepo, GithubUser } from 'common/api/github/repo';
import { GRADES_API_URL } from 'common/constants';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import { FC } from 'react';
import cx from 'classnames';

import styles from './about-view.module.scss';
import { ContributorCard } from './ContributorCard';
import { OrgCard } from './OrgCard';
import { RepoCard } from './RepoCard';
import Head from 'next/head';

const TEXT = {
  KARSTAT: {
    LINK: 'http://www.ntnu.no/karstat/login.do',
  },
  TIA: {
    LINK: 'https://api.ntnu.no/api.html',
  },
  GRADES_API_V2: {
    DOCS: {
      LINK: `${GRADES_API_URL}/api/v2/docs/`,
    },
    LINK: `${GRADES_API_URL}/api/v2/`,
  },
  UA_ARTICLE: {
    NAME: 'Denne tjenesten gjør at du kan sjekke karakterene i alle emner',
    LINK:
      'https://www.universitetsavisa.no/student/denne-tjenesten-gjor-at-du-kan-sjekke-karakterene-i-alle-emner/101265',
  },
};

interface Props {
  contributors: GithubUser[];
  organization: GithubOrg;
  repos: GithubRepo[];
}

export const AboutView: FC<Props> = ({ contributors, organization, repos }) => {
  return (
    <>
      <Head>
        <title>grades.no - om siden</title> 
        <meta property="og:title" content="grades.no - om siden" />
        <meta name="description" content="Om siden" />
        <meta property="og:description" content="Om siden" />
      </Head>
      <article className={styles.container}>
        <Heading className={styles.sectionHeading} as="h1" size="h2">
          Om siden
        </Heading>
        <section>
          <Heading className={cx(styles.contributorsTitle, styles.sectionHeading)} as="h2" size="h3">
            Hvor hentes informasjonen fra?
          </Heading>
          <Text>
            Karakterstatistikk er hentet fra{' '}
            <ExternalLink href={TEXT.KARSTAT.LINK}>NTNU Karstat (ikke lenger tilgjengelig)</ExternalLink>
          </Text>
          <Text>
            Emneinformasjon er hentet fra <ExternalLink href={TEXT.TIA.LINK}>NTNU API</ExternalLink>
          </Text>
          <Heading className={cx(styles.contributorsTitle, styles.sectionHeading)} as="h2" size="h3">
            Grades.no har et åpent API!
          </Heading>
          <Text>
            Ønsker du å lage en applikasjon som drar nytte av emneinformasjon eller karakterstatistikk? Vi har et åpent
            API du kan bruke!
          </Text>
          <Text>
            <ExternalLink href={TEXT.GRADES_API_V2.DOCS.LINK}>
              Dokumentasjon for API-et finner du her (Swagger)
            </ExternalLink>
          </Text>
          <Text>
            <ExternalLink href={TEXT.GRADES_API_V2.LINK}>API-et finner du her</ExternalLink>
          </Text>
        </section>
        <section>
          <Heading className={styles.sectionHeading} as="h2" size="h3">
            Historie
          </Heading>
          <Text>
            Universitetsavisa har også skrevet en kort artikkel om nettsiden og dens historie: <br />
            <ExternalLink href={TEXT.UA_ARTICLE.LINK}>{TEXT.UA_ARTICLE.NAME}</ExternalLink>
          </Text>
        </section>
        <section className={styles.reposSection}>
          <Heading className={cx(styles.contributorsTitle, styles.sectionHeading)} as="h2" size="h3">
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
          <Heading className={cx(styles.contributorsTitle, styles.sectionHeading)} as="h2" size="h3">
            Utviklere
          </Heading>
          <div className={styles.contributorsText}>
            <Text>Prosjektet er utviklet flere {'"generasjoner"'} med studenter siden 2013.</Text>
            <Text>Det ble startet av en gruppe frivillige før det ble overført til Linjeforeningen Online i 2017</Text>
          </div>
          <ul className={styles.contributorsList}>
            {contributors
              .sort((userA, userB) => userB.contributions - userA.contributions)
              .map((user) => (
                <li key={user.id} className={styles.listItem}>
                  <ContributorCard user={user} />
                </li>
              ))}
          </ul>
        </section>
        <section className={styles.orgsSection}>
          <Heading className={cx(styles.orgsTitle, styles.sectionHeading)} as="h2" size="h3">
            Med støtte fra
          </Heading>
          <Text className={styles.orgsText}>Nettsidene vedlikeholdes og driftes as Linjeforeningen Online.</Text>
          <OrgCard className={styles.orgsCard} org={organization} />
        </section>
      </article>
    </>
  );
};

interface ExternalLinkProps {
  className?: string;
  href: string;
}

const ExternalLink: FC<ExternalLinkProps> = ({ className, href, children }) => {
  return (
    <a className={cx(className, styles.externalLink)} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};
