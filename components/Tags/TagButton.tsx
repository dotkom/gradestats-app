import Link from 'next/link';
import React, { FC } from 'react';

import { Button } from 'components/common/Button';
import { Tag } from 'models/Tag';

interface Props {
  tag: Tag;
}

export const TagButton: FC<Props> = ({ tag }) => {
  return (
    <Link href={{ pathname: '/course', query: { query: tag.name } }}>
      <a>
        <Button role="button">{tag.name}</Button>
      </a>
    </Link>
  );
};
