import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Choice } from '../choices/choices.entity';
import { Quiz } from '../quizzes/quizzes.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column()
  firstName?: string;

  @ApiProperty()
  @Column({ unique: true })
  email?: string;

  @ApiProperty()
  @Column()
  lastName?: string;

  @ApiProperty()
  @Column({ default: false })
  isDisabled?: boolean;

  @ApiProperty()
  @Column()
  password?: string;

  @ApiProperty()
  @Column()
  password_salt?: string;

  @ManyToMany(() => Quiz)
  @JoinTable()
  quizzes?: Quiz[];

  @ManyToMany(() => Choice)
  @JoinTable()
  choices?: Choice[];
}
