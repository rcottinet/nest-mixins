import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compose } from '../utils/compose';
import { WithCrud, WithRepository } from '../common/service-with-crud.mixin';

class UserServiceBase implements WithRepository<User> {
  constructor(
    @InjectRepository(User)
    public repository: Repository<User>,
  ) {}
}

@Injectable()
export class UserService extends compose(
  UserServiceBase,
  WithCrud<User, number>('id'),
) {}
