import { boolean, number, object, string, TypeOf, z } from 'zod';

export const postBidSchema = object({
  body: object({
    jobId: string({}),
    userId: string({}),
    letter: string({}),
  }),
});

export type PostBidInput = TypeOf<typeof postBidSchema>['body'];