import express from 'express';
import { addJob,addCompany ,getApplicationsByUsername} from '../controllers/jobController.mjs';

const jobRouter = express.Router();

jobRouter.post('/postJob', addJob);

jobRouter.post('/addCompany',addCompany)
jobRouter.post('/applications', getApplicationsByUsername);
export default jobRouter;
