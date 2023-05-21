import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Question } from '../questions/questions.entity';
import { User } from '../users/users.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title?: string;

  @ManyToOne(() => User, (user) => user.quizzes)
  creator?: User;

  @OneToMany(() => Question, (question) => question.quiz, { cascade: true })
  questions?: Question[];
}
