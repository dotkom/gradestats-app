import { getAllContributors, getGithubOrg, GithubUser, GithubOrg } from 'common/api/github/repo';
import { GetStaticProps } from 'next';
import React, { FC } from 'react';
import { AboutView } from 'views/AboutView';

interface StaticProps {
  contributors: GithubUser[];
  organization: GithubOrg;
}

const AboutPage: FC<StaticProps> = ({ contributors, organization }) => {
  return <AboutView contributors={contributors} organization={organization} />;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const contributors = await getAllContributors();
  const organization = await getGithubOrg();
  return { revalidate: 60 * 60 * 24, props: { contributors, organization } };
};

export default AboutPage;
