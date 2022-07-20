import React,{useState,useEffect} from "react";
import "./AboutRide.css"
import {Plus} from 'react-bootstrap-icons';
function AboutRide(props)
{   const [prev,setPrev]=useState("")
    let seats=[1,2,3];
    const [stops,setStops]=useState([{ Stop : "" }]);
    const [price,setPrice]=useState(0);
    function updateList(e,index)
    {
        const {name,value}=e.target
        const list=[...stops];
        console.log(list,index-1,name);
        list[index-1][name]=value;
        setStops(list);
        return;
    }
    function ButtonClicked(e,seatNo)
    {
        let v=seatNo+"Btn";
        document.getElementById(v).style.backgroundColor="purple";
        document.getElementById(v).style.color="white";
        if (prev!="")
        {
            let r=prev+"Btn"
            document.getElementById(prev+"Btn").style.backgroundColor="white";
            document.getElementById(prev+"Btn").style.color="silver";
            console.log(document.getElementById(prev+"Btn"));}
        setPrev(seatNo);
        e.preventDefault();
        return;
    }

    function GetRideDetails(event)
    {
        props.parentCallback(stops,prev,price,true);
        event.preventDefault();
    }

    function Seats(){    
        const seatBtns=seats.map((number) =>
                <button id={number.toString().concat("Btn")} style={{color:"silver",height:"40px",borderRadius:"50%",width:"40px",backgroundColor:"white",borderColor:"silver",marginRight:"10px"}} key={number} onClick={(e)=>{e.preventDefault();ButtonClicked(e, number)}}>{number}</button>
    );
return <div>{seatBtns}</div>}
    function AddStop()
    {
        setStops([...stops,{Stop:""}])
        setCounter(counter+1);
    }
    const [counter,setCounter]=useState(1);
    return<>
    <div id= "Card" style={{width:"fitContent",paddingRight:"20px"}}>
        <div style={{border:"solid 1px", borderColor:"silver",borderRadius:"5px" ,backgroundColor:"white",display:"flex",flexDirection:"column",width:"300px",paddingBottom:"30px",paddingRight:"30px",paddingLeft:"20px"}}>
        <div style={{display:"flex", flexDirection:"row", marginBottom:"0px"}}>
            <h2 style={{width:"fitContent",height:"fitContent", marginBottom:"0px"}}>Offer a Ride</h2>
            </div>
            <p style={{marginTop:"2px"}} id="tagLine">we get you the matches asap !</p>
            <form  style={{display:"flex",flexDirection:"column",marginTop:"15px"}} onSubmit={(e)=>GetRideDetails(e)}>
            <div id="inputs">
                {stops.map((stop,index) => (<div key={index}><label>Stop {index+1}</label>
                <div className="wrapper">
                <input name="Stop" type="text" className="Stops" onInput={(e)=>updateList(e,counter)} />
                {counter==index+1 && (<span><Plus size={27} color="blue" onClick={AddStop} id="Plus" cursor={"pointer"}/></span>)}
                </div></div>))}
            </div>
            <div style={{display:"flex", flexDirection:"row",width:"fitContent"}}>
            <div id="noOfSeats">
            <p>Available Seats</p>
            <div>
            <div>
            {seats.map((number) =>
                <button id={number.toString().concat("Btn")} style={{color:"silver",height:"40px",borderRadius:"50%",width:"40px",backgroundColor:"white",borderColor:"silver",marginRight:"10px"}} key={number} onClick={(e)=>{e.preventDefault();ButtonClicked(e, number)}}>{number}</button>)}
            </div>
            </div>
            </div>
            <div id="Price" style={{paddingLeft:"25px"}}>
            <p>Price</p>
            <div style={{display:"inline-flex"}}><input id="PriceInput" pattern="^[0-9]+$" style={{width:"100px",fontSize:"30px", outline:"none",borderBottom:"none"}} onInput={(e)=>setPrice(e.target.value)}></input><p>$</p></div>
            </div>
            </div>
                <div style={{display:"flex",flexDirection:"row"}}>
                <button type='submit' id="CardSubmitBtn" >Submit</button>
                
                </div>
            </form>
        </div>
        </div>
        </>
}
export default AboutRide;