import {
  getAllContributors,
  getGithubOrg,
  GithubUser,
  GithubOrg,
  getGithubRepos,
  GithubRepo,
} from 'common/api/github/repo';
import { GetStaticProps } from 'next';
import { FC } from 'react';
import { AboutView } from 'views/AboutView';

interface StaticProps {
  contributors: GithubUser[];
  organization: GithubOrg;
  repos: GithubRepo[];
}

const AboutPage: FC<StaticProps> = ({ contributors, organization, repos }) => {
  return <AboutView contributors={contributors} organization={organization} repos={repos} />;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const contributors = await getAllContributors();
  const organization = await getGithubOrg();
  const repos = await getGithubRepos();
  return { revalidate: 60 * 60 * 24, props: { contributors, organization, repos } };
};

export default AboutPage;
