import React from "react";
import './LoginPage.css'
import {Link} from 'react-router-dom';
function LoginPage()
{
    
        const imageStyle={height:"99vh",width: "70%"}
    
    return<>
        <div className="Login flex">
        <img src={require("../Data/homepage.png")} alt="homeImage" style={imageStyle}></img>
        
        <div style={{width:"30%", backgroundColor:"#9319ff"}}>
            <div style={{height:"58%"}}>
            <div style={{marginTop:"9vh", marginBottom:"3vh",}}><p className="SignUp">L<span style={{borderBottom:"solid white 2px", paddingBottom:"5px"}}>og I</span>n</p></div>
                <form className="LoginForm">
                
                    <input type="text" className="inputbox" placeholder="Enter Email Id"/>
                    <input type="password" className="inputbox" placeholder="Enter Password"/>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
                <p style={{color:"white", margin:"auto", width:"fit-content", marginTop:"30px"}}>Not a memeber yet ?<Link to='/signup'  style={{ textDecoration:"none",color:"white",fontWeight:"bold",paddingLeft:"10px"}}>S<span style={{borderBottom:"solid 2px white"}}>IGN U</span>P</Link></p>
            </div>
            <img src={require("../Data/buildingVoilet.png")} alt="HomeImage" style={{height:"32.5%",width:"100%"}}/>
        </div>
        </div>
        </>
}
export  default LoginPage