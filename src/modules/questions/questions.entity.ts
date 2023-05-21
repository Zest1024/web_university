import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Choice } from '../choices/choices.entity';
import { Quiz } from '../quizzes/quizzes.entity';

@Index(['id', 'orderNumber'])
@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title?: string;

  @Column()
  orderNumber?: number;

  @Column()
  multiple?: boolean;

  @OneToMany(() => Choice, (choice) => choice.question, { cascade: true })
  choices?: Choice[];

  @ManyToOne(() => Quiz, (quiz) => quiz.id)
  quiz?: Quiz;
}
