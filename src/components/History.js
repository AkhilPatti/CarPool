import React, {useState, useEffect, useContext } from "react";
import {Link, useNavigate} from 'react-router-dom';
import HomePic from "./HomePic";
import context from "../context/Context";
import Header from "./Header"
import Historycards from "./HistoryRideCards.js";
import RideCard from "./RideCard";
function History()
{
    let navigate=useNavigate();
    if(localStorage.getItem("EmailId")==undefined)
    { navigate("/login");}
    const [offeredRides,setOfferedRides]=useState([]);
    const [bookedRides,setBookedRides]=useState([]);
    useEffect(()=>
    {console.log("blaaj"+localStorage.getItem('EmailId'));
        fetch("http://localhost:36349/GetOfferedRides?userId="+localStorage.getItem('EmailId'),{
             headers : { 
                   'Content-Type': 'application/json',
                   'Accept': 'application/json'
                  }})
                 .then(data => {return data.json()})
                 .then(post => {console.log("here",post);setOfferedRides(()=>post)})
        fetch("http://localhost:36349/GetBookedRides?userId="+localStorage.getItem('EmailId'),{
                headers : { 
                      'Content-Type': 'application/json',
                        'Accept': 'application/json'
                     }})
                    .then(data => {return data.json()})
                    .then(post => {console.log(post);setBookedRides(()=>post)})
    },[])
    return<>
    <Header/>
        <div style={{marginTop:"25px"}}>
            <div style={{display:"flex", flexDirection:"row"}}>
            <div id="BookedRidesBox" style={{width:"35%",marginLeft:"40px"}}>
            <button style={{color:"white",fontSize:"15px", height:"25px" , paddingLeft:"5px",paddingRight:"5px" ,backgroundColor:"rgba(147,25,255,255)", border:"none", borderRadius:"4px"}}>
                Booked rides
                {bookedRides.map((ride,index) =>
                    (<Historycards key={index}  price={ride['price']}  date={ride['date']} pickupPoint={ride['startLocation']} time={ride['time'].slice(0,4)+'-'+ride['time'].slice(4)} name={ride['name']} destination={ride['destination']}
                    />))}
            </button>
            
            </div>
            <div id="OfferedRides" style={{width:"35%"}}>
            <button style={{backgroundColor:"#ffac19",fontSize:"15px", height:"25px",color:"white",border:"none",borderRadius:"4px"}}>
                Offered rides
            </button>
            {offeredRides.map((ride,index) => 
                    (<Historycards key={index}  price={ride['price']}  date={ride['date']} pickupPoint={ride['startLocation']} time={ride['time'].slice(0,4)+'-'+ride['time'].slice(4)} name={ride['name']} destination={ride['destination']}
                    />))}
            </div>
            </div>
        </div>
    </>
}
export default History;