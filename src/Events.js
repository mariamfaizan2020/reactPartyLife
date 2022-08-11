
import React,{useEffect, useState} from 'react';
import { collection, onSnapshot,orderBy,query,limit,getFirestore,startAfter  } from "firebase/firestore"; 
import firebase from './index'
import moment from 'moment'
import {NestedDropdown} from 'mui-nested-menu'
import { makeStyles } from '@material-ui/core/styles';
import { chainPropTypes } from '@mui/utils';
import {
    Button,TableContainer,
    Table,TableHead,TableBody,
    TableRow,TableCell,Paper,
    Backdrop,Grid,
    CircularProgress} from '@material-ui/core'


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
        },
       
          footer:{
            position:'absolute',
             right:"30%"
             
          }
    
      
      }))
      const Event=()=>{
        const db =getFirestore(firebase)
        const classes=useStyles()
        const [events, setEvents] = useState([]);
        const [filterData,setFilterData]=useState("")
        const [lastDoc,setLastDoc]=useState()
        const [selectedGroup, setSelectedGroup] = useState("");
        const [order, setOrder] = useState("");
        const [selectedCity,setSelectedCity]=useState("")
        const [loading,setLoading]=useState(false)
        const [isEmpty,setIsEmpty]=useState(false)
  
        useEffect(()=>{
          Fetchdata()
          setLoading(false)
          setIsEmpty(false)
      
        },[selectedGroup,selectedCity])

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
                    setOrder('city')
                    setSelectedCity("Multan")
             
                  },
                },
                {
                  label: "Karachi",
                  // rightIcon: <SaveAsIcon />,
                  callback: () => {
                    setOrder('city')
                    setSelectedCity("Karachi")
                
                  },
                },
                {
                  label: "Islamabad",
                  // leftIcon: <SaveAsIcon />,
                  callback: () => {
                    setOrder('city')
                    setSelectedCity("Islamabad")
                   
                  },
                },
                {
                  label: "Lahore",
                  // rightIcon: <SaveAsIcon />,
                  callback: () => {
                    setOrder('city')
                    setSelectedCity("Lahore")
                 
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
                    setOrder("Date");
                    setSelectedGroup("Date in ASC")
               
                  },
                },
                {
                  label: "Date in descending",
                  // leftIcon: <SaveAsIcon />,
                  callback: () => {
                  setOrder("Date");
                    setSelectedGroup("Date in DESC")
                
                  },
                  
                },
              ],
            },{
              label:"Remove Filter",
              callback:()=>{
                setOrder('')
                setSelectedCity('')
                setSelectedGroup('')
              }
           
            }
          ],
        };

const Data=(querySnapshot)=>{
  let arr=[]
  if(!querySnapshot.empty){
     console.log("qsnapshot",querySnapshot)
     querySnapshot.forEach((doc) => {
        const data=doc.data()
  //  console.log('filterData',data)
     const lastdoc=querySnapshot.docs[querySnapshot.docs.length-1]
      console.log("LAstDOc",lastdoc)
     let obj={
    name:data.nameOfEvent,
    type:data.TypeOFEvent,
    date:data.DateOFEvent.toDate(),
    stime:data.StartingTImeOFEvent.toDate().toLocaleTimeString(),
    etime:data.EndTimeOFEvent.toDate().toLocaleTimeString(),
    city:data.city}
    
    arr.push(obj)
    setEvents([...arr])
    setLastDoc(lastdoc)});
  }else{
     setIsEmpty(true)
  }
   }
   

