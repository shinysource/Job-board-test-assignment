import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import { IJob, IBid } from '../redux/api/types';

export interface IJobTableRowProps {
  job: IJob,
}

export const JobTableRow = ( props: { job: IJob} )=> {
  const {job} = props;

  const [open, setOpen] = React.useState(false);

  return(
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          {
            job.bids?.length !=0 ?
              <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              :''
          }
        </TableCell>
        <TableCell component="th" scope="row">
          {job.title}
        </TableCell>
        <TableCell align="right">{job.jobType}</TableCell>
        <TableCell align="right">{`$ ${job.salary}`}</TableCell>
        <TableCell align="right">{
          job.proved && (
            <CreditScoreOutlinedIcon sx={{ color: 'green' }} />
          )
        }</TableCell>
        <TableCell align="right">{job.status}</TableCell>
        <TableCell align="right">{job.bids? job.bids.length:0}</TableCell>
        <TableCell align="right">{job.createdAt.toString()}</TableCell>
      </TableRow>
      <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Bids
              </Typography>
              <Table size="small" aria-label="bids">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>post date</TableCell>
                    <TableCell align="right">letter</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {job.bids && job.bids!.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell component="th" scope="row">
                        {bid.user.name}
                      </TableCell>
                      <TableCell>{bid.createdAt.toString()}</TableCell>
                      <TableCell align="right">{bid.letter.slice(0,10)}</TableCell>
                      <TableCell align="right">
                        Send
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}