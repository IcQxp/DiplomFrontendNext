export interface UserResponse {
  lastname?: string;
  firstname?: string;
  patronymic?: string;
  login?: string;
  gender?: string;
  id: number;
  email?: string;
  telephone?: string;
  rolename?: string;
  roleId: number;
  birthDate: string;
}

export interface UserState {
  userInfo: UserResponse | null; 
}

