import { Controller, Get } from '@nestjs/common';

@Controller('opportunities')
export class OpportunitiesController {
  @Get()
  list() {
    return { items: [], total: 0, page: 1, pageSize: 20 };
  }
}
