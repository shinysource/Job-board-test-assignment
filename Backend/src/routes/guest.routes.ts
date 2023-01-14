import express from 'express';
import { getAllJobsHandler } from '../controllers/guest.controller';

const router = express.Router();

router.get('/jobs', getAllJobsHandler);

export default router;
