// import { FC } from 'react';

// import type { LoggedInUser } from 'models/User';
// import { MyUserView } from 'views/MyUserView';
// import { Tag } from 'models/Tag';
// import { getUserTagListApiUrl } from 'common/urls';
// import { getServerSession } from 'next-auth';
// import { authOptions } from 'app/api/auth/[...nextauth]/route';

// interface ServerProps {
//   user: LoggedInUser | null;
//   tags: Tag[];
// }

// const getProps = async () => {
//   // FIXME: auth
//   const session = await getServerSession(authOptions);

//   const userTagsUrl = getUserTagListApiUrl(Number(session?.user?.id) || 0);
//   const response = await fetch(userTagsUrl, { headers: { Authorization: `Bearer ${session?.accessToken}` } });

//   // const data: ListResponse<Tag> = await response.json();
//   // const tags = response.results;
//   return {
//       user: session?.user,
//   };

// }

// const MyUserPage: FC<ServerProps> = async () => {
//   const { user } = await getProps();

//   if (!user) {
//     return null;
//   }
//   return <MyUserView user={user} />;
// };

// export default MyUserPage;
