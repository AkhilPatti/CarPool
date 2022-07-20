import React, { useState, useEffect, useContext } from "react";
import './LoginPage.css';
import {Link, useNavigate} from 'react-router-dom';
import HomePic from "./HomePic";
import context from "../context/Context";
function LoginPage()
{
        const [emailId,setEmailId]=useState('');
        const [password,setPassword]=useState('');
        const [message,setMessage]=useState();
        const [validAttempt,setValidAttempt]=useState(true);
        let navigate= useNavigate();
        const a=useContext(context);
                
        useEffect(()=>
        {
            if(validAttempt==false)
            {
                alert("Enter Valid Details");
                setValidAttempt(true);
                return;
            }
            if(message==undefined)
                {
                    return;
                }
                const regex= new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
                if(!regex.test(emailId))
                {
                    alert("please enter a valid Email");
                    return
                }
                console.log("before");
                a.UpdateEmail(emailId);
                localStorage.setItem('EmailId',emailId);
                console.log(message);
        if(message!=undefined)
        {
            var messageBlock=document.getElementById("messageBlock");
            messageBlock.style.display="block";
            if(message!="Welcome")
            {
                alert(message)
                
            return;}
            const timer = setTimeout(() => {
                messageBlock.style.display="none";
                setMessage(()=>undefined);
              }, 1000);
              navigate('/options');
              
        }
        },[message,validAttempt])
        function Login()
        {
                fetch("http://localhost:36349/api/Login?emailId="+emailId+"&password="+password,{
                    headers : { 
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                     }})
                     .then((response) =>{if(response.ok)
                        {
                            return response.json();
                        }
                            else
                            {
                                throw new Error(response.status);
                            }
                    })
                    .then(data => {console.log(data);setMessage(()=> data);})
                    .catch((error)=>{console.log("error occurred"+error);setValidAttempt(false);
                return;});
                    a.UpdateEmail(emailId);
                    console.log("this is his email ID",a.email);
                    console.log(message);
            return;
        }


        
    return<>
        <div className="Login flex">
       <HomePic/>
        <div style={{height:"98.5vh",width:"30%", backgroundColor:"#9319ff"}}>
        <div style={{height:"4vh",marginTop:"3vh"}}><p  style={{display:"none",marginLeft:"35%"}}id="messageBlock">{message}</p></div>
            <div style={{height:"55vh"}}>
            <div style={{marginTop:"7vh", marginBottom:"3vh",}}><p className="SignUp">L<span style={{borderBottom:"solid white 2px", paddingBottom:"5px"}}>og I</span>n</p></div>
                <form className="LoginForm">
                    <input type="text" className="inputbox" placeholder="Enter Email Id" onChange={e=>setEmailId(e.target.value)}/>
                    <input type="password" className="inputbox" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} />
                </form>
                <button  className="submit-btn" onClick={()=>Login()}>Submit</button>
                <p style={{color:"white", margin:"auto", width:"fit-content", marginTop:"30px"}}>Not a memeber yet ?<Link to='/signup'  style={{ textDecoration:"none",color:"white",fontWeight:"bold",paddingLeft:"10px"}}>S<span style={{borderBottom:"solid 2px white"}}>IGN U</span>P</Link></p>
            </div>
            <img src={require("../Data/buildingVoilet.png")} alt="HomeImage" style={{height:"30%",width:"100%"}}/>
        </div>
        </div>
        </>
}
export  default LoginPage