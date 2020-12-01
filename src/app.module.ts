import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { Student } from './student/student.entity';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      useUnifiedTopology: true,
      synchronize: true,
      entities: [Lesson, Student],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    LessonModule,
    StudentModule,
  ],
})
export class AppModule {}
