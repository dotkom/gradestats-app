export interface LoggedInUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  // image: string;
  accessToken: string;
  expiresAt: number;
  isSuperuser: boolean;
  isStaff: boolean;
  isActive: boolean;
  dateJoined: string;
}

export interface GradesUser {
  id: number;
  email: string;
  username: string;
  full_name: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  last_login: string;
}
