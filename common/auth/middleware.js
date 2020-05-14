import nextConnect from 'next-connect';
import passport from 'passport';

import session from './session';
import { configurePassport } from './passport';

const redirectMiddleWare = (req, res, next) => {
  console.log('Add redirect');
  if (!res.redirect) {
    // passport needs res.redirect:
    //
    // Monkey-patch res.redirect to emulate express.js's res.redirect,
    // since it doesn't exist in micro. default redirect status is 302
    // as it is in express. https://expressjs.com/en/api.html#res.redirect
    const redirect = (location) => {
      console.log(location);
      res.setHeader('Location', location);
      res.status(302);
      res.send(null);
      console.log('end');
    };
    res.redirect = redirect;
  }
  next();
};

const sessionMiddleware = session({
  name: 'sess',
  secret: 'some_not_random_password_that_is_at_least_32_characters', // This should be kept securely, preferably in env vars
  cookie: {
    maxAge: 60 * 60 * 8, // 8 hours,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  },
});

const memoryDbMiddleware = (req, res, next) => {
  req.session.users = req.session.users || [];
  next();
};

const initPassortMiddleware = async (req, res, next) => {
  await configurePassport();
  next();
};

export const authMiddleware = nextConnect()
  .use(redirectMiddleWare)
  .use(sessionMiddleware)
  .use(memoryDbMiddleware)
  .use(initPassortMiddleware)
  .use(passport.initialize())
  .use(passport.session());
