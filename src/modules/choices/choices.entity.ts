import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Question } from '../questions/questions.entity';
import { User } from '../users/users.entity';

@Entity()
export class Choice {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title?: string;

  @Column()
  isCorrectChoice?: boolean;

  @Column()
  orderNumber?: number;

  @ManyToOne(() => Question, (question) => question.choices)
  @JoinTable()
  question?: Question;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  users?: User[];
}
