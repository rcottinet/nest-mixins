import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User)
    public repository: Repository<User>,
  ) {
    // Uncomment the following lines to verify that the mixin properties are correctly defined
    // const user = new User();
    // user.createdAt <== // should not raise a TypeScript error and should be defined
    // user.updatedAt <== // should not raise a TypeScript error and should be defined
    // user.deletedAt <== // should not raise a TypeScript error and should be defined
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
