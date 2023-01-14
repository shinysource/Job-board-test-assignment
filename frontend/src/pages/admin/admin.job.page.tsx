import React, { useEffect, } from 'react';
import { useAppSelector } from '../../redux/store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { useGetAllJobsQuery } from '../../redux/api/guestApi';
import { useToggleJobMutation, useDeleteJobMutation } from '../../redux/api/jobApi';

const AdminJobPage = () => {

  const user = useAppSelector((state) => state.userState.user);

  const {
    data: jobs = [],
    refetch
  } = useGetAllJobsQuery(null);


  const [ toggleJob, {...toggleStates} ] =
    useToggleJobMutation();
  
  useEffect(()=> {
    if(toggleStates.isSuccess){
      refetch();
    }
  }, [toggleStates.isLoading]);
  
  const [ deleteJob, {...deleteStates} ] =
    useDeleteJobMutation();

  useEffect(()=> {
  if(deleteStates.isSuccess){
    refetch();
  }
}, [deleteStates.isLoading]);


  return (
    <Container maxWidth='lg' sx={{ mt:'3rem'}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Proved</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Post Date</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            jobs && jobs.map(job=>(
              <TableRow
                key={job.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {job.title}
                </TableCell>
                <TableCell align="right">{job.description}</TableCell>
                <TableCell align="right">{`$ ${job.salary}`}</TableCell>
                <TableCell align="right">
                  <Switch
                    checked={job.proved}
                    onChange={()=>{ toggleJob({id:job.id}) }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </TableCell>
                <TableCell align="right">{job.status}</TableCell>
                <TableCell align="right">{job.createdAt?.toString()}</TableCell>
                <TableCell align="right">
                <Button 
                  color='error'
                  onClick={
                  ()=>{
                    deleteJob({id:job.id});
                  }
                }>Block</Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default AdminJobPage;
