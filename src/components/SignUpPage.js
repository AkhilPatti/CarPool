//import {variables} from '../Variables';
import React from "react";
import ReactDOM from 'react-dom';
import HomePic from "./HomePic";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import './SignUpPage.css';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import LoginPage from "./LoginPage";
import {Route} from 'react-router-dom';
import { Icon } from "@material-ui/core";
import Input from "@material-ui/core/Input";
function SignUpPage()
{
            /*constructor(props){
                super(props);
            }*/
            const [email,setEmail]=useState();
            const [password,setPassword]=useState();
            const [confirmpassword,setConfirmPassword]=useState();
            const [message,setMessage]=useState();
            const [showPassword,setShowPassword]=useState(false);
            let navigate=useNavigate();
            React.useEffect(() => {
                if(message==undefined)
                {
                    return;
                }
                const regex= new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
                if(!regex.test(email))
                {
                    alert("please enter A valid Email");
                    setMessage(()=>undefined);
                    return;
                }
                if(message=="Registered Successfully"){
                navigate('/login');
                setMessage(()=>undefined);}
            else
            {alert(message);
            setMessage(()=>undefined);
            return;
        }
            var messageBlock=document.getElementById("messageBlock");
        if(message!=undefined)
        {
        
            /*messageBlock.style.display="block";
            const timer = setTimeout(() => {
                messageBlock.style.display="none";
                setMessage(()=>undefined);
              }, 3000);*/
              alert(message);
        }}, [message])
        const handleShowPassword = ()=>
        {
            setShowPassword(!showPassword);
        }
            function SubmitForm()
            {
                /*React.useEffect(()=>{console.log("just stop");alert("am here");})*/
                if(confirmpassword!=password)
                {
                    alert("confirm Password and password don't match");
                    return
                }
                //let regex= new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$");
                if(password.length<8)
                {
                    alert("Please Enter a Strong Password");
                    return;
                }
                
            
                const requestOptions={
                    method : 'POST',
                    headers :
                    {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "EmailId": email,
                            "Password": password
                        }
                        )
                };
                console.log("before Fetch");
                console.log(message);
                fetch("http://localhost:36349/api/SignUp",requestOptions)
                .then(response => response.json())
                .then(json => setMessage(()=>json))
                .catch(error =>{
                    console.log({error})
                });
            }
           
        
    //render(){
    return<>
        <div className="Login flex">
        <HomePic/>
        
        <div id="signUpLeftContent"style={{width:"30%", backgroundColor:"rgba(255,172,25,255)"}}>
        <div><p id="messageBlock" style={{fontSize:"10px"}}>{message}</p></div>
            <div style={{height:"58%"}}>
            
            <div style={{marginTop:"7vh", marginBottom:"3vh",}}><p className="SignUp">Si<span style={{borderBottom:"solid white 2px"}}>gn </span>Up</p></div>
                <form className="LoginForm">
                
                    <input type="text" className="inputbox" placeholder="Enter Email Id" id="email" onChange={e=>setEmail(e.target.value)}/>
                    <Input  style={{backgroundColor:"white",width:"74%", fontSize:"20px"}} className="inputbox" type={showPassword ? "text" : "password"} endAdornment={<InputAdornment position="end" style={{marginLeft:"1px"}}><Icon  style={{cursor:"pointer"}}onClick={handleShowPassword}>{showPassword ? <VisibilityOff/>:<Visibility/>}</Icon></InputAdornment>}  placeholder="Enter Password" id="password" onChange={e=>setPassword(e.target.value)} />
                    <input type="password" className="inputbox" placeholder="Confirm Password" id="confirmPassword" onChange={e=>setConfirmPassword(e.target.value)}/>
                </form>
                <button className="signUp-submit-btn" onClick={()=>SubmitForm()}>Submit</button>
                <p style={{marginTop:"15px",color:"white", margin:"auto", width:"fit-content"}}>Already a member?<Link to='/login' style={{fontWeight:"bold",paddingLeft:"10px",color:"white",textDecoration:"none"}}>L<span style={{borderBottom:"solid 2px white"}}>OG </span>IN</Link></p>
            </div>
            <img src={require("../Data/building.png")} style={{height:"34%",width:"100%"}}/>
        </div>
        </div>
        </>
}
export  default SignUpPage