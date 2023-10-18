import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  longUrl: string;

  @Column({ length: 50 })
  shortUrl: string;

  @Column({ length: 10 })
  code: string;
}
