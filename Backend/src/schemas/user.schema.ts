import { boolean, object, string, TypeOf, z } from 'zod';

enum RoleEnumType {
  ADMIN = 'admin',
  CLIENT = 'client',
  FREELANCER = 'freelancer'
}

export const registerUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({
      required_error: 'Please confirm your password',
    }),
    role: z.optional(z.nativeEnum(RoleEnumType)),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
});

export const updateUserSchema = object({
  body: object({
    email: string({}).email('Invalid email address'),
    name: string({}),
    description: string({}),
  }),
});

export const toggleUserSchema = object({
  body: object({
    id: string({}),
  }),
});

export const deleteUserSchema = object({
  body: object({
    id: string({}),
  }),
});

export const changePasswordSchema = object({
  body: object({
    email: string({}).email('Invalid email address'),
    currentPassword: string({}),
    password: string({})
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({}),
  })
    .partial()
    .refine((data) => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: 'Passwords do not match',
    }),
});


export type RegisterUserInput = Omit<
  TypeOf<typeof registerUserSchema>['body'],
  'passwordConfirm'
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
export type ToggleUserInput = TypeOf<typeof toggleUserSchema>['body'];
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>['body'];
export type ChangePasswordInput = TypeOf<typeof changePasswordSchema>['body'];
