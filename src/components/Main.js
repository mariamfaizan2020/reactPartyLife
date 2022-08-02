import React,{useState} from 'react'
import { styled,AppBar,ThemeProvider,CssBaseline,Toolbar ,Box,createTheme,Drawer,
Badge,Typography,IconButton,List,Divider,Container} from '@material-ui/core'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import  ListItems  from './ListItems';
import { useNavigate } from 'react-router';
import User from "../User"
import Events from "../Events"
import Transection from "../Transection"
import Service from "../Service"



const drawerWidth = 300;
  
// const AppBar1= styled(AppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth+30}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));
  


  const Drawer1 = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );
  



  const mdTheme = createTheme();

  function DashboardContent({navigate}) {

    const [open, setOpen] = useState(true);
    const [showUser,setShowUser]=useState(true)
    const [showEvents,setShowEvents]=useState(false)
    const [showTrans,setShowTrans]=useState(false)
    const [showServ,setShowServ]=useState(false)


    const toggleDrawer = () => {
      setOpen(!open);
    };
// console.log("hey",ListItems.ListItemsText)
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          {/* <AppBar1 position="absolute" open={open}> */}
           {/* <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
               onClick={toggleDrawer} 
             sx={{
               marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
             >
               <MenuIcon /> 
              </IconButton>  */}
          {/* //     <Typography
          //       component="h1"
          //       variant="h6"
          //       color="inherit"
          //       noWrap
          //       sx={{ flexGrow: 1 }}
          //     >
          //       Dashboard
          //   </Typography>
          //     <IconButton color="inherit"> 
          //        <Badge color="secondary" 
          //       overlap="rectangular"
          //       > 
          //        <NotificationsIcon /> 
          //      </Badge> 
          //  </IconButton>  */}
            {/* </Toolbar> 
          </AppBar1> */}
          <Drawer1 variant="permanent" 
          // open={open}
          >
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <h1>PARTYLIFE</h1>
             
              {/* <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton> */}
            </Toolbar>
            <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}>
            <h3>Dashboard</h3>
             <IconButton onClick={toggleDrawer}>
               {open===true?<ExpandLessIcon/> :
                <ExpandMoreIcon/>}
              </IconButton>

            </Toolbar>
            {/* <Divider /> */}
          
           <List component="nav">
               {open===true?<ListItems 
                User={showUser}
                showUser={setShowUser}
                Events={showEvents}
                showEvents={setShowEvents}
               Trans={showTrans}
                showTrans={setShowTrans}
                Serv={showServ}
                showServ={setShowServ}
             
                />
                  :null}
         
                
        </List> 
          
         
          </Drawer1>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
             <Container fixed>
 {showUser==true?<User/>:showEvents==true?<Events/>:showTrans==true?<Transection/>:showServ==true?<Service/>:<User/>}
            
            </Container>  
       
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

 

  export default function Dashboard() {
    return <DashboardContent />;
  }