import nextConnect from 'next-connect';

import { authMiddleware } from 'common/auth/middleware';

const handler = nextConnect();

handler.use(authMiddleware).get((req, res) => {
  req.logOut();
  res.redirect('/');
});

export default handler;
