import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async student(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id });
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const student = this.studentRepository.create({
      id: uuid(),
      ...createStudentInput,
    });
    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
