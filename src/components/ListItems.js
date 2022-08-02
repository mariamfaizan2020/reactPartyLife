import  React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventIcon from '@mui/icons-material/Event';
import AddCardIcon from '@mui/icons-material/AddCard';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
// import User from '../User'
// import { useNavigationType } from 'react-router';

// import AssignmentIcon from '@mui/icons-material/Assignment';

 const ListItems = (props)=>{
console.log("props",props)
     return(
<React.Fragment>
    {/* <ListItemButton >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton> */}


    <ListItemButton 
    //  onClick={()=>navigate("/User", { from: "Main" })}
    onClick={()=>{props.showUser(true);props.showEvents(false);props.showTrans(false);props.showServ(false)}}
     >
    
      <ListItemIcon>
        < PeopleAltIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />

    </ListItemButton>

    <ListItemButton   
    onClick={()=>{props.showEvents(!props.Events);props.showUser(false);props.showTrans(false);props.showServ(false)}}
    >
      {/* // onClick={()=>navigate("/Event", { from: "Main" })}> */}
     <ListItemIcon>
        <EventIcon />
      </ListItemIcon>
      <ListItemText primary="Events" />
    </ListItemButton>
    <ListItemButton
    onClick={()=>{props.showTrans(!props.Trans);props.showUser(false);props.showEvents(false);props.showServ(false)}}
    > 
    <ListItemIcon>
        <AddCardIcon />
      </ListItemIcon>
      <ListItemText primary="Transections" />
    </ListItemButton>
    <ListItemButton
    onClick={()=>{props.showServ(!props.serv);props.showUser(false);props.showTrans(false);props.showEvents(false)}}
    >
      <ListItemIcon>
        <MusicVideoIcon />
      </ListItemIcon>
      <ListItemText primary="Services" />
    </ListItemButton>
   
  </React.Fragment>
     )
 }

export default ListItems