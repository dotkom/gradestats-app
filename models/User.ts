export interface UserToken {
  accessToken: string;
  expiresAt: number;
}

export interface LoggedInUser {
  id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  image: string;
  token: UserToken;
}
