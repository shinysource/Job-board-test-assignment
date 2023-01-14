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

import { useGetMyInvitesQuery } from '../../redux/api/freelancerApi';
const InvitesPage = () => {
  var user = useAppSelector((state) => state.userState.user);
  
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: invitesToShow = [],
    refetch
  } = useGetMyInvitesQuery(null);

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
            Client's Invites
          </Typography>      
            
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell align="right">Job</TableCell>
                    <TableCell align="right">Letter</TableCell>
                    <TableCell align="right">Invite Date</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {
                  invitesToShow && invitesToShow.map(invite=>(
                    <TableRow
                      key={invite.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {invite!.job!.user!.name}
                      </TableCell>
                      <TableCell align="right">{invite.job.title}</TableCell>
                      <TableCell align="right">{invite.letter}</TableCell>
                      <TableCell align="right">{invite.createdAt.toString()}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
    </Container>
  );
};

export default InvitesPage;
