import { requestsWithAuth } from 'common/requests';
import { getUserDetailApiUrl } from 'common/urls';
import { formatDateString } from 'common/utils/date';
import { GradesUser } from 'models/User';
import React, { ChangeEvent, FC } from 'react';
import useSWR from 'swr';

import styles from './user-item.module.scss';

interface Props {
  user: GradesUser;
}

export const UserItem: FC<Props> = ({ user: initialUser }) => {
  const userUrl = getUserDetailApiUrl(initialUser.username);
  const { data, mutate } = useSWR<GradesUser>(userUrl, requestsWithAuth.get, {
    initialData: initialUser,
  });
  const user = data as GradesUser;

  const handleIsAdminChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const userResponse = await requestsWithAuth.patch<GradesUser>(userUrl, { is_staff: isChecked });
    if (userResponse.status === 200) {
      mutate(userResponse.data);
    }
  };

  return (
    <tr className={styles.item}>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.username}</td>
      <td>{formatDateString(user.date_joined)}</td>
      <td>
        <input
          className={styles.toggle}
          type="checkbox"
          name={`${user.first_name}-is-admin`}
          aria-label={`Er ${user.first_name} admin`}
          checked={user.is_staff}
          onChange={handleIsAdminChange}
        />
      </td>
    </tr>
  );
};
