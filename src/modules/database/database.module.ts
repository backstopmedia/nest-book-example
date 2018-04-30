import { Global, Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { DatabaseUtilitiesService } from './database-utilities.service';

@Global()
@Module({
    components: [databaseProvider, DatabaseUtilitiesService],
    exports: [databaseProvider, DatabaseUtilitiesService],
})
export class DatabaseModule {}
