import { Box, Container, Typography,
  Card, CardContent
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../redux/store';
import { useUpdateUserMutation } from '../redux/api/userApi';


const profileSchema = object({
  email: string(),
  name: string().min(1, 'Full name is required').max(100),
  description: string(),
});

const profileFormSchema = object({
  name: string().min(1, 'Full name is required').max(100),
  description: string(),
});

const passwordSchema = object({
  currentPassword: string().min(1, 'Password is required'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export type ProfileInput = TypeOf<typeof profileSchema>;
export type ProfileFormInput = TypeOf<typeof profileFormSchema>;
export type PasswordInput = TypeOf<typeof passwordSchema>;

const ProfilePage = () => {
  
  var user = useAppSelector((state) => state.userState.user);

  const navigate = useNavigate();
  const location = useLocation();
  
  const methods = useForm<ProfileFormInput>({
    resolver : zodResolver(profileFormSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  // Update Profile Mutation
  const [ updateUser, { isLoading, isError, error, isSuccess }] =
    useUpdateUserMutation();

  const from = ((location.state as any)?.from.pathname as string ) || '/';

  useEffect(()=> {
    if(isSuccess){
      toast.success('You successfully uodated your profile');
      navigate(from);
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

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<ProfileFormInput> = (value)=> {
     updateUser({...value, email:user!.email});
  };

  return (
    <Container maxWidth='lg' sx={{ mt:'3rem'}}>
      <Card>
        <CardContent>
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
          Profile
        </Typography>      
        <FormProvider {...methods}>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete='off'
          >
            <FormInput defaultValue={ user!.name } name='name' label='Name' type='text'/>
            <FormInput defaultValue={ user!.description} name='description' label='Description' type='text'/>
            
            <LoadingButton variant='contained' type='submit'>
              Update
            </LoadingButton>
          </Box>
        </FormProvider>

        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
