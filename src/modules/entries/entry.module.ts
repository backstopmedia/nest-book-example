import { EntryController } from './entry.controller';
import { entryProvider } from './entry.provider';
import { EntryService } from './entry.service';
import { Module } from '@nestjs/common';

@Module({
    controllers: [EntryController],
    components: [entryProvider, EntryService]
})
export class EntryModule {}
