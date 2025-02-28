import { getAllContributors, getGithubOrg, getGithubRepos } from 'common/api/github/repo';
import { Metadata } from 'next';
import { FC } from 'react';
import { AboutView } from 'views/AboutView';

export const metadata: Metadata = {
  title: 'grades.no - om siden',
  description: 'Om siden',
};

const AboutPage: FC = async () => {
  const { contributors, organization, repos } = await getProps();
  return <AboutView contributors={contributors} organization={organization} repos={repos} />;
};

const getProps = async () => {
  // FIXME: revalidate 60, 60, 24
  const [contributors, organization, repos] = await Promise.all([
    getAllContributors(),
    getGithubOrg(),
    getGithubRepos(),
  ]);

  return { contributors, organization, repos };
};

export default AboutPage;
