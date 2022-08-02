import React ,{useState} from "react";
import {Grid,Paper,Avatar,TextField,Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getAuth,signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import firebase from '../index'
import { useNavigate} from "react-router-dom";







const useStyles=makeStyles((theme)=>({
    paperStyle:{
        padding:20,
        height:'50vh',
        width:"20%",
        margin:'80px auto',
      

    },
    avatarStyle:{
        backgroundColor:'green'
    },
  
  
}))

const Login=()=>{
  // const history = useHistory();
  const navigate = useNavigate()

    const  db=getFirestore(firebase)
    const classes=useStyles()
    const auth = getAuth();
    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState(null)
  





    const onSignIn = async()=>{
      // console.log(email,"email",password,"password")
      // console.log("auth1",auth)
      try {
      await signInWithEmailAndPassword(auth, email, password)
      //  console.log("user is LOgged In ")
       .then(async(user)=>{
        //  console.log("user",user.user.uid)
        const docRef = doc(db, "users",user.user.uid);
        // console.log('xxx--',docRef)
       
          const docSnap =await getDoc(docRef);
          // console.log("ttt//",docSnap)
        
      
        
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        if(docSnap.data().role==="ADMIN"){
          console.log("YOU CAN ACCESS")
          navigate("/Main", { from: "Login" })
        }else{
         console.log("ONLY ADMIN CAN ACCEESS")
        }

       })
      } catch (err) {
        console.error(err);
        alert(err.message);
      }







 
   
        // console.log("email,",email,"password",password)
        // try {
        //   const user=await signInWithEmailAndPassword(auth, email, password);
        //   console.log("user",user)
        // } catch (err) {
        //   console.error("err---",err);
        //   alert(err.message);
        // }
    
         


    };
   
  
    
   

   
 
return(
 <Grid>
     <Paper elevation={10} className={classes.paperStyle}>
         <Grid align='center'>
         <Avatar className={classes.avatarStyle}><LockOutlinedIcon /></Avatar>
           <h2>Sign in</h2>
          
         </Grid>
      
         <TextField 

           placeholder="email"      
         label="Username" fullWidth required
          // onChange={(event)=>setEmail(event.target.value)}
          onChange={(e)=>{
        
            setEmail(e.target.value)}}
   
         /> 
        
         <TextField  
    
      
         label="Password" placeholder="password" fullWidth 
         required type="password"
         onChange={(e)=>{
          //  console.log('password',e.target.value)
          setPassword(e.target.value)
         }}
      
       
         />
        
         <FormControlLabel
        control={
          <Checkbox
           
            name="checkedB"
            color="primary"
          />
        }
        label="Remember Me"
      />
      <Button 
      fullWidth 
      variant="contained" 
      color="primary"
      onClick={onSignIn}>SIGN IN</Button>
         </Paper>
  </Grid>
)
}

export default Login;