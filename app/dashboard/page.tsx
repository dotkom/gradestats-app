import { FC } from 'react';

// import { getServerSession } from 'next-auth';
// import { authOptions } from 'app/api/auth/[...nextauth]/route';

// const TEXT = {
//   TITLE: 'Dashboard',
//   DESCRIPTION: 'Administrasjonssider for grades.no',
//   HEADER: (fullName: string) => `Velkommen til administrasjon av grades.no, ${fullName}`,
// };

const DashboardPage: FC = async ({}) => {
  // const session = await getServerSession(authOptions);

  // if (!session?.user?) {
  return null;
  // }

  // return (
  //   <>
  //     <Head>
  //       <title>{TEXT.TITLE}</title>
  //       <meta property="og:title" content={TEXT.TITLE} />
  //       <meta name="description" content={TEXT.DESCRIPTION} />
  //       <meta property="og:description" content={TEXT.DESCRIPTION} />
  //     </Head>
  //     <div>
  //       <Heading as="h1" size="h2">
  //         {TEXT.HEADER(user.fullName)}
  //       </Heading>
  //       <ul>
  //         <li>
  //           <Link href="/dashboard/users">Brukere</Link>
  //         </li>
  //         <li>
  //           <Link href="/dashboard/scrapers/karstat">Karstat</Link>
  //         </li>
  //         <li>
  //           <Link href="/dashboard/scrapers/tia">TIA</Link>
  //         </li>
  //       </ul>
  //     </div>
  //   </>
  // );
};

export default DashboardPage;
