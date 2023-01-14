import { Box, Container, Typography,
  Card, CardContent
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { number, object, string, TypeOf, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../components/FormInput';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../redux/store';
import { usePostJobMutation } from '../../redux/api/jobApi';
import { useGetMyJobsQuery } from '../../redux/api/jobApi';

const jobSchema = object({
  postEmail: string(),
  title: string().min(1, 'Title is required').max(100),
  description: string().min(1, 'Description is required'),
  salary: z.number().or(z.string().regex(/\d+/).transform(Number))
    .refine((n) => n > 0, "There is nothing free"),
});

const jobFormSchema = object({
  title: string().min(1, 'Title is required').max(100),
  description: string().min(1, 'Description is required'),
  salary: z.number().or(z.string().regex(/\d+/).transform(Number))
  .refine((n) => n > 0, "There is nothing free"),
});

export type JobInput = TypeOf<typeof jobSchema>;
export type JobFormInput = TypeOf<typeof jobFormSchema>;

const PostJobPage = () => {
  var user = useAppSelector((state) => state.userState.user);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const methods = useForm<JobFormInput>({
    resolver : zodResolver(jobFormSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const [ postJob, { isLoading, isError, error, isSuccess }] =
    usePostJobMutation();

  const from = ((location.state as any)?.from.pathname as string ) || '/';

  useEffect(()=> {
    if(isSuccess){
      toast.success('New job posted successfully');
      navigate('/job/myjobs');
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

  const onSubmitHandler: SubmitHandler<JobFormInput> = (value)=> {
     postJob({...value, postEmail:user!.email});
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
          New Job
        </Typography>      
        <FormProvider {...methods}>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete='off'
          >
            <FormInput defaultValue='' name='title' label='Title' type='text'/>
            <FormInput defaultValue='' name='description' label='Description' type='text'/>
            <FormInput defaultValue='0' name='salary' label='Salary ($)' type='text'/>

            <LoadingButton variant='contained' type='submit'>
              Post
            </LoadingButton>
          </Box>
        </FormProvider>

        </CardContent>
      </Card>
    </Container>
  );
};

export default PostJobPage;
