import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CrudService<T> {
  constructor(private repository: Repository<T>) {}

  async create(dto: Partial<T>) {
    return this.repository.save(dto as any);
  }
  async findOne(id: number) {
    return this.repository.findOneBy({ id } as any);
  }

  async findAll() {
    return this.repository.find();
  }

  async update(id: number, dto: Partial<T>) {
    await this.repository.update(id, dto as any);
    return this.findOne(id);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
