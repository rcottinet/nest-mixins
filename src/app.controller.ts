import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User)
    public repository: Repository<User>,
  ) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
