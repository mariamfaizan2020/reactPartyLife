
import React,{useEffect, useState} from 'react';
import { collection, getDocs } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import firebase from './index'
import { NestedDropdown } from "mui-nested-menu";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import { spacing } from "@material-ui/system";
import moment from "moment";
import {
  Backdrop,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Grid,
  InputBase,

  Typography as MuiTypography,
} from "@material-ui/core";

// import {
  
//     TableContainer,
//     Table,
//     TableHead,
//     TableBody,
//     TableRow,
//     TableCell,
//     Paper,
//     Typography,
   
//     }from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const useStyles = makeStyles((theme) => ({
  backdrop: { zIndex: theme.zIndex.drawer + 1, color: "#fff" },
}));


// const useStyles=makeStyles((theme)=>({
//     table:{
//       minWidth:650
//     },
//     tableContainer:{
//       borderRadius:2,
//       margin:'10px 10px',
//       maxWidth:1000
//     },
//     tableHeaderCell:{
//       fontWeight:"bold",
//       backgroundColor: theme.palette.primary.light,
//       color:theme.palette.getContrastText(theme.palette.primary.light)
//     },
  
//   }))

const Transection=()=>{
    const db=getFirestore(firebase)
    const [trans,setTrans]=useState([])
    const classes=useStyles()
    const [Selectedgroup, setSelectedGroup] = useState("");
    const [orderBy, setorderBy] = useState("PaidAt");
    // const fileDropdownData = {
    //   label: "Filter By",
    //   items: [
    //     {
    //       label: "Amount",
    //       // leftIcon: <SaveAsIcon />,
    //       items: [
    //         {
    //           label: "Amount in ascending",
    //           // rightIcon: <SaveAsIcon />,
    //           callback: () => {
    //             setorderBy("Amount");
    //             setSelectedGroup("Amount in ASC");
    //           },
    //         },
    //         {
    //           label: "Amount in descending",
    //           // leftIcon: <SaveAsIcon />,
    //           callback: () => {
    //             setorderBy("Amount");
    //             setSelectedGroup("Amount in DESC");
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       label: "Paid At",
    //       // leftIcon: <SaveAsIcon />,
    //       items: [
    //         {
    //           label: "Paid At in ascending",
    //           // rightIcon: <SaveAsIcon />,
    //           callback: () => {
    //             setorderBy("PaidAt");
    //             setSelectedGroup("PaidAt in ASC");
    //           },
    //         },
    //         {
    //           label: "Paid At in descending",
    //           // leftIcon: <SaveAsIcon />,
    //           callback: () => {
    //             setorderBy("PaidAt");
    //             setSelectedGroup("PaidAt in DESC");
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // };
  

    useEffect(()=>{
        fetchTransection()
    },[])

    const fetchTransection=async()=>{

        let arr=[]
        const  querySnapshot = await getDocs(collection(db, "transection"))
        // console.log('xxx',querySnapshot)

        
        querySnapshot.forEach((doc) => {
            const data=doc.data()
            console.log("data",data)
           let obj={
               F:data.F,
               Id:data.transectionID,
               for:data.for,
               from:data.from.name,
               To:data.to.name,
               paidAt:data.paidAt.toDate(),
               Amount:data.amount
           }
           arr.push(obj)
           console.log('xxx',arr)
           setTrans(arr)
          }
         );
     }
     console.log('info',trans)
     return (
      <React.Fragment>
        <Helmet title="Transactions" />
        <Backdrop className={classes.backdrop} >
          <CircularProgress color="inherit" />
        </Backdrop>
     
        <Grid container justify="space-between" spacing={6}>
          <Grid item>
            <Typography style={{ color: "#233044" }} variant="h3" gutterBottom>
              Transactions
            </Typography>
          </Grid>
          <Grid item>
            {/* <NestedDropdown
              variant="contained"
              sx={{
                borderRadius: "10px",
                marginBottom: 3,
                backgroundColor: "#233044",
                marginRight: 20,
              }}
              data={fileDropdownData}
            /> */}
          </Grid>
        </Grid>
   
    { trans.map((trans,index)=> {
    return(
     
      <Card mb={5} key={index}>
        <CardContent>
          <div style={{display:"flex"}}>
            <Grid item xs={6} md={3}>
              <Typography
               style={{ fontWeight: "800" }}
               variant="body2"
               gutterBottom
               mr={2}>
                From{" "}
              </Typography>
            </Grid>
            <Typography variant="body2" gutterBottom mr={2}>
            {trans.from}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
                  <Grid item xs={6} md={3}>
                    <Typography
                      style={{ fontWeight: "800" }}
                      variant="body2"
                      gutterBottom
                      mr={2}
                    >
                      To{" "}
                    </Typography>
                  </Grid>
                  <Typography variant="body2" gutterBottom mr={2}>
                    {trans.To}
                  </Typography>
                </div>
                <div style={{ display: "flex" }}>
                  <Grid item xs={6} md={3}>
                    <Typography
                      style={{ fontWeight: "800" }}
                      variant="body2"
                      gutterBottom
                      mr={2}
                    >
                      Amount{" "}
                    </Typography>
                  </Grid>
                  <Typography variant="body2" gutterBottom mr={2}>
                    ${trans.Amount}
                  </Typography>
                </div>
                <div style={{ display: "flex" }}>
                  <Grid item xs={6} md={3}>
                    <Typography
                      style={{ fontWeight: "800" }}
                      variant="body2"
                      gutterBottom
                      mr={2}
                    >
                      Paid at{" "}
                    </Typography>
                  </Grid>
                  <Typography variant="body2" gutterBottom mr={2}>
                    {moment(trans.paidAt).format("MM/DD/YYYY hh:mm a")}
                    {/* {item.paidAt.toDate()} */}
                  </Typography>
                </div>
                {trans.F==="venue" ?(
                  <>
                  <div style={{ display: "flex" }}>
                  <Grid item xs={6} md={3}>
                        <Typography
                          style={{ fontWeight: "800" }}
                          variant="body2"
                          gutterBottom
                          mr={2}
                        >
                          Venue Name{" "}
                        </Typography>
                      </Grid>
                      <Typography variant="body2">
                        {trans.for.split("-")[1]}
                      </Typography>
                      </div>
                  </>
                ):(
                  <>
                  <div style={{ display: "flex" }}>
                  <Grid item xs={6} md={3}>
                        <Typography
                          style={{ fontWeight: "800" }}
                          variant="body2"
                          gutterBottom
                          mr={2}
                        >
                          Service Name{" "}
                        </Typography>
                      </Grid>
                      <Typography variant="body2">
                        {trans.for.split("-")[1]}
                      </Typography>
                  </div>
                  </>
                )
               
                }
        </CardContent>

      </Card>

      // <TableContainer component={Paper} className={classes.tableContainer}>
      //     <Table
      //        className={classes.table}
      //        aria-label="simple table">
      //         <TableHead>
      //             <TableRow>
      //                 <TableCell  className={classes.tableHeaderCell}>ID</TableCell>
      //                 <TableCell   className={classes.tableHeaderCell}>For</TableCell>
      //                 <TableCell   className={classes.tableHeaderCell}>From</TableCell>
      //                 <TableCell   className={classes.tableHeaderCell}>To</TableCell>
      //                 <TableCell  className={classes.tableHeaderCell}>PaidAt</TableCell>
      //                 <TableCell  className={classes.tableHeaderCell}>Amount</TableCell>
      //             </TableRow>
      //         </TableHead>
      //         <TableBody>
      //           {trans.map((trans)=>(
      //               <TableRow
      //               key={trans.transectionID}>
      //                 <TableCell>{trans.Id}</TableCell>
      //                 <TableCell>{trans.for}</TableCell>
      //                 <TableCell>{trans.from}</TableCell>
      //                 <TableCell>{trans.To}</TableCell>
      //                 <TableCell>{trans.paidAt}</TableCell>
      //                 <TableCell>{trans.Amount}</TableCell>
                  

      //             </TableRow>
                
      //           ))}
      //         </TableBody>
      //     </Table>
      // </TableContainer>
  
    )

  })}
        </React.Fragment>
   )

}
export default Transection