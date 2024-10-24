import { Injectable, Query, NotFoundException } from '@nestjs/common';
import { User, UserRole } from 'types/database';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@doe.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@doe.com',
      role: 'engineer',
    },
    {
      id: 3,
      name: 'Bob Smith',
      email: 'bob@smith.com',
      role: 'intern',
    },
    {
      id: 4,
      name: 'Alice Smith',
      email: 'alice@smith.com',
      role: 'intern',
    },
  ];

  // get all users | get all user by role | /user | /user?role=<role>
  findAll(@Query('role') role?: UserRole) {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  // get user by id
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return user;
  }

  // create a new user
  create(createUserDto: CreateUserDto) {
    const highestIndex = this.users.sort((a, b) => b.id - a.id)[0].id;
    const newUser = {
      id: highestIndex + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  // update a user
  update(id: number, updateUserDto: UpdateUserDto) {
    this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
        };
      }
      return user;
    });

    return updateUserDto;
  }

  // delete a user
  delete(id: number) {
    const removedUser = this.findOne(id);
    if (removedUser) {
      this.users = this.users.filter((user) => user.id !== id);
      return removedUser;
    }
    return null;
  }
}
