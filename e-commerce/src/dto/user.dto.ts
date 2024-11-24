import { IUserRepo } from '../types/user';
import { Role } from '../enum/user.enum';

export class UserResponseDto {
  public id: number;
  public username: string;
  public email: string;
  public role: Role;


  constructor(model: IUserRepo) {
    this.id = model.id;
    this.username = model.username;
    this.email = model.email;
    this.role = model.role;

  }
}
