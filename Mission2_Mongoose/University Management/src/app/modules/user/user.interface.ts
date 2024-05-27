export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
}
export interface TNewUser {
  password: string;
  role: string;
  id: string;
}
