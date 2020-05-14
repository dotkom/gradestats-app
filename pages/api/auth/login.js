import nextConnect from 'next-connect';
import passport from 'passport';

import { authMiddleware } from 'common/auth/middleware';
import { OIDC_CLIENT_NAME } from 'common/auth/passport';

const handler = nextConnect();

handler.use(authMiddleware).get(
  async (...params) => {
    passport.authenticate(OIDC_CLIENT_NAME)(...params);
  },
  (req, res) => {
    res.json({ user: req.user });
  }
);

export default handler;
