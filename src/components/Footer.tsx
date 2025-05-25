import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import  Stack  from '@mui/material/Stack';
import Box from '@mui/material/Box';
import logo from '../assets/abinbev_logo_en.svg';
import react from '../assets/react.svg';

function Footer() {
  return (
    <Box sx={{ width: '100%', p: 5, mt: 'auto' }}>
      <Stack direction={'column'} justifyContent={'center'} alignContent={'center'} flexWrap={'wrap'}>
        <Box sx={{ background: 'url(/bear.gif)', width: '150px', height: '150px' }}></Box>

        <img src={logo} alt="React Logo" />
      </Stack>
    </Box>
  );
}

export default Footer;
