import nextConnect from 'next-connect';

import { authMiddleware } from 'common/auth/middleware';

const handler = nextConnect();

handler.use(authMiddleware).get((req, res) => {
  res.json({ user: req.user });
});

export default handler;
