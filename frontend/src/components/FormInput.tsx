import {
  FormHelperText,
  Typography,
  FormControl,
  Input,
  InputProps,
} from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';


type IFormInputProps = {
  name: string;
  label: string;
  defaultValue: string;
} & InputProps;

const FormInput: FC<IFormInputProps> = ({ name, label, defaultValue ,...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography
            variant='body2'
            sx={{ color: 'gray', mb: 1, fontWeight: 500 }}
          >
            {label}
          </Typography>
          <Input
            {...field}
            fullWidth
            sx={{ borderRadius: '1rem' }}
            error={!!errors[name]}
            {...otherProps}
          />
          <FormHelperText error={!!errors[name]}>
            {errors[name] ? errors[name].message : ''}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormInput;
