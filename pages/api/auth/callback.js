import nextConnect from 'next-connect';
import passport from 'passport';

import { OIDC_CLIENT_NAME } from 'common/auth/passport';
import { authMiddleware } from 'common/auth/middleware';

const handler = nextConnect();

handler.use(authMiddleware).get(async (req, res, next) => {
  const authenticator = passport.authenticate(OIDC_CLIENT_NAME, {
    failureRedirect: '/',
    successReturnToOrRedirect: '/',
  });
  return authenticator(req, res, next);
});

export default handler;
