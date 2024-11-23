import { IUserRepo } from '../types/user';
import { Role } from '../enum/user.enum';

export class UserResponseDto {
  public id: number;
  public username: string;
  public email: string;
  public role: Role;
  public accessToken: string;
  public refreshToken: string;

  constructor(model: IUserRepo & { accessToken: string; refreshToken: string;}) {
    this.id = model.id;
    this.username = model.username;
    this.email = model.email;
    this.role = model.role;
    this.refreshToken = model.refreshToken;
    this.accessToken = model.accessToken;
  }
}
