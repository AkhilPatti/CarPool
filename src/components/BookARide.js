import React,{useEffect, useNavigate ,useState,useContext} from 'react';
import "./BookARide.css";
import AboutRide from "./AboutRide.js"
import RideCard from "./RideCard.js";
import "./RideCard.css";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import context from "../context/Context";
import DailogueBox from './DailogueBox';
import Header from './Header.js'

function BookCard(props)
{
    let navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("EmailId")==undefined)
        {
            navigate("/login");
        }
        if(props.type=="Book a Ride")
        {
            SilderChange();
        }
    },[])
    const contextApi=useContext(context);
    const[stops,setStops] = useState([{ Stop :""}])
    const [noofSeats,setNoofSeats] = useState(0);
    const [price,setPrice]=useState(0);
    const [date,setDate]=useState('');
    const [submittedOfferRide,setSubmittedOfferRide]=useState(false)
    const callbackFunction = (_stops,_noofSeats,_price,_submit) => {
                                            setStops(_stops);
                                            setNoofSeats(_noofSeats);
                                            setPrice(_price);
                                            setSubmittedOfferRide(_submit);
                                            }
    const [slide,setSlide]=useState(false);
    const [functionality,setFunctionality]=useState(props.type);
    const [time,setTime]=useState("");
    const [fetchRides,setFetchRides]=useState(false);
    const [start,setStart]=useState('');
    const [destination,setDestination]=useState('');
    const [resultArea,setResultArea]=useState('');
    const [filteredRides,setFilteredRides]=useState([]);
    const [submitBookRide,setSubmitBookRide]=useState(false);
    const [selectedRide,setSelectedRide]=useState("");
    const [showRide,setShowRide]=useState(false);
    const emailId=contextApi.email;
    const userName= contextApi.name;
    const SilderChange =() =>
    {
        setSlide(!slide);
        setResultArea('');
        if(!slide)
        {
            setFunctionality("Book a Ride");
            document.getElementById("CardSubmitBtn").style.visibility="visible";
            document.getElementById("next").style.visibility="hidden";
        }
        else{
            setFunctionality("Offer a Ride");
            document.getElementById("CardSubmitBtn").style.visibility="hidden";
            document.getElementById("next").style.visibility="visible";
        }
    }
    
    useEffect(()=>
    {
        if(submittedOfferRide==false)
        return;
        setSubmittedOfferRide(false);
        //const stopsList= stops.map((stop)=> {return stop['Stop'];});
        console.log("submit");
        const requestOptions={
            method : 'POST',
            headers :
            {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "startLocation": start.toLowerCase(),
                    "destination"  : destination.toLowerCase(),
                    "time"         : time,
                    "stops": stops.map((stop)=>stop['Stop'].toLowerCase()),
                    "availableSeats": noofSeats,
                    "riderEmail": contextApi.email.toLowerCase(),
                    "riderName":contextApi.name.toLowerCase(),
                    "price": parseInt(price,10),
                    "date": date
                })
        };
        fetch("http://localhost:36349/OfferRide",requestOptions)
        .then(response => {console.log(response);if(response.start==200){return response.json();}return undefined; })
        .then(json => {if(json!=undefined){alert("Your is successfully created")}})
        .catch(error =>{
            console.log({error})
        });
        return;},[submittedOfferRide])
        useEffect(()=>{
            console.log("functionaliity",functionality);
            if (resultArea=="ShowRides" && functionality=="Book a Ride")
        {   
             fetch("http://localhost:36349/Rides?date="+date+"&time="+time+"&start="+start.toLowerCase()+"&destination="+destination.toLowerCase(),{
             headers : { 
                   'Content-Type': 'application/json',
                   'Accept': 'application/json'
                  }})
                 .then(data => {return data.json()})
                 .then(post => {setFilteredRides(()=>post)})
                 setFetchRides(false);
                 }},[fetchRides]);
    function Result()
    {
        if(resultArea=="AboutRide" && functionality=="Offer a Ride")
        {
            return<AboutRide parentCallback = {callbackFunction} />
        }
        else if (resultArea=="ShowRides" && functionality=="Book a Ride")
        {
            return <div>
                <h2 style ={{color:"purple",fontWeight:"bold"}}> Your Matches</h2>
                <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                    {filteredRides.map((ride,index) => 
                    (<RideCard noOfSeats={ride['availableSeats']} key={index} ride = {ride} SendConfirmRide={ConfirmRide} price={ride['price']}  date={ride['date']} pickupPoint={ride['startLocation']} time={ride['time'].slice(0,4)+'-'+ride['time'].slice(4)} name={ride['riderName']} destination={ride['destination']}
                    />))}
                </div>
            </div>}
    }
    
    function ConfirmRide(ride)
    {
        setShowRide(true);
        setSelectedRide(ride);
        setSubmitBookRide(false);
    }
    const GetFromAlert=(value)=>
    {
        setShowRide(false);
        setSubmitBookRide(value);
        if(value==true)
        {
            fetch("http://localhost:36349/BookRide?rideId="+selectedRide['RideId']+"&passengerId="+contextApi.email,{
                method:"PUT",
             headers : { 
                   'Content-Type': 'application/json',
                   'Accept': 'application/json'
                  }})
                 .then(data => {return data.json()})
                 //.then(post => {console.log(post);setFilteredRides(()=>post)})
                 setFetchRides(true);
                  
        }
        else{
            return;
        }
    }
    const UpdateTime=(_time)=>
        {
            if(_time==''){return;}
            if(time=='')
            {
                setTime(()=>_time);
                document.getElementById(_time+"Btn").style.color="white";
                document.getElementById(_time+"Btn").style.backgroundColor="purple";
            }
            else{
            document.getElementById(_time+"Btn").style.color="white";
            document.getElementById(_time+"Btn").style.backgroundColor="purple";
            setTime(()=>_time);
            document.getElementById(time+"Btn").style.color="purple";
            document.getElementById(time+"Btn").style.backgroundColor="white";}
        }
    function SubmitOfferRide(event)
    {
        event.preventDefault();
    }

    return<>
    <div id='BookARideBody'>
    {showRide && <DailogueBox SendResponse={GetFromAlert} name= {selectedRide['riderName']} />}
    <Header/>
        <div id="Content" style={{display:"flex",flexDirection:"row",marginTop:"5px"}}>
        <div id="Search" style={{width:"40%"}}>
        <div id= "Card" style={{width:"fitContent",paddingRight:"20px"}}>
        <div style={{border:"solid 1px", borderColor:"silver",borderRadius:"5px" ,backgroundColor:"white",display:"flex",flexDirection:"column",width:"300px",paddingBottom:"30px",paddingRight:"30px",paddingLeft:"20px"}}>
        <div style={{display:"flex", flexDirection:"row", marginBottom:"0px"}}>
            <h2 style={{width:"fitContent",height:"fitContent", marginBottom:"0px"}}>{functionality}</h2>
            <label className="toggle" style={{alignSelf:"center"}}>
                <input type="checkbox" checked={slide} onChange={SilderChange} style={{display:"none"}} />
                <span className="slider"></span>
            </label>
            </div>
            <p style={{marginTop:"2px"}} id="tagLine">we get you the matches asap !</p>
            <form  onSubmit={SubmitOfferRide} style={{display:"flex",flexDirection:"column",marginTop:"15px"}}>
                <label>From</label>
                <input type="text" onChange={(e)=>setStart(e.target.value)} style={{borderBottom:"silver solid 2px"}}>
                </input>
                <label>To</label>
                <input type="text" onChange={(e)=>setDestination(e.target.value)} style={{borderBottom:"blue solid 2px"}}></input>
                <label>Date</label>
                <input type="text" onChange={(e)=>setDate(e.target.value)} placeholder='xx/mm/yyyy'></input>
                <label>Time</label>
                <div style={{display:"flex",flexWrap:"wrap",marginTop:"10px",marginBottom:"14px"}}>
                <button type ="button" id="05am09pmBtn"  className="TimeButtons" onClick={(e)=>{e.preventDefault();UpdateTime("05am09pm")}}>5am-9am</button>
                <button type ="button" id= "09am12pmBtn" className="TimeButtons" onClick={(e)=>{e.preventDefault();UpdateTime("09am12pm")}}>9am-12pm</button>
                <button type ="button" id= "12pm03pmBtn" className="TimeButtons" onClick={(e)=>{e.preventDefault();UpdateTime("12pm03pm")}}>12pm-3pm</button>
                <button type ="button" id="03pm06pmBtn"  className="TimeButtons" onClick={(e)=>{e.preventDefault();UpdateTime("03pm06pm")}}>3pm-6pm</button>
                <button type ="button" id="06pm09pmBtn"  className="TimeButtons" onClick={(e)=>{e.preventDefault();UpdateTime("06pm09pm")}}>6am-9pm</button>
                </div>
                <div style={{display:"flex",flexDirection:"row"}}>
                <button type='submit' id="CardSubmitBtn" style={{visibility:"hidden"}} onClick={()=>{setResultArea(()=>"ShowRides");setFetchRides(true);}}>Submit</button>
                <h5 id="next" onClick={()=>setResultArea("AboutRide")} >Next{">>>"}</h5>
                </div>
            </form>
            
        </div>
        </div>
        </div>
        <div id="Result" style={{width:"60%",paddingLeft:"30px"}}>
            <Result/>
        
        </div>
        </div>
        </div>
    </>
}
export default BookCard;