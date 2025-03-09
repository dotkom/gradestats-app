import type { FC } from 'react';
import { NotFoundView, TEXT } from 'views/NotFoundView';

const NotFoundPage: FC = () => {
  return (
    <>
      <title>{TEXT.TITLE}</title>
      <meta name="description" content={TEXT.DEFAULT_MESSAGE}></meta>
      <NotFoundView />
    </>
  );
};

export default NotFoundPage;
