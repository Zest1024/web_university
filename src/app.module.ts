import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChoicesModule } from './modules/choices/choices.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { QueueModule } from './modules/queue/queue.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    QuizzesModule,
    QuestionsModule,
    ChoicesModule,
    AuthModule,
    QueueModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
