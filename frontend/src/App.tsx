import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import ProfilePage from './pages/profile.page';
import PostJobPage from './pages/client/post_job.page';
import MyJobsPage from './pages/client/my_jobs.page';
import HomePage from './pages/home.page';
import LoginPage from './pages/login.page';
import RegisterPage from './pages/register.page';
import UnauthorizePage from './pages/unauthorize.page';
import RequireUser from './components/requireUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from './pages/admin.page';
import FreelancersPage from './pages/client/freelancers.page';
import InvitesPage from './pages/freelancer/invites.page';
import AdminFreelancerPage from './pages/admin/admin.freelancer';
import AdminIndexPage from './pages/admin/admin.index.page';
import AdminJobPage from './pages/admin/admin.job.page';

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
            {/* Private Route */}
          <Route element={<RequireUser allowedRoles={['client', 'freelancer', 'admin']} />}>
            <Route path='profile' element={<ProfilePage />} />
          </Route>
          <Route element={<RequireUser allowedRoles={['client']} />}>
            <Route path='job/create' element={<PostJobPage />} />
            <Route path='job/myjobs' element={<MyJobsPage />} />
            <Route path='client/freelancers' element={<FreelancersPage />} />
          </Route>
          <Route element={<RequireUser allowedRoles={['freelancer']} />}>
            <Route path='freelancer/invites' element={<InvitesPage />} />
          </Route>
          <Route element={<RequireUser allowedRoles={['admin']} />}>
            <Route path='admin' element={<AdminPage />}>
                <Route index element={<AdminIndexPage />} />
                <Route path='users' element={<AdminFreelancerPage/>} />
                <Route path='jobs' element={<AdminJobPage/>} />
            </Route>
          </Route>
          <Route path='unauthorized' element={<UnauthorizePage />} />
        </Route>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
