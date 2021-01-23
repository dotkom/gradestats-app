import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN } from 'common/constants';
import { filterDistinctBy } from 'common/utils/array';

const api = new Octokit({ auth: GITHUB_TOKEN });

const ORG = 'dotkom';
type GradestatsRepo = 'gradestats' | 'gradestats-app';
const REPOS: GradestatsRepo[] = ['gradestats', 'gradestats-app'];
const EXCLUDED_USERS = ['dotkom-build'];

const getGithubRepoByName = async (name: GradestatsRepo) => {
  const response = await api.repos.get({ owner: ORG, repo: name });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(`Could not fetch repo by name (${name}) from Github`);
};
export interface GithubRepo {
  id: number;
  name: GradestatsRepo;
  fullName: string;
  url: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  language: string | null;
  openIssues: number;
  watchers: number;
  subscribers: number;
}

export const getGithubRepos = async () => {
  const repos = await Promise.all(REPOS.map(getGithubRepoByName));
  return repos.map<GithubRepo>((repoResponse) => ({
    id: repoResponse.id,
    name: repoResponse.name as GradestatsRepo,
    fullName: repoResponse.full_name,
    url: repoResponse.html_url,
    description: repoResponse.description,
    createdAt: repoResponse.created_at,
    updatedAt: repoResponse.updated_at,
    pushedAt: repoResponse.pushed_at,
    language: repoResponse.language,
    openIssues: repoResponse.open_issues_count,
    watchers: repoResponse.watchers_count,
    subscribers: repoResponse.subscribers_count,
  }));
};

const getContributorsForRepo = async (name: GradestatsRepo) => {
  const response = await api.repos.listContributors({ owner: ORG, repo: name });
  if (response.status === 200) {
    return response.data.filter((user) => !EXCLUDED_USERS.includes(user.login as string));
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
  const contributorsLists = await Promise.all(REPOS.map(getContributorsForRepo));
  const allContributors = contributorsLists
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

const getGithubOrgByName = async (orgName: string) => {
  const response = await api.orgs.get({ org: orgName });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(`Could not fetch org by name (${orgName}) from Github`);
};

export interface GithubOrg {
  login: string;
  url: string;
  avatarUrl: string;
  description: string | null;
  name: string | undefined;
  location: string | undefined;
  email: string | undefined;
  publicReposCount: number;
}

export const getGithubOrg = async (): Promise<GithubOrg> => {
  const githubOrgResponse = await getGithubOrgByName(ORG);
  const githubOrg: GithubOrg = {
    login: githubOrgResponse.login,
    url: githubOrgResponse.html_url,
    avatarUrl: githubOrgResponse.avatar_url,
    description: githubOrgResponse.description,
    name: githubOrgResponse.name,
    location: githubOrgResponse.location,
    email: githubOrgResponse.email,
    publicReposCount: githubOrgResponse.public_repos,
  };
  return githubOrg;
};
