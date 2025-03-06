import { getAllContributors, getGithubOrg, getGithubRepos } from 'common/api/github/repo';
import { FC } from 'react';
import { AboutView } from 'views/AboutView';

const AboutPage: FC = async () => {
  const { contributors, organization, repos } = await getProps();
  return (
    <>
      <title>grades.no - om siden</title>
      <meta property="description" content="Om siden" />
      <AboutView contributors={contributors} organization={organization} repos={repos} />
    </>
  );
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
