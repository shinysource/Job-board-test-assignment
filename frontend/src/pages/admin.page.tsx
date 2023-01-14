import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Container, Box } from '@mui/material';
import {Typography} from '@mui/material';
import {Stack} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const navigate = useNavigate();


  const [view, setView] = React.useState('');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null,
  ) => {
    if (newView !== null) {
      setView(newView);
    }
    navigate(`/admin/${newView || ''}`);
  };

  return (
    <Box sx={{ mt:'3rem', ml:'0', mr:'0', width:'100%'}}>
      <Stack direction='row' sx={{width:'100%'}}>
        <Box sx={{minWidth:'15%'}}>
          <ToggleButtonGroup
            orientation="vertical"
            value={view}
            exclusive
            onChange={handleChange}
            sx={{ml:'15px'}}
            >
            <ToggleButton value="">
              Home
            </ToggleButton>
            <ToggleButton value="users">
              User Manage
            </ToggleButton>
            <ToggleButton value="jobs">
              Job Manage
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{maxWidth:'85%'}}>
          <Outlet/>
        </Box>
      </Stack>      
    </Box>
  );
}