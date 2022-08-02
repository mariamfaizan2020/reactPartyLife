
import React,{useEffect, useState} from 'react';
import { collection, getDocs,onSnapshot } from "firebase/firestore"; 
import { getFirestore,doc, setDoc  } from "firebase/firestore";
import firebase from './index'
// import {getAuth} from "firebase-admin/auth";
import {
  
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
    IconButton,
  

   
    }from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';



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

      const User=()=>{
        const db =getFirestore(firebase)
        const classes=useStyles()
        const [info , setInfo] = useState([]);
        const [query,setQuery]=useState("")
    
    
       
   
        const toggleACtive=(uid,disable)=>{
      
             console.log("uid",uid)
             console.log('disable',disable)
         if(disable===false){
              const userRef= doc(db, 'users', uid);
              setDoc(userRef, { disable: true }, { merge: true });
              
            }
            else {
              const userRef= doc(db, 'users', uid);
              setDoc(userRef, { disable: false}, { merge: true });
            }
            
            }
        
         

        useEffect(()=>{
          Fetchdata()
         
        },[])
        const Fetchdata=()=>{
          const q=collection(db,"users")
    onSnapshot(q,(querySnapshot)=>{
      
                let arr=[]
        
         querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            // console.log('doc',doc.data().userName)
            arr.push(doc.data())
            // console.log('xxx',arr)
            setInfo(arr)
           }
          );
          })
  
        //     const  querySnapshot = await getDocs(collection(db, "users"))
        //     console.log('xxx',querySnapshot)
      
        
        //     let arr=[]
        
        //  querySnapshot.forEach((doc) => {
        //     console.log(`${doc.id} => ${doc.data()}`);
        //     console.log('doc',doc.data().userName)
        //     arr.push(doc.data())
        //     // console.log('xxx',arr)
        //     setInfo(arr)
        //    }
        //   );
      }
      // console.log('info123',info)
    
     

      return(
          <div>
            <header className={classes.header}>USERS
            
            <input type='text'   placeholder="search" className={classes.searchBar} onChange={(e)=>setQuery(e.target.value)}/>
            </header>
              <TableContainer component={Paper} className={classes.tableContainer}>
                {/* <h1 className={classes.header}>USERS</h1> */}
      <Table
      className={classes.table}
      aria-label="simple table">
         <TableHead > 
          <TableRow >
          {/* <TableCell  className={classes.tableHeaderCell}>ID</TableCell> */}
          <TableCell className={classes.tableHeaderCell}>EMAIL</TableCell>
            <TableCell className={classes.tableHeaderCell}>NAME</TableCell>
            <TableCell className={classes.tableHeaderCell}>ROLE</TableCell>
            <TableCell className={classes.tableHeaderCell} >NOTIFICATION</TableCell>
            <TableCell className={classes.tableHeaderCell}>ACTIVE/NONACTIVE</TableCell>
           
         </TableRow>
        </TableHead>
        <TableBody>
          {info.filter((user)=>
          user.userName.toLowerCase().includes(query)).map((info)=>(
            <TableRow
            key={info.uid}>
              {/* <TableCell>
                {info.uid}
              </TableCell> */}
              <TableCell>
                {info.email}
              </TableCell>
              <TableCell>
                {info.userName}
              </TableCell>
              <TableCell>
                {info.type}
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  SEND NOTIFICATION
                </Button>
              </TableCell>
              <TableCell>
                <IconButton onClick={()=>toggleACtive(info.uid,info.disable)}>
                 {info.disable===true?<ToggleOnIcon fontSize="large" color="primary"></ToggleOnIcon>:<ToggleOffIcon fontSize="large"></ToggleOffIcon>}
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>

    </TableContainer>
  
          </div>
      )
    }

      export default User;