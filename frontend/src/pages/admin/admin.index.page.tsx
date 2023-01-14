import { Box, Container, Typography,
  Card, CardContent
} from '@mui/material';

import { useGetMyJobsQuery } from '../../redux/api/jobApi';
const AdminIndexPage = () => {

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
            Jobboard Admin Page
          </Typography>      
    </Container>
  );
};

export default AdminIndexPage;
