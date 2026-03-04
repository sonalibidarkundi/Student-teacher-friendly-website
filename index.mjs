import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import clerkRoutes from './routes/clerk.mjs';
import jobRoutes  from './routes/jobs.mjs';
import staffRouter from './routes/staff.mjs'

const app = express();
const __dirname = path.resolve();
// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api/clerk', clerkRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/staff', staffRouter);
// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
