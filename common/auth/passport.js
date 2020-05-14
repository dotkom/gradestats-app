import passport from 'passport';
import { Issuer, Strategy } from 'openid-client';

import { FEIDE_CLIENT_SECRET, FEIDE_CLIENT_ID, CANONICAL_URL, FEIDE_AUTH_ENDPOINT } from '../constants';

const FEIDE_SCOPES = 'profile userid-feide email groups userid openid';
export const FEIDE_REDIRECT_URL = `${CANONICAL_URL}/api/auth/callback`;
export const OIDC_CLIENT_NAME = 'feide';

export const parseOidcUserData = async (openIdUserData, tokenData) => {
  return {
    id: openIdUserData.sub,
    fullName: openIdUserData.name,
    email: openIdUserData.email,
    emailVerified: openIdUserData.email_verified,
    image: openIdUserData.picture,
    token: {
      accessToken: tokenData.access_token || '',
      expiresAt: tokenData.expires_at || Date.now(),
    },
  };
};

const getIssuer = async () => {
  return Issuer.discover(FEIDE_AUTH_ENDPOINT);
};

const getClient = async () => {
  const issuer = await getIssuer();
  return new issuer.Client({
    client_id: FEIDE_CLIENT_ID,
    client_secret: FEIDE_CLIENT_SECRET,
  });
};

const getStrategy = async () => {
  const client = await getClient();
  const params = {
    redirect_uri: FEIDE_REDIRECT_URL,
    scope: FEIDE_SCOPES,
  };
  const config = { client, params, passReqToCallback: false, usePKCE: false };
  const verify = async (tokenData, userInfo, done) => {
    const user = await parseOidcUserData(userInfo, tokenData);
    return done(null, user);
  };

  return new Strategy(config, verify);
};

const serializeUser = (user, done) => {
  done(null, user);
};
const deserializeUser = (user, done) => {
  done(null, user);
};

export const configurePassport = async () => {
  const strategy = await getStrategy();
  passport.use(OIDC_CLIENT_NAME, strategy);
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
};
