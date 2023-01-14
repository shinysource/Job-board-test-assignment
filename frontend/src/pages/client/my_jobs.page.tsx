import { Box, Container, Typography,
  Card, CardContent
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jobApi } from '../../redux/api/jobApi';
import { useAppSelector } from '../../redux/store';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { JobTableRow } from '../../components/JobTableRow';

import { useGetMyJobsQuery } from '../../redux/api/jobApi';
const MyJobsPage = () => {
  // const jobsToShow = useAppSelector((state) => state.jobState.jobsToShow);
  var user = useAppSelector((state) => state.userState.user);
  
  const navigate = useNavigate();
  const location = useLocation();

  const { data: jobsToShow } = jobApi.endpoints.getMyJobs.useQuery(null);

  return (
    <Container maxWidth='lg' sx={{ mt:'3rem'}}>
          <Typography
            textAlign='center'
            component='h1'
            sx={{
              color: 'gray',
              fontWeight: 600,
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2,
              letterSpacing: 1,
            }}
          >
            My Jobs
          </Typography>      
 
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell/>
                  <TableCell>
                    Job
                  </TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Salary</TableCell>
                  <TableCell align="right">Proved</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Bids</TableCell>
                  <TableCell align="right">Post Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  jobsToShow && jobsToShow.length>0 && jobsToShow.map((job)=>(
                    <JobTableRow key={job.id} job={job}/>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
    </Container>
  );
};

export default MyJobsPage;
