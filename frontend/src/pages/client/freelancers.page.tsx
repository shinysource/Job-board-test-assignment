import React from 'react';
import { Box, Container, Typography,
  Card, CardContent
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../redux/store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import { JobTableRow } from '../../components/JobTableRow';

import { useGetFreelancersQuery } from '../../redux/api/jobApi';
import { useGetMyJobsQuery } from '../../redux/api/jobApi';
import { usePostInviteMutation } from '../../redux/api/jobApi';
import { useEffect } from 'react';
import { jobApi } from '../../redux/api/jobApi';
import { IJob, IUser } from '../../redux/api/types';

const FreelancersPage = () => {
  var user = useAppSelector((state) => state.userState.user);

  const {
    data: freelancers = [],
    refetch
  } = useGetFreelancersQuery(null);

  const {
    data: myJobs = [],
  } = useGetMyJobsQuery(null);

  const [ postInvite, { isLoading, isError, error, isSuccess }] =
  usePostInviteMutation();

  const [open, setOpen] = React.useState(false);

  const [bidJob, setBidJob] = React.useState<IJob>();

  const [bidFreelancer, setBidFreelancer] = React.useState<IUser>();

  const [inputValue, setInputValue] = React.useState('');

  const [letter, setLetter] = React.useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = ((location.state as any)?.from.pathname as string ) || '/';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLetterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLetter(event.target.value);
  };

  const handleApply = ()=> {
    postInvite({
      jobId: bidJob!.id,
      freelancerId: bidFreelancer!.id,
      letter: letter,
    })
  }

  useEffect(()=> {
    if(isSuccess){
      toast.success('Sent invite successfully');
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
        });
      }
    }
  }, [isLoading]);

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
            Freelancers
          </Typography>      

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                    <TableCell>Client</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Verified</TableCell>
                    <TableCell align="right">SignUp Date</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {
                  freelancers && freelancers.map(freelancer=>(
                    <TableRow
                      key={freelancer.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {freelancer.name}
                      </TableCell>
                      <TableCell align="right">{freelancer.description}</TableCell>
                      <TableCell align="right">
                        {
                          freelancer.verified && (
                            <CreditScoreOutlinedIcon sx={{ color: 'green' }} />
                          )
                        }
                      </TableCell>
                      <TableCell align="right">{freelancer.createdAt?.toString()}</TableCell>
                      <TableCell align="right">
                      {
                        myJobs && myJobs.length!=0 ? 
                        <Button variant="contained" onClick={()=>{
                          handleClickOpen();
                          myJobs && setBidJob(myJobs[0]);
                          setBidFreelancer(freelancer);
                        }
                        }>Invite</Button>
                        :
                        ''
                      }
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <TextField
                autoFocus
                multiline
                margin="dense"
                id="name"
                label="Bid Statement"
                fullWidth
                variant="filled"
                maxRows={10}
                minRows={6}
                placeholder={"cover letter"}
                sx={{ minWidth:'500px'}}
                onChange={handleLetterChange}
              />

                <FormControl fullWidth variant='standard'>
                  <InputLabel id="demo-simple-select-label">Job</InputLabel>
                  {
                    myJobs && myJobs.length!=0 ? (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={myJobs[0].title}
                      >
                        {
                          myJobs?.map(job=>(
                            <MenuItem key={job.id} value={job.title} onClick={()=>{ setBidJob(job)}}>{job.title}</MenuItem>
                          ))
                        }
                      </Select>
                    )
                    :
                    ''
                  }
                </FormControl>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={
                ()=>{
                  handleClose();
                  handleApply();
                }
              }>Apply</Button>
            </DialogActions>
          </Dialog>
    </Container>
  );
};

export default FreelancersPage;
