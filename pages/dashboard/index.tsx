import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { withUser } from 'common/auth/ssr';
import { Heading } from 'components/Typography/Heading';
import { LoggedInUser } from 'models/User';

interface ServerProps {
  user: LoggedInUser | null;
}

const TEXT = {
  TITLE: 'Dashboard',
  DESCRIPTION: 'Administrasjonssider for grades.no',
  HEADER: (fullName: string) => `Velkommen til administrasjon av grades.no, ${fullName}`,
};

const DashboardPage: FC<ServerProps> = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <>
      <Head>
        <title>{TEXT.TITLE}</title>
        <meta property="og:title" content={TEXT.TITLE} />
        <meta name="description" content={TEXT.DESCRIPTION} />
        <meta property="og:description" content={TEXT.DESCRIPTION} />
      </Head>
      <div>
        <Heading as="h1" size="h2">
          {TEXT.HEADER(user.fullName)}
        </Heading>
        <ul>
          <li>
            <Link href="/dashboard/users">Brukere</Link>
          </li>
          <li>
            <Link href="/dashboard/scrapers/karstat">Karstat</Link>
          </li>
          <li>
            <Link href="/dashboard/scrapers/tia">TIA</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export const getServerSideProps = withUser<ServerProps>(async (_, user) => {
  const props = {
    user,
  };
  if (user?.isStaff) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props,
    };
  }
  return {
    props,
  };
});

export default DashboardPage;
