import { boolean, number, object, string, TypeOf, z } from 'zod';

enum JobEnumType {
  OFFICE = 'Office',
  HYBRID = 'Hybrid',
  REMOTE = 'Remote'
}

export const postJobSchema = object({
  body: object({
    postEmail: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    title: string({
      required_error: 'Title is required'
    }),
    description: string({}),
    salary: number()
      .min(0.1, 'Salary is too low'),
  }),
});

export type PostJobInput = TypeOf<typeof postJobSchema>['body'];