import { Octokit } from '@octokit/rest';
import { filterDistinctBy } from 'common/utils/array';

const api = new Octokit();

const ORG = 'dotkom';
// const REPOS = ['gradestats', 'gradestats-app'];

type GradestatsRepo = 'gradestats' | 'gradestats-app';

const getContributorsForRepo = async (name: GradestatsRepo) => {
  const response = await api.repos.listContributors({ owner: ORG, repo: name });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(`Could not fetch contributors from Github`);
};

const getGithubUserByUsername = async (username: string) => {
  const response = await api.users.getByUsername({ username });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(`Could not fetch user by username (${username}) from Github`);
};

export interface GithubUser {
  id: number;
  name: string | null;
  username: string;
  avatarUrl: string;
  contributions: number;
  url: string;
  type: string;
}

export const getAllContributors = async (): Promise<GithubUser[]> => {
  const getBackendContributorsPromise = getContributorsForRepo('gradestats');
  const getFrontendContributorsPromise = getContributorsForRepo('gradestats-app');
  const [backendContributors, frontendContributors] = await Promise.all([
    getBackendContributorsPromise,
    getFrontendContributorsPromise,
  ]);
  const allContributors = [backendContributors, frontendContributors]
    .flat()
    .filter((user) => user.type === 'User')
    .map((responseUser, _, allUsers) => {
      const equalUsers = allUsers.filter((user) => user.id === responseUser.id);
      return {
        id: responseUser.id,
        name: responseUser.name,
        username: responseUser.login,
        avatarUrl: responseUser.avatar_url,
        contributions: equalUsers.reduce((a, c) => a + c.contributions ?? 0, 0),
        url: responseUser.html_url,
        type: responseUser.type,
      } as GithubUser;
    })
    .filter(filterDistinctBy((user) => user.id));
  const users = Promise.all(
    allContributors.map(async (user) => {
      const u = await getGithubUserByUsername(user.username);
      return {
        ...user,
        name: u.name,
      };
    })
  );
  return users;
};
