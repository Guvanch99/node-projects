import { Role } from '../enum/user.enum';

export interface IUser{
  id: number
  username: string,
  email: string;
  password: string;
  createdAt: Date
  updatedAt: Date
  role: Role
}

export interface IUserSignUpData{
  username: string
  email: string
  password: string
}

export interface IUserLoginData{
  email: string
  password: string
}

export interface IUserResetPassword{
  oldPassword: string
  password: string
}

export interface IUserUpdateData{
  id: string
  username: string,
  password: string
}

export interface IUserRepo {
  id: number
  username: string,
  email: string;
  password: string;
  created_at: Date
  updated_at: Date
  role: Role
}
