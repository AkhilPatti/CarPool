import React,{useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import context from "../context/Context";
function Header()
    {
        let navigate=useNavigate();
        const contextApi=useContext(context);
        const [ showDropDown , setShowDropDown] = useState(false);
        const ChangeDropDown=()=>
        {
            setShowDropDown(()=>!showDropDown);
            console.log("clicked");
        }
    function Logout ()
    {
        contextApi.UpdateEmail(undefined);
        contextApi.UpdateName(undefined);
        localStorage.clear();
        navigate('/login');
    }
    
    return <div style={{display:"flex",justifyContent:"space-between", height:"fitContent",marginTop:"20px",marginLeft:"40px",marginRight:"40px"}}>
            <img src={require("../Data/logo.png")} style={{height:"65px"}} />
            <div style={{display:"flex",flexDirection:"row"}}>
            <p style={{fontSize:"20px",fontWeight:"bold",alignSelf:"center"}} > {localStorage.getItem('Name')} </p>
            <img src = {require("../Data/user-profile.png")}  onClick={ChangeDropDown} style={{cursor:"pointer",height:"50px",width:"50px", alignSelf:"center"}}/>
            {showDropDown && <ul style={{listStyleType:"none",position:"absolute", paddingLeft:"0px",marginRight:"80px",border:"silver solid 1px", borderRadius:"5px",marginTop:"65px",width:"100px",display:"inline-block"}}>
                <li className="menuOptions" onClick={()=>{navigate("/profile")}} >Profile</li>
                <li className="menuOptions" onClick={()=>{navigate("/history")}}>History</li>
                <li className="menuOptions" onClick={()=>Logout()}>Logout</li>
            </ul>}
            </div>
        </div>
    }
export default Header;
        