# Gradestats webapp

This project serves as the front-end for gradestats, separate from the api which is its own project.

Live version can be found at [grades.no](https://grades.no)

## Getting Started

First, run the development server:

```bash
# Install dependencies
npm i

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment

### Are you adding environment variables?

Variables have to be added in a lot of places to make everything work correctly!

1. Add them to the `/common/constants` file where they are used. Here you can also add defaults.
2. Add them to the Dockerfile to make them available to production.
3. Add the variables to the `secrets` in the github repository, which is where we store variables for production.
4. Proxy the variables in the required github actions files.
5. Add them to the list of variables below to make it easier to keep track for everyone involved.

#### Private variables

Private variables have to be set in the runtime environment to be kept private.


### List of variables

```bash
# How many courses should be pre-rendered at build time
NEXT_PUBLIC_BUILD_TIME_COURSE_LIMIT # Default = 100
# Base url of the api backend
NEXT_PUBLIC_GRADES_API_URL # Default = https://grades.no, for local backend it should be 'http://localhost:8000'
# Sentry url/id for error logging
NEXT_PUBLIC_SENTRY_DSN # Default = undefined
# Google analytics tracking ID
NEXT_PUBLIC_GA_TRACKING_ID # Default = __REPLACE_ME__
# Actual URL of the hosted project. Important for linking. for prod it should be https://grades.no
NEXT_PRIVATE_CANONICAL_URL # Default = http://localhost:3000
# Client ID for dataporten/FEIDE client for OIDC
NEXT_PUBLIC_FEIDE_CLIENT_ID # Default = undefined
# Client Secret for dataporten/FEIDE client for OIDC. HAS TO BE KEPT SECRET
NEXT_PRIVATE_FEIDE_CLIENT_SECRET # Default = undefined
# Base url for OIDC authentication (for auto discovery)
NEXT_PUBLIC_FEIDE_AUTH_ENDPOINT # Default = https://auth.dataporten.no
# Secret for encryting cookie for session. HAS TO BE KEPT SECRET
NEXT_PRIVATE_SESSION_SECRET # Default = "some_random_string"
```
