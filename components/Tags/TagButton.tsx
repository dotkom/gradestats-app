import Link from 'next/link';
import { FC } from 'react';

import { Button } from 'components/common/Button';
import { Tag } from 'models/Tag';

interface Props {
  tag: Tag;
}

export const TagButton: FC<Props> = ({ tag }) => {
  return (
    <Link href={{ pathname: '/course', query: { query: tag.name } }}>
      <Button role="button">{tag.name}</Button>
    </Link>
  );
};
