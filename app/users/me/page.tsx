import { MyUserView } from 'views/MyUserView';
import { getServerSession } from 'next-auth';

export default async function Page() {
  const session = await getServerSession();

  if (!session?.user) {
    return null;
  }

  return <MyUserView user={session.user} />;
}
