import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getAllLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ id });
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      id: uuid(),
      ...createLessonInput,
    });
    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
