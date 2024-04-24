import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { comparePassword } from '../../../utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServices: UsersService,
  ) {}
  async validateUser(email: string, password: string) {
    const userDB = await this.userServices.findUsersByUsername(email);
    if (userDB) {
      const matched = comparePassword(password, userDB.password);
      if (matched) {
        console.log('User Validation Succes!');
        return userDB;
      } else {
        console.log('Password do not match');
        return null;
      }
    }
    console.log('User Validation Failed!');
    return null;
  }
}
