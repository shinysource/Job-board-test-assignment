import React, { useEffect, } from 'react';
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
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useGetUsersQuery } from '../../redux/api/jobApi';
import { useToggleUserMutation } from '../../redux/api/userApi';
import { useDeleteUserMutation } from '../../redux/api/userApi';
import { boolean } from 'zod';

const AdminFreelancerPage = () => {

  const user = useAppSelector((state) => state.userState.user);

  const {
    data: freelancers = [],
    refetch
  } = useGetUsersQuery(null);

  const [ toggleUser, {...toggleStates} ] =
    useToggleUserMutation();
  
  useEffect(()=> {
    if(toggleStates.isSuccess){
      refetch();
    }
  }, [toggleStates.isLoading]);
  
  const [ deleteUser, {...deleteStates} ] =
    useDeleteUserMutation();

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
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Verified</TableCell>
            <TableCell align="right">SignUp Date</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            freelancers && freelancers.map(freelancer=>(
              freelancer.id != user!.id ?
              <TableRow
                key={freelancer.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {freelancer.name}
                </TableCell>
                <TableCell align="right">{freelancer.description}</TableCell>
                <TableCell align="right">
                  <Switch
                    checked={freelancer.verified}
                    onChange={()=>{ toggleUser({id:freelancer.id}) }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </TableCell>
                <TableCell align="right">{freelancer.createdAt?.toString()}</TableCell>
                <TableCell align="right">
                <Button 
                  color='error'
                  onClick={
                  ()=>{
                    deleteUser({id:freelancer.id});
                  }
                }>Block</Button>

                </TableCell>
              </TableRow>
              :
              ''
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default AdminFreelancerPage;
