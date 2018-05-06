import { Controller, Get } from '@nestjs/common';
import { EntriesService } from './entry.service';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesSrv: EntriesService) {}

  @Get()
  findAll() {
    return this.entriesSrv.findAll();
  }
}
