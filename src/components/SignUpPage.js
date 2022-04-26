import React from "react";
import ReactDOM from 'react-dom';
import './SignUpPage.css'
import {Link} from 'react-router-dom';
function SignUpPage()
{
    
        const imageStyle={height:"99vh",width: "70%"}
    
    return<>
        <div className="Login flex">
        <img src="Data/homepage.png" style={imageStyle}></img>
        
        <div style={{width:"30%", backgroundColor:"#ffc319"}}>
            <div style={{height:"58%"}}>
            <div style={{marginTop:"9vh", marginBottom:"3vh",}}><p className="SignUp">Si<span style={{borderBottom:"solid white 2px"}}>gn </span>Up</p></div>
                <form className="LoginForm">
                
                    <input type="text" className="inputbox" placeholder="Enter Email Id"/>
                    <input type="password" className="inputbox" placeholder="Enter Password"/>
                    <input type="password" className="inputbox" placeholder="Confirm Password"/>
                    <button type="submit" className="signUp-submit-btn">Submit</button>
                </form>
                <p style={{marginTop:"15px",color:"white", margin:"auto", width:"fit-content"}}>Already a member?<Link to='/login' style={{fontWeight:"bold",paddingLeft:"10px",color:"white",textDecoration:"none"}}>L<span style={{borderBottom:"solid 2px white"}}>OG </span>IN</Link></p>
            </div>
            <img src="Data/building.png" style={{height:"32.5%",width:"100%"}}/>
        </div>
        </div>
        </>
}
export  default SignUpPage