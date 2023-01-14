import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Link, useNavigate } from 'react-router-dom';

export const JobsMenu = ()=> {
  const [anchorEl, setAnchorEl] = React.useState<null|HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>)=> {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = ()=> {
    setAnchorEl(null);
  }

  const navigate = useNavigate();

  return(
    <div>
      <Button
        id="fade-button"
        aria-controls = {open? 'fade-menu' : undefined}
        aria-haspopup = 'true'
        aria-expanded = {open? 'true' : undefined }
        onClick={handleClick}
      >
        Jobs
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={()=> {
          handleClose();
          navigate('/job/create');
        }}>Post Job</MenuItem>

        <MenuItem onClick={()=> {
          handleClose();
          navigate('/job/myjobs');
        }}>My Jobs</MenuItem>
      </Menu>
    </div>
  );
}