import { boolean, number, object, string, TypeOf, z } from 'zod';

export const postInviteSchema = object({
  body: object({
    jobId: string({}),
    freelancerId: string({}),
    letter: string({}),
  }),
});

export type PostInviteInput = TypeOf<typeof postInviteSchema>['body'];