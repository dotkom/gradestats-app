import { Heading } from 'components/Typography/Heading';

import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const TEXT = {
  TITLE: 'Dashboard',
  DESCRIPTION: 'Administrasjonssider for grades.no',
  HEADER: (fullName: string) => `Velkommen til administrasjon av grades.no, ${fullName}`,
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/login');
  }

  return (
    <>
      <title>{TEXT.TITLE}</title>
      <meta property="og:title" content={TEXT.TITLE} />
      <meta name="description" content={TEXT.DESCRIPTION} />
      <meta property="og:description" content={TEXT.DESCRIPTION} />

      <div>
        <Heading as="h1" size="h2">
          {TEXT.HEADER(session?.user.fullName)}
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
}
