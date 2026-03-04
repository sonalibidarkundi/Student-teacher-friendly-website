import express from 'express';
import {getStaffClasses,getStudentDetails, uploadFiles , downloadFiles,createComplaint,getAllComplaints,detailCom} from '../controllers/staffController.mjs';

const staffRouter = express.Router();

staffRouter.get('/studetails/:username',getStudentDetails);
staffRouter.get('/staffclasses/:username', getStaffClasses);
staffRouter.post('/upload', uploadFiles);
staffRouter.post('/download', downloadFiles);
staffRouter.post('/createComplaint',createComplaint);
staffRouter.get('/complaints',getAllComplaints);
staffRouter.get('/complaints/:student_id',detailCom)


export default staffRouter;
