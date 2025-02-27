import { FC } from 'react';

import type { LoggedInUser } from 'models/User';
import { MyUserView } from 'views/MyUserView';
import { withUser } from 'common/auth/ssr';
import { Tag } from 'models/Tag';
import { ListResponse, requestsWithAuth } from 'common/requests';
import { getUserTagListApiUrl } from 'common/urls';

interface ServerProps {
  user: LoggedInUser | null;
  tags: Tag[];
}

const MyUserPage: FC<ServerProps> = ({ user }) => {
  if (!user) {
    return null;
  }
  return <MyUserView user={user} />;
};

export const getServerSideProps = withUser<ServerProps>(async (_, user) => {
  const userTagsUrl = getUserTagListApiUrl(Number(user?.id) || 0);
  const response = await requestsWithAuth.get<ListResponse<Tag>>(userTagsUrl);
  const tags = response.results;
  return {
    props: {
      user,
      tags: tags || [],
    },
  };
});

export default MyUserPage;
