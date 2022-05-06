import React, { useState, useEffect } from "react";
import './LoginPage.css';
import {Link} from 'react-router-dom';
function LoginPage()
{
    
        const imageStyle={height:"99vh",width: "70%"};
        const [emailId,setEmailId]=useState('');
        const [password,setPassword]=useState('');
        const [message,setMessage]=useState();
        const [api,setApi]=useState("http://localhost:36349/api/Login?");
        useEffect(()=>
        {
            if(message==undefined)
                {
                    console.log(message);
                    return;
                }
                const regex= new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
                if(!regex.test(emailId))
                {
                    alert("please enter A valid Email");
                    return
            
                }
                console.log(message);
        if(message!=undefined)
        {
            console.log("yes");
            var messageBlock=document.getElementById("messageBlock");
            messageBlock.style.display="block";
            const timer = setTimeout(() => {
                messageBlock.style.display="none";
                setMessage(()=>undefined);
              }, 1000);
              //alert(message);
              
        }
        },[message]
        )
        function Login()
        {
            console.log("Inside Submit Form");
            const requestOptions=
            {
                method:'GET',
                Headers:{
                    Accept: 'application/json',
                        'Content-Type': 'application/json',
                        
                },
                
            };
            
                
                setApi(()=>"http://localhost:36349/api/Login?emailId="+emailId+"&password="+password);
                console.log("http://localhost:36349/api/Login?emailId="+emailId+"&password="+password);
                fetch("http://localhost:36349/api/Login?emailId="+emailId+"&password="+password,{
                    headers : { 
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                     }})
                    .then(data => {return data.json()})
                    .then(post => {console.log("hoe");setMessage(()=> post)});
            // empty dependency array means this effect will only run once (like componentDidMount in classes)
            //fetch("http://localhost:3376/api/Login",requestOptions)
            return;
        }
        
    return<>
        <div className="Login flex">
        <img src={require("../Data/homepage.png")} alt="homeImage" style={imageStyle}></img>
        
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