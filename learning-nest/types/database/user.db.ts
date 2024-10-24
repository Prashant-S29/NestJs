export type UserRole = 'admin' | 'engineer' | 'intern';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
