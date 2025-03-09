import { getAllContributors, getGithubOrg, getGithubRepos } from 'common/api/github/repo';
import { AboutView } from 'views/AboutView';

export const revalidate = 86_400;

export default async function Page() {
  const [contributors, organization, repos] = await Promise.all([
    getAllContributors(),
    getGithubOrg(),
    getGithubRepos(),
  ]);

  return (
    <>
      <title>grades.no - om siden</title>
      <meta property="description" content="Om siden" />
      <AboutView contributors={contributors} organization={organization} repos={repos} />
    </>
  );
}
