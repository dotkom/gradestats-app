import type { ChangeEvent, FC } from 'react';
import useSWR from 'swr';
import cx from 'classnames';

import { requestsWithAuth } from 'common/requests';
import { getUserDetailApiUrl } from 'common/urls';
import { formatDateString } from 'common/utils/date';
import { Text } from 'components/Typography/Text';
import type { GradesUser } from 'models/User';

import styles from './user-item.module.scss';
import { BasicCard } from 'components/Card/BasicCard';

interface Props {
  user: GradesUser;
}

const TEXT = {
  TABLE: {
    ID: 'Id',
    EMAIL: 'E-post',
    USERNAME: 'Brukernavn',
    JOINED_DATE: 'Ble med dato',
    IS_ADMIN: 'Admin',
  },
};

export const UserItem: FC<Props> = ({ user: initialUser }) => {
  const userUrl = getUserDetailApiUrl(initialUser.username);
  const { data, mutate } = useSWR<GradesUser>(userUrl, requestsWithAuth.get, {
    fallbackData: initialUser,
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
    <li className={styles.item}>
      <BasicCard className={styles.content}>
        <Text>{user.id}</Text>
        <Text>{user.email}</Text>
        <Text>{user.username}</Text>
        <Text>{formatDateString(user.date_joined)}</Text>
        <Text>
          <input
            className={styles.toggle}
            type="checkbox"
            name={`${user.first_name}-is-admin`}
            aria-label={`Er ${user.first_name} admin`}
            checked={user.is_staff}
            onChange={handleIsAdminChange}
          />
        </Text>
      </BasicCard>
    </li>
  );
};

export const UsersListHeader: FC = () => {
  return (
    <div className={cx(styles.header)}>
      <Text size="h4">{TEXT.TABLE.ID}</Text>
      <Text size="h4">{TEXT.TABLE.EMAIL}</Text>
      <Text size="h4">{TEXT.TABLE.USERNAME}</Text>
      <Text size="h4">{TEXT.TABLE.JOINED_DATE}</Text>
      <Text size="h4">{TEXT.TABLE.IS_ADMIN}</Text>
    </div>
  );
};
