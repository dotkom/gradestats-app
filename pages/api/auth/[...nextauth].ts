import { getUserDetailApiUrl } from './../../../common/urls';
import { GradesUser, LoggedInUser } from 'models/User';
import { FeideProfile } from './../../../common/auth/utils';
import { FEIDE_AUTH_ENDPOINT, FEIDE_CLIENT_ID, FEIDE_CLIENT_SECRET } from 'common/constants';
import NextAuth from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { OIDC_CLIENT_NAME } from 'common/auth/utils';
import { Requests } from 'common/requests';

const FEIDE_SCOPES = 'profile userid-feide email groups userid openid';

interface Token {
  name?: string;
  email?: string;
  picture?: string; // url to image
  accessToken?: string;
  iat: number;
  exp: number;
}

interface UserData {
  name: string;
  email: string;
  picture: string;
  accessToken: string;
  sub: string;
  'connect-userid_sec': string[];
  'dataporten-userid_sec': string[];
  email_verified: boolean;
  iat: number;
  exp: number;
}

interface FeideSession {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
}

interface Account {
  provider: string | null;
  type: string | null;
  id: number | null;
  refreshToken: string | null;
  accessToken: string | null;
  accessTokenExpires: null;
}

const options = {
  callbacks: {
    session: async (session: FeideSession, data: UserData) => {
      const { accessToken, email_verified, picture, sub } = data;
      const requests = new Requests({ accessToken, useAuthentication: true });
      const username = session.user.email.split('@')[0];
      const gradesUser = await requests.get<GradesUser>(getUserDetailApiUrl(username));
      const user: LoggedInUser = {
        fullName: session.user.name,
        username,
        email: session.user.email,
        emailVerified: email_verified,
        id: sub,
        image: picture,
        accessToken,
        expiresAt: Date.parse(session.expires),
        dateJoined: gradesUser.date_joined,
        isActive: gradesUser.is_active,
        isStaff: gradesUser.is_staff,
        isSuperuser: gradesUser.is_superuser,
      };
      return user;
    },
    jwt: async (token: Token, _: Token, account: Account, profile: FeideProfile) => {
      if (account && account.accessToken) {
        token.accessToken = account.accessToken;
      }
      return Promise.resolve({ ...token, ...profile });
    },
  },
  providers: [
    {
      id: OIDC_CLIENT_NAME,
      name: 'Feide',
      type: 'oauth',
      version: '2.0',
      scope: FEIDE_SCOPES,
      params: {
        grant_type: 'authorization_code',
      },
      accessTokenUrl: `${FEIDE_AUTH_ENDPOINT}/oauth/token`,
      requestTokenUrl: `"${FEIDE_AUTH_ENDPOINT}/oauth/authorization`,
      authorizationUrl: `${FEIDE_AUTH_ENDPOINT}/oauth/authorization?response_type=code`,
      profileUrl: `${FEIDE_AUTH_ENDPOINT}/openid/userinfo`,
      profile: (profile: FeideProfile) => {
        return {
          ...profile,
          id: profile.sub,
          image: profile.picture,
          email: profile.email,
        };
      },
      clientId: FEIDE_CLIENT_ID,
      clientSecret: FEIDE_CLIENT_SECRET,
      debug: true,
      idToken: false,
    },
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
