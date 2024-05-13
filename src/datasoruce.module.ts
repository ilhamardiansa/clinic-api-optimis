import { Module } from '@nestjs/common';
import { dataSource } from './db/datasource';

@Module({
  providers: [dataSource],
  exports: [dataSource],
})
export class DataSourceModule {}