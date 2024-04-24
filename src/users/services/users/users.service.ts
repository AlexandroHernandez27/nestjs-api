import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password)
    const newUser = this.userRepository.create({...createUserDto, password});
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  findUsersById(id: number) {
    return this.userRepository.findOne({ where: {id : id}});
  }

  findUsersByUsername(email: string) {
    return this.userRepository.findOne({ where: {email : email}});
  }
}
