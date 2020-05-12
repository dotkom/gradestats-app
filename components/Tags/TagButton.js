import Link from 'next/link';
import React from 'react';

export const TagButton = ({ tag }) => {
  return (
    <Link href={{ pathname: '/course', query: { query: tag.name } }}>
      <a key={tag.name} className="btn btn-default btn-sm btn-tag" role="button">
        {tag.name}
      </a>
    </Link>
  );
};
