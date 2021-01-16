export interface LoggedInUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  emailVerified: boolean;
  image: string;
  accessToken: string;
  expiresAt: number;
}
