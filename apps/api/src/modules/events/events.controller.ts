import { Controller, Get, Param } from '@nestjs/common';

@Controller('events')
export class EventsController {
  @Get()
  list() {
    return { items: [], total: 0, page: 1, pageSize: 20 };
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return { id, title: 'placeholder' };
  }
}
