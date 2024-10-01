import { Injectable } from '@nestjs/common';

@Injectable()
export class DatesService {
  create(createDateDto) {
    return 'This action adds a new date';
  }

  findAll() {
    return `This action returns all dates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} date`;
  }

  update(id: number, updateDateDto) {
    return `This action updates a #${id} date`;
  }

  remove(id: number) {
    return `This action removes a #${id} date`;
  }
}
