import { Metadata } from 'next';
import { FC } from 'react';
import { NotFoundView, TEXT } from 'views/NotFoundView';

export const metadata: Metadata = {
  title: TEXT.TITLE,
  description: TEXT.DEFAULT_MESSAGE,
};

const NotFoundPage: FC = () => {
  return <NotFoundView />;
};

export default NotFoundPage;
