import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router';

const SignUpButton = () => {
  return (
    <Button variant={'contained'} component={RouterLink} to={'sign-up'}>
      Sign up
    </Button>
  );
};

export default SignUpButton;
