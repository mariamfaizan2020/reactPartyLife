import React,{useEffect, useState} from 'react';
import { collection, getDocs ,getDoc, doc} from "firebase/firestore"; 
import { getFirestore} from "firebase/firestore";
import firebase from './index'
import {
  
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
   
    }from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
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

}))

 const Service = () => {
        const db =getFirestore(firebase)
        const classes=useStyles()
        const [serv, setServ] = useState([]);
        
useEffect(()=>{
     fetchServ()
},[])

const fetchServ=async()=>{

  


    const querySnapshot=await getDocs(collection(db,"services"))
    console.log('Snap',querySnapshot)
     if(!querySnapshot.empty){
      querySnapshot.docs.map(doc => {
    
  
        let data=doc.data()
        console.log('data',data.userUid)
        // console.log("serv",data.services)
        let arr=[]
      data.services.map(async(Allservices)=>{
       
          // console.log("ALLSERVICES",Allservices.type)
          // console.log("price",Allservices.price)
          // console.log("uid",data.userUid)
         
          let obj={  
           serviceType:Allservices.type,
           price:Allservices.price,}
           obj.id=data.userUid
          
         console.log("obj",obj)
        
          const user=await getDocs(collection(db,"users"));
          console.log("user",user)
          user.docs.map(doc=>{
            let data=doc.data()
            console.log("data",data.uid)
            console.log("useruid",obj.id)
        
            if(data.uid===obj.id){
              // console.log("data11",data.userName)
              obj.userName=data.userName
              console.log("obj",obj)
            }
           
          })
          
            arr.push(obj)
           console.log("arr",arr)
           setServ(arr)
        
 
     
       
        })
    
      })
      console.log("serv",serv)
     }
        
    

}
console.log("serv",serv)
  return (
    <div> <TableContainer component={Paper} className={classes.tableContainer}>
    <Table
    className={classes.table}
    aria-label="simple table">
       <TableHead > 
        <TableRow >
        {/* <TableCell  className={classes.tableHeaderCell}>ID</TableCell> */}
        <TableCell className={classes.tableHeaderCell}>Service Name</TableCell>
          <TableCell className={classes.tableHeaderCell}>Price</TableCell>
          <TableCell className={classes.tableHeaderCell}>Artist Name</TableCell>
         
       </TableRow>
      </TableHead>
      <TableBody>
        {serv.map((serv)=>(
          <TableRow
          key={serv.id}>
            {/* <TableCell>
              {info.uid}
            </TableCell> */}
            <TableCell>
              {serv.serviceType}
            </TableCell>
            <TableCell>
              {serv.price}
            </TableCell>
            <TableCell>
              {serv.userName}
            </TableCell>

          </TableRow>
        ))}
      </TableBody>

    </Table>

  </TableContainer></div>
  )
}
 export default Service;