const updateData=(querySnapshot)=>{
      let arr=[]
      if(!querySnapshot.empty){
       console.log("qsnapshot",querySnapshot)
       querySnapshot.forEach((doc) => {
         const data=doc.data()
         console.log('filterData',data)
         const lastdoc=querySnapshot.docs[querySnapshot.docs.length-1]
    let obj={
      name:data.nameOfEvent,
      type:data.TypeOFEvent,
      date:data.DateOFEvent.toDate(),
      stime:data.StartingTImeOFEvent.toDate().toLocaleTimeString(),
      etime:data.EndTimeOFEvent.toDate().toLocaleTimeString(),
      city:data.city}

      arr.push(obj)
      console.log('fData',arr)
      setEvents([...events,...arr])
      setLastDoc(lastdoc)});
    }else{
    setIsEmpty(true)
    }
    setLoading(false)

    }  
      // console.log("aaa",lastDoc)
      // console.log("bbb",lmt)
      
        const Fetchdata = ()=>{
          if(order==="Date" && selectedGroup==="Date in DESC"){
              const DateRef=(collection(db,"Events"))
              const q = query(DateRef,orderBy("DateOFEvent","desc"),limit(10));
                onSnapshot(q, (querySnapshot) => {
                  Data(querySnapshot)});    

            }else if(order==="Date" && selectedGroup==="Date in ASC"){
              const DateRef=(collection(db,"Events"))
              const q = query(DateRef,orderBy("DateOFEvent","asc"),limit(10));
                onSnapshot(q, (querySnapshot) => {
                  Data(querySnapshot)});    
            }else{
              const  EventRef = (collection(db,"Events"))
              const q=query(EventRef,orderBy("DateOFEvent"),limit(10))
                  onSnapshot(q,(querySnapshot)=>{    
                    Data(querySnapshot)})
            }
         }
  console.log('info',events)
  console.log("lastDoc",lastDoc)
 
    

  const fetchMore=()=>{
    setLoading(true)
     if(order==="Date" && selectedGroup==="Date in DESC"){
      const DateRef=(collection(db,"Events"))
              const q = query(DateRef,orderBy("DateOFEvent","desc"),startAfter(lastDoc),limit(10));
              onSnapshot(q, (querySnapshot) => {
               updateData(querySnapshot)});
              }else if(order==="Date" && selectedGroup==="Date in ASC"){
              const DateRef=(collection(db,"Events"))
              const q = query(DateRef,orderBy("DateOFEvent","asc"),startAfter(lastDoc),limit(10));
              onSnapshot(q, (querySnapshot) => {
                updateData(querySnapshot)});    
             }else{
              const  EventRef = (collection(db,"Events"))
              const q=query(EventRef,orderBy("DateOFEvent"),startAfter(lastDoc),limit(10))
              onSnapshot(q,(querySnapshot)=>{
               updateData(querySnapshot)})
             }
         }
      
      return(
       <div>
         <header className={classes.header}>EVENTS
              <input 
               type='text'
               placeHolder="search" 
               className={classes.searchBar} 
               onChange={(e)=>setFilterData(e.target.value)}/>
    
              <Backdrop className={classes.backdrop}>
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
              data={fileDropdownData}/>
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
          {order==='city'?
        <TableBody>
         {[...events].filter((event)=>event.city.includes(selectedCity)).map((events)=>(
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
                   </TableCell> 
                  <TableCell>
                   {events.etime}
                  </TableCell>
                  <TableCell>
                    {events.city}
                  </TableCell>
               </TableRow>
              ))}
            </TableBody>:
            <TableBody> 
            {[...events].filter((event)=>event.name.toLowerCase().includes(filterData)).map((events)=>(
       
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
                      </TableCell> 
                     <TableCell>
                      {events.etime}
                     </TableCell>
                     <TableCell>
                       {events.city}
                     </TableCell>
                 </TableRow>
                 ))}
               </TableBody>
               }
      </Table>
 </TableContainer>
  
    <footer className={classes.footer}>
       {loading && <h3>loading...</h3>}
       {isEmpty && <h3>no more Data</h3>}
       {!loading && !isEmpty && <Button onClick={fetchMore}> More </Button>}
    </footer>
      </div>
      )
    }
   export default Event;