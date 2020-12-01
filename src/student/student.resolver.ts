import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [StudentType])
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Query(() => StudentType)
  async student(@Args('id') id: string) {
    return this.studentService.student(id);
  }

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
}
