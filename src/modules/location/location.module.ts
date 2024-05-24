import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wilayah } from 'src/entity/wilayah.entity'; // Sesuaikan path-nya
import { Village } from 'src/entity/village.entity'; // Sesuaikan path-nya
import { WilayahController } from 'src/controller/location/location.controller';
import { WilayahService } from 'src/service/location/location.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wilayah])],
  controllers: [WilayahController],
  providers: [WilayahService],
})
export class LocationModule {}
