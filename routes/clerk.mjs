import express from 'express';
import { signUp, logIn,getUser,createClass,getAllClasses,createStudent,createStaff,getStudentId} from '../controllers/clerkController.mjs';

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', logIn);
userRouter.post('/user', getUser);  // Use POST for fetching user data
userRouter.post('/classes', createClass); ///Create ClassgetStudentId
userRouter.post('/students',createStudent);
userRouter.get('/getAllClasses',getAllClasses);
userRouter.post('/staff',createStaff);
userRouter.post('/getStudentId',getStudentId);  


export default userRouter;
