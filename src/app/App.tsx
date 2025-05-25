import './App.css';
// import 'react-quill/dist/quill.snow.css';
import { Outlet } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Outlet />
        {/*<Footer />*/}
      </Box>
    </>
  );
}

export default App;
