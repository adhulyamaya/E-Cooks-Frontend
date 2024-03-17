// import React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import { Link } from "react-router-dom";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import * as IoIcons from "react-icons/io";
// import { useAppstore } from '../../store/appStore';

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

// export default function SideBar() {
//   const theme = useTheme();
//   const state = useAppstore((state) => state);
//   const open = state.dopen;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader />
//         <Divider />
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary={
//                 <Link to="/admin-home/course-manage">
//                   <AiIcons.AiOutlineBook />
//                   <span>COURSES</span>
//                 </Link>
//               } />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary={
//                 <Link to="/admin-profile">
//                   <ListItemText primary={<span>ALL USERS</span>} />
//                 </Link>
//               } />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary={
//                 <Link to="/admin-home/mentors-manage">
//                   <FaIcons.FaUser />
//                   <span>MENTORS</span>
//                 </Link>
//               } />
//             </ListItemButton>
//           </ListItem>
//         </List>
//         <Divider />
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary="home" />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Drawer>
//     </Box>
//   );
// }
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideBar() {
  const theme = useTheme();
  const location = useLocation();
  const activePath = location.pathname;

  const menuItems = [
    {
      text: 'Courses',
      icon: <AiIcons.AiOutlineBook />,
      link: '/admin-home/course-manage',
    },
    {
      text: 'All Users',
      icon: <AiIcons.AiOutlineUser />,
      link: '/admin-profile',
    },
    {
      text: 'Mentors',
      icon: <FaIcons.FaUser />,
      link: '/admin-home/mentors-manage',
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open>
        <DrawerHeader />
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              button
              component={Link}
              to={item.link}
              sx={{
                ...(activePath === item.link && {
                  backgroundColor: theme.palette.action.selected,
                  color: theme.palette.primary.main,
                }),
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/" sx={{ textDecoration: 'none' }}>
            <ListItemIcon><AiIcons.AiOutlineHome /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
