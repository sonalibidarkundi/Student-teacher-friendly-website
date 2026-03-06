import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DonorSignup from './components/donors/DonorSignup';
import DonorLogin from './components/donors/DonorLogin';
import DonorHome from './components/donors/DonorHome';
import ReceiverSignup from './components/receivers/ReceiverSignup';
import ReceiverLogin from './components/receivers/ReceiverLogin';
import ReceiverHome from './components/receivers/ReceiverHome';
import HomePage from './components/HomePage';
import './App.css';
import PostJob from './components/donors/PostJob';
import ViewApplicants from './components/donors/ViewApplicants';
import CreateClass from './components/donors/CreateClass';
import ApplyJob from './components/receivers/ApplyJob';
import JobProviderDashboard from './components/donors/JobProviderDashboard';
import CreateStudent from './components/donors/CreateStudent';
import CreateStaff from './components/donors/CreateStaff';
import StaffHome from './components/staff/StaffHome';
import UploadNotes from './components/staff/UploadNotes';
import DownloadFiles from './components/receivers/DownloadFiles';
import RiseComplaint from './components/receivers/Complaint';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donor/signup" element={<DonorSignup />} />
          <Route path="/donor/login" element={<DonorLogin />} />
          <Route path="/donor/home" element={<DonorHome />} />
          <Route path="/receiver/ReceiverSignup" element={<ReceiverSignup />} />
          <Route path="/receiver/ReceiverLogin" element={<ReceiverLogin />} />
          <Route path="/receiver/ReceiverHome" element={<ReceiverHome />} />
          <Route path="/job/postjob" element={<PostJob />} />
          <Route path="/job/viewapplicants" element={<ViewApplicants />} />
          
          <Route path="/job/searchjob" element={<ApplyJob />} />
          <Route path="/job/jobproviderdashboard" element={<JobProviderDashboard />} />       

          <Route path="/clerk/AddClass" element={<CreateClass />} />
          <Route path="/clerk/CreateStudent" element={<CreateStudent />} />
          <Route path="/clerk/CreateStaff" element={<CreateStaff />} />

          <Route path="/staff/home" element={<StaffHome />} />
          <Route path="/staff/uploadNotes" element={<UploadNotes />} />

          <Route path="/stud/DownloadFiles" element={<DownloadFiles />} />
          <Route path="/stud/complaint" element={<RiseComplaint />} />

          
          
         
        
         
        </Routes>
      </div>
    </Router>
  );
};

export default App;
