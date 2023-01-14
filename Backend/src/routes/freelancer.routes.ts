import express from 'express';
import { validate } from '../middleware/validate';
import { postBidHandler } from '../controllers/bid.controller'; 
import { getMyInvitesHandler } from '../controllers/invite.controller'; 
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { postBidSchema } from '../schemas/bid.schema';
const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/bid/post', validate(postBidSchema), postBidHandler);
router.get('/invites', getMyInvitesHandler);

export default router;
