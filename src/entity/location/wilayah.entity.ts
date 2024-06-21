import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('wilayah')
export class Wilayah {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  provinsi: string;

  @Column({ type: 'varchar', length: 255 })
  kabupaten: string;

  @Column({ type: 'varchar', length: 255 })
  kecamatan: string;

  @Column({ type: 'varchar', length: 255 })
  kelurahan: string;
}
