import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router';
const SignUpButton = () => {
  return (
    <Button color={'white'} component={RouterLink} to={'sign-in'}>
      Sign In
    </Button>
  );
};

export default SignUpButton;
