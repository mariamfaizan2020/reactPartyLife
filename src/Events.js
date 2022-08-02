
import React,{useEffect, useState} from 'react';
import { collection, getDocs, onSnapshot , query, orderBy, limit } from "firebase/firestore"; 
import firebase from './index'
import { getFirestore } from "firebase/firestore";
import moment from 'moment'
import {NestedDropdown} from 'mui-nested-menu'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import {
    
    Typography,
  Button,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Backdrop,
    Card ,
    Grid,
  
  CircularProgress,
   
    }from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { chainPropTypes } from '@mui/utils';

     const useStyles=makeStyles((theme)=>({
        table:{
          minWidth:650
        },
        tableContainer:{
          borderRadius:2,
          margin:'10px 10px',
          maxWidth:1000
        },
        tableHeaderCell:{
          fontWeight:"bold",
          backgroundColor: theme.palette.primary.light,
          color:theme.palette.getContrastText(theme.palette.primary.light)
        },
        searchBar:{
          borderWidth:3,
          borderRadius:5,
          width:"20%",
          height:30,
          padding:'10px',
          margin:'10px',
          Align:'right',
          marginLeft:"40%"
          
        
        },
        header:{
          fontSize:40,
          fontWeight:'bold',
          margin:'15px'
        }
      
      }))
      const Event=()=>{
        const db =getFirestore(firebase)
        const classes=useStyles()
        const [events , setEvents] = useState([]);
        const [date,setDate]=useState()
        const [query,setQuery]=useState("")
        const [open, setOpen] = React.useState(false);
        const [Selectedgroup, setSelectedGroup] = useState("");
        const [orderBy, setorderBy] = useState("Date");
        const [selectedCity,setSelectedCity]=useState("")
  
        useEffect(()=>{
          Fetchdata()
        },[])

        const fileDropdownData = {
          label: "Filter By",
          // rightIcon:<FilterAltOutlinedIcon/>,
          
          items: [
            {
              label: "City",
              // leftIcon: <SaveAsIcon />,
              items: [
                {
                  label: "Multan",
                  // rightIcon: <SaveAsIcon />,
                  callback: () => {
                    
                    setSelectedCity("Multan");
                  },
                },
                {
                  label: "Karachi",
                  // rightIcon: <SaveAsIcon />,
                  callback: () => {
                   
                    setSelectedCity("Karachi");
                  },
                },
                {
                  label: "Islamabad",
                  // leftIcon: <SaveAsIcon />,
                  callback: () => {
                  
                    setSelectedCity("Islamabad");
                  },
                },
                {
                  label: "Lahore",
                  // rightIcon: <SaveAsIcon />,
                  callback: () => {
                 
                    setSelectedCity("Lahore");
                  },
                },
              ],
            },
            {
              label: "Date",
              // leftIcon: <SaveAsIcon />,
              items: [
                {
                  label: "Date in ascending",
                  // rightIcon: <SaveAsIcon />,
                  callback: () => {
                    setorderBy("Date");
                    setSelectedGroup("Date in ASC");
                  },
                },
                {
                  label: "Date in descending",
                  // leftIcon: <SaveAsIcon />,
                  callback: () => {
                    setorderBy("Date");
                    setSelectedGroup("Date in DESC");
                  },
                },
              ],
            },
          ],
        };

      
      
        const Fetchdata = ()=>{

          let arr=[]
          const  EventRef = (collection(db,"Events"))
        onSnapshot(EventRef,(querySnapshot)=>{

    
          querySnapshot.forEach((doc) => {
      
            console.log("data",doc.data().DateOFEvent.toDate())
            const data=doc.data()
            console.log('data',data)
     
  
            let obj={
              name:data.nameOfEvent,
              type:data.TypeOFEvent,
              date:data.DateOFEvent.toDate(),
              stime:data.StartingTImeOFEvent.toDate().toLocaleTimeString(),
              etime:data.EndTimeOFEvent.toDate().toLocaleTimeString(),
              city:data.city
            
            }
        
              arr.push(obj)
              console.log('yyy',arr)
              setEvents(arr)
             
             }
         
            )
            

        
        })
          
       
          
      }
 
        
        
      
   
      console.log('info',events)
      if(selectedCity){
        return(

          <div>
             <header className={classes.header}>EVENTS
             <input 
            type='text'
            placeHolder="search" 
            className={classes.searchBar} 
            onChange={(e)=>setQuery(e.target.value)}/>
            
           
            <Backdrop className={classes.backdrop} 
            // open={open}
            >
           <CircularProgress color="inherit" />
            </Backdrop>
           
            <Grid item>
            <NestedDropdown
              variant="contained"
              sx={{
                borderRadius: "10px",
                marginBottom: 3,
                // backgroundColor: "#233044",
                marginRight: 20,
              }}
              data={fileDropdownData}
            />
          </Grid>
            
       
      </header>
              <TableContainer component={Paper} className={classes.tableContainer}>
      <Table
      className={classes.table}
      aria-label="simple table">
         <TableHead > 
          <TableRow >
          <TableCell  className={classes.tableHeaderCell}>NAME</TableCell>
            <TableCell className={classes.tableHeaderCell}>TYPE</TableCell>
            <TableCell className={classes.tableHeaderCell}>DATE</TableCell>
            <TableCell className={classes.tableHeaderCell}>STARTTIME</TableCell>
            <TableCell className={classes.tableHeaderCell}>ENDTIME</TableCell>
            <TableCell className={classes.tableHeaderCell}>CITY</TableCell>
           
         </TableRow>
        </TableHead>
        <TableBody>
          {events.filter((event)=>event.city.includes(selectedCity)).map((events)=>(
            <TableRow
            key={events.EventId}>
              <TableCell>
                {events.name}
              </TableCell>
              <TableCell>
                {events.type}
              </TableCell>
              <TableCell>
                
               {moment(events.date).format("YYYY/MM/DD")}
        
              </TableCell>
               <TableCell>
              {events.stime}
                {/* {moment(event.stime).format("hh:mm A")} */}
              </TableCell> 
              <TableCell>
           
                {/* {moment(event.etime).format("hh:mm A")} */}
                {events.etime}
              </TableCell>
              <TableCell>
                {events.city}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
        

      </Table>

    </TableContainer>
    
  
          </div>
      )
      }else{

    
 
      return(

          <div>
             <header className={classes.header}>EVENTS
             <input 
            type='text'
            placeHolder="search" 
            className={classes.searchBar} 
            onChange={(e)=>setQuery(e.target.value)}/>
            
           
            <Backdrop className={classes.backdrop} 
            // open={open}
            >
           <CircularProgress color="inherit" />
            </Backdrop>
           
            <Grid item>
            <NestedDropdown
              variant="contained"
              sx={{
                borderRadius: "10px",
                marginBottom: 3,
                // backgroundColor: "#233044",
                marginRight: 20,
              }}
              data={fileDropdownData}
            />
          </Grid>
            
       
      </header>
              <TableContainer component={Paper} className={classes.tableContainer}>
      <Table
      className={classes.table}
      aria-label="simple table">
         <TableHead > 
          <TableRow >
          <TableCell  className={classes.tableHeaderCell}>NAME</TableCell>
            <TableCell className={classes.tableHeaderCell}>TYPE</TableCell>
            <TableCell className={classes.tableHeaderCell}>DATE</TableCell>
            <TableCell className={classes.tableHeaderCell}>STARTTIME</TableCell>
            <TableCell className={classes.tableHeaderCell}>ENDTIME</TableCell>
            <TableCell className={classes.tableHeaderCell}>CITY</TableCell>
           
         </TableRow>
        </TableHead>
        <TableBody>
          {events.filter((event)=>event.name.toLowerCase().includes(query)).map((events)=>(
            <TableRow
            key={events.EventId}>
              <TableCell>
                {events.name}
              </TableCell>
              <TableCell>
                {events.type}
              </TableCell>
              <TableCell>
                
               {moment(events.date).format("YYYY/MM/DD")}
        
              </TableCell>
               <TableCell>
              {events.stime}
                {/* {moment(event.stime).format("hh:mm A")} */}
              </TableCell> 
              <TableCell>
           
                {/* {moment(event.etime).format("hh:mm A")} */}
                {events.etime}
              </TableCell>
              <TableCell>
                {events.city}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
        

      </Table>

    </TableContainer>
    
  
          </div>
      )
    }
  }

      export default Event;