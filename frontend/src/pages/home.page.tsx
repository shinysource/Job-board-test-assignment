import React, { useEffect, } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { guestApi } from '../redux/api/guestApi';
import { useAppSelector } from '../redux/store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import { IJob } from '../redux/api/types';
import { usePostBidMutation } from '../redux/api/freelancerApi';
import { useGetAllJobsQuery } from '../redux/api/guestApi';

const HomePage = () => {
  // let { data: jobsToShow } = guestApi.endpoints.getAllJobs.useQuery(null);  
  const {
    data: jobsToShow = [],
    refetch
  } = useGetAllJobsQuery(null);
  // const jobsToShow = useAppSelector((state) => state.jobState.jobsToShow);

  const user = useAppSelector((state) => state.userState.user);
  
  const [open, setOpen] = React.useState(false);

  const [bidJob, setBidJob] = React.useState<IJob>();

  const [letter, setLetter] = React.useState<string>("");

  const [ postBid, { isLoading, isError, error, isSuccess }] =
  usePostBidMutation();

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
    postBid({
      jobId: bidJob!.id,
      userId: user!.id,
      letter: letter,
    });
  }

  useEffect(()=> {
    if(isSuccess){
      toast.success('post bid successfully');
      refetch();
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell>Job</TableCell>
            <TableCell align="right">Client</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Verified</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Post Date</TableCell>
            <TableCell align="right">Bids</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            jobsToShow && jobsToShow.map(job=>(
              <TableRow
                key={job.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {job.title}
                </TableCell>
                <TableCell align="right">{job.user?.name}</TableCell>
                <TableCell align="right">{`$ ${job.salary}`}</TableCell>
                <TableCell align="right">
                  {
                    job.proved && (
                      <CreditScoreOutlinedIcon sx={{ color: 'green' }} />
                    )
                  }
                </TableCell>
                <TableCell align="right">{job.status}</TableCell>
                <TableCell align="right">{job.createdAt?.toString()}</TableCell>
                <TableCell align="right">{job.bids?.length}</TableCell>
                {
                  user?.role == "freelancer" && job.status != "Closed"?
                    <TableCell align="right">
                      <Button variant="contained" onClick={()=>{
                        handleClickOpen();
                        setBidJob(job);
                      }
                      }>Bid</Button>
                    </TableCell>
                  :
                  ''
                }
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
            type="email"
            fullWidth
            variant="filled"
            maxRows={10}
            minRows={6}
            placeholder={"cover letter"}
            sx={{ minWidth:'500px'}}
            onChange={handleLetterChange}
          />
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

export default HomePage;
