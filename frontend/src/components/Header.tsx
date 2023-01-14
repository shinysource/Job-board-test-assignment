import {
  AppBar as _AppBar,
  Avatar,
  Box,
  Container,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import {
  LoadingButton,
} from '@mui/lab';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAppSelector } from '../redux/store';
import { useLogoutUserMutation } from '../redux/api/authApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { JobsMenu } from './JobsMenu';

const AppBar = styled(_AppBar)`
  background-color: white;
`;


const Header = () => {
  const [cookies] = useCookies(['logged_in']);
  const logged_in = cookies.logged_in;

  const navigate = useNavigate();

  const [logoutUser, { isLoading, isSuccess, error, isError }] =
    useLogoutUserMutation();

  const user = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    if (isSuccess) {
      window.location.href = '/';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onLogoutHandler = async () => {
    logoutUser();
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='lg'>
        <Toolbar>
          <Typography
            variant='h4'
            onClick={() => navigate('/')}
            color='gray'
            sx={{ cursor: 'pointer' }}
          >
            Work
          </Typography>

          <Box display='flex' sx={{ ml: '10px' }}>
            {logged_in && user?.role === 'client' && (
              <>
                <JobsMenu />
                <LoadingButton
                  variant = 'text'
                  onClick={()=> {navigate('/client/freelancers');}}
                  >
                  Freelancers
                </LoadingButton>
              </>
            )}
            {
              logged_in && user?.role === 'freelancer' && (
                <>
                  <LoadingButton
                    variant = 'text'
                    onClick={()=> {navigate('/freelancer/invites');}}
                    >
                    Invites
                  </LoadingButton>
                </>
              )
            }
          </Box>

          <Box display='flex' sx={{ ml: 'auto' }}>
            {!logged_in && (
              <>
                <Button
                  variant='text'
                  sx={{ mr: 2 }}
                  onClick={() => navigate('/register')}
                >
                  SignUp
                </Button>
                <Button
                  variant='text'
                  onClick={() => navigate('/login')} 
                >
                  Login
                </Button>
              </>
            )}
            {logged_in && (
              <>
                <LoadingButton
                  variant = 'text'
                  onClick={onLogoutHandler}
                  loading={isLoading}
                  >
                  Logout
                </LoadingButton>
                <Box sx={{ ml: 4 }}>
                  <Tooltip
                    title='Profile'
                    onClick={() => navigate('/profile')}
                  >
                    <Button sx={{ p: 0.5 }}>
                      <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                        <PersonIcon />
                      </Avatar>
                      <Typography sx={{fontSize:'12px', ml:'5px'}} align='center' color='gray'>{ user?.name }</Typography>
                    </Button>
                  </Tooltip>
                </Box>
              </>
            )}
            {logged_in && user?.role === 'admin' && (
              <Button
                variant = 'outlined'
                sx={{ backgroundColor: '#eee', ml: 2 }}
                onClick={() => navigate('/admin')}
              >
                Admin
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
