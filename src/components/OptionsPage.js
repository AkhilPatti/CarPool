import React from "react";
import './OptionPage.css'
import {Link} from 'react-router-dom';
function OptionsPage()
{
    return<>
        <div className="Page">
        <div style={{display:"flex",justifyContent:"space-between", height:"40px",marginTop:"20px",marginLeft:"40px",marginRight:"40px"}}>
            <img src={require("../Data/logo.png")} style={{height:"65px"}} />
            <div style={{display:"flex",flexDirection:"row"}}>
            <p style={{fontSize:"20px",fontWeight:"bold",alignSelf:"center"}} > John Wills </p>
            <img src = {require("../Data/user-profile.png")} style={{height:"50px",width:"50px", alignSelf:"center"}}/>
            </div>
        </div>
        <div style={{margin:"auto", width:"45%"}}>
                <p style={{fontWeight:"bold", fontSize:"40px",width:"fit-content"}} >Hey john!</p>
                <div>
                <button className="BookBtn">Book a ride</button>
                <button className="OfferBtn">Offer a ride</button>
                </div>
        </div>
        <img src={require("../Data/rideoptionsbg.png")} style={{height:"462px", zIndex:-1,width:"100vw", marginTop:"-98px"}}/>
        </div>
    </>
}
export default OptionsPage