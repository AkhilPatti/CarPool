import React, { useState,useEffect,useContext} from "react";
import {Route, useNavigate} from 'react-router-dom';
import context from "../context/Context";
import './OptionPage.css';
import Header from './Header.js';

function OptionsPage()
{
    const [status,setStatus]=useState('');
    const [userName,setName]=useState('');
    const [userphNo,setPhNo]=useState('');
    let navigate=useNavigate();
    const contex=useContext(context)
    const [email,setEmail]= useState('');
    useEffect(()=>
    {
        if(localStorage.getItem('EmailId')==undefined)
        {
            alert("Please login");
            navigate("/login");
        }
        setEmail(contex.email);
        setName(contex.name);
        console.log(contex.email);
        console.log(contex.name);
        fetch("http://localhost:36349/Name?email="+contex.email,{method:'GET',header:{'Content-Type':'application/json','accept':'application/json'}})
        .then(response=>
            {
                if(response.status==200 )
                {
                    setStatus("DetailsFilled");
                    return response.text();
                }
                else{
                    if(response.status==204)
                    {
                    }
                    throw new Error(response.status)
                }
            })
            .then(data=> {
                setName(()=>data)
                contex.UpdateName(data);
                localStorage.setItem('Name',data);
                console.log(localStorage.getItem('Name'));
            return })
            .catch(error => {
                console.log({error})});
            },[]);
            if(status=="DetailsFilled")
            {
                
                document.getElementById("form").style.display="none";
            }
    const  CaptureDetails = (event) => {
        var submitBtn=document.getElementById("form");
        fetch("http://localhost:36349/Details"+"?name="+userName+"&email="+email+"&phno="+userphNo ,{
        method: "PUT",    
        headers : {
            'Content-Type': 'application/json',
            "accept":"application/json"},
        })
        .then(response => {if (!response.ok){ throw new Error(response.status);}
                           else {return response.json(); }
                          })
        .then(data => {return data.json()})
                    .then(post=>
                        {
                            setName(()=>post.name);
                            setPhNo(()=>post.phNo);
                        })
        .catch(error =>{
            console.log({error})});
        submitBtn.style.display="none";
        setName(()=>contex.name);
        event.preventDefault();
    };
    return<>
        <div className="Page">
        <div id="form" style={{width:"100%" , position:"fixed",height:"100%",backdropFilter:"blur(10px)",zIndex:"999"}}>
        <form id="FormBody" onSubmit={CaptureDetails} style={{width:"25%",backgroundColor:"white",margin:"auto",height:"fit-content",marginTop:"10%",marginBottom:"25%"}}>
            <label> Name </label>
            <input type="text" id="name" required title="Please Enter your name" onChange={e=>setName(e.target.value)}></input>
            <label > Contact Number</label>
            <input type="text" id="ContactNo" required pattern="[0-9]{10}" title="Please enter a valid Phone Number" onChange={e=>setPhNo(e.target.value)}></input>
            <button id="DetailsSubmit" type="submit" >Submit</button>
        </form>
        </div>
        <Header/>
        <div style={{margin:"auto", width:"45%"}}>
                <p style={{fontWeight:"bold", fontSize:"40px",width:"fit-content"}} >Hey {userName}</p>
                <div>
                <button className="BookBtn" onClick={()=>{navigate('/Booking/BookARide')}}>Book a ride</button>
                <button className="OfferBtn" onClick={()=>{navigate('/Booking/OfferARide')}}>Offer a ride</button>
                </div>
        </div>
        <img src={require("../Data/rideoptionsbg.png")} style={{height:"462px", zIndex:-1,width:"100vw", marginTop:"-98px"}}/>
        </div>
    </>
}

export default OptionsPage