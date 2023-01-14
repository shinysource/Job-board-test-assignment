import express from 'express';
import { validate } from '../middleware/validate';
import { postJobHandler, getMyJobsHandler, } from '../controllers/job.controller'; 
import { postInviteHandler } from '../controllers/invite.controller'; 
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { jobGuard
 } from '../middleware/jobGuard';
import { postJobSchema } from '../schemas/job.schema';
import { postInviteSchema } from '../schemas/Invite.schema';
import { getFreelancersHandler } from '../controllers/user.controller';
import { getUsersHandler } from '../controllers/user.controller';
import { toggleJobHandler, deleteJobHandler } from '../controllers/job.controller';
const router = express.Router();

router.use(deserializeUser, requireUser, jobGuard);

router.post('/post', validate(postJobSchema), postJobHandler);
router.post('/invite/post', validate(postInviteSchema), postInviteHandler);

router.get('/myjobs', getMyJobsHandler);
router.get('/freelancers', getFreelancersHandler);
router.get('/getUsers', getUsersHandler);
router.put('/toggle', toggleJobHandler);
router.delete('/delete', deleteJobHandler);

export default router;
