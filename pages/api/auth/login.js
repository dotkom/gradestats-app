import nextConnect from 'next-connect';
import passport from 'passport';

import { authMiddleware } from 'common/auth/middleware';
import { OIDC_CLIENT_NAME } from 'common/auth/passport';

const handler = nextConnect();

handler.use(authMiddleware).get(
  async (req, res, next) => {
    const returnToPath = req.query.returnToPath || '/';
    req.session.returnTo = returnToPath;
    passport.authenticate(OIDC_CLIENT_NAME)(req, res, next);
  },
  (req, res) => {
    res.json({ user: req.user });
  }
);

export default handler;
