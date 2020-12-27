import { getAllContributors, GithubUser } from 'common/api/github/repo';
import { GetStaticProps } from 'next';
import React, { FC } from 'react';
import { AboutView } from 'views/AboutView';

interface StaticProps {
  contributors: GithubUser[];
}

const AboutPage: FC<StaticProps> = ({ contributors }) => {
  return <AboutView contributors={contributors} />;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const contributors = await getAllContributors();
  return { revalidate: 60 * 60 * 24, props: { contributors } };
};

export default AboutPage;
