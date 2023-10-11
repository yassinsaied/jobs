import { useState } from 'react';

// @redux
import { useSelector, useDispatch } from 'react-redux';

// @react form hooks
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { loginAction } from '../../../store/actions/authActions';

// ----------------------------------------------------------------------

export default function LoginForm() {
  // Hooks of redux
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // Handel form
  const schemaLogin = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Mail is required'),
    password: Yup.string().required('Password is required').min(4, 'Password minimum 4 character'),
    termsAndConditions: Yup.bool().oneOf([true], 'You need to accept the terms and conditions'),
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
    defaultValues: {
      email: '',
      password: '',
      termsAndConditions: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const submitForm = (data) => {
    delete data.termsAndConditions;
    dispatch(loginAction(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack spacing={3}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                label="Email address"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email && `${errors.email.message}`}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? 'text' : 'password'}
                size="small"
                fullWidth
                label="passwords"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.password && `${errors.password.message}`}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Controller
            name="termsAndConditions"
            control={control}
            defaultvalue={false}
            render={({ field }) => (
              <>
                <FormControlLabel control={<Checkbox {...field} />} label="Terms and conditions" />
                {!!errors.termsAndConditions && (
                  <FormHelperText error>
                    {errors.termsAndConditions && `${errors.termsAndConditions.message}`}
                  </FormHelperText>
                )}
              </>
            )}
          />

          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>
        <Stack spacing={1}>
          <LoadingButton loading={loading} fullWidth size="large" type="submit" variant="contained">
            Login
          </LoadingButton>

          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={() => {
              reset();
            }}
          >
            cancel
          </Button>
        </Stack>
      </form>
    </>
  );
}
