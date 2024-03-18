import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import {useAppstore} from '../../store/appStore'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme}) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#3f51b5', 
}));

export default function Navbar() {
  const state = useAppstore((state) => state);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dopen = state.dopen;
  const updateOpen = state.updateOpen;
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const logoutSubmit = () => {
    Cookies.remove("adminDetails");
    Cookies.remove("accessToken");
    navigate("../adminlogin");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={()=>updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            E-Cooks
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <button onClick={logoutSubmit}>logout</button>               
          </Box>        
        </Toolbar>
      </AppBar>
    </Box>
  );
}