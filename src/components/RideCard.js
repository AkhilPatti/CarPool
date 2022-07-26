import React,{useState} from 'react';
import "./RideCard.css";
import { GeoAltFill,CircleFill } from 'react-bootstrap-icons';
/*import ReactDOM from 'react-dom/client';*/
class RideCard extends React.Component
{   
    constructor(props)
    {
        super(props);
        this.state={
            name:props.name,
            pickupPoint:props.pickupPoint,
            date:props.date,
            price:props.price,
            destination:props.destination,
            time:props.time,
            noOfSeats: props.noOfSeats,
            ride:props.ride,
            click:false
        };
    }
    CaptureCard=(ride)=>
    {
        this.props.SendConfirmRide(this.state.ride);
        this.state.click=true;
    }

    render()
    { 
        if(this.state==true)
        {return;}
        return(
        <div onClick={()=>{this.CaptureCard(this.state.ride)}} style={{ paddingLeft:"20px",paddingRight:"10px",borderStyle:"solid",borderBottomWidth:"1.2px",borderWidth:"1px" ,borderRadius:"7px",borderColor:"silver", marginRight:"40px",cursor:"pointer"}}>
        <div style={{display: "flex",flexDirection:"column"}}>
        <div id="NameAndImage">
            <p style={{fontSize:"20px",fontWeight:"500"}}>{this.state.name}</p>
        </div>
        <div style={{display:"flex",flexDirection:"row"}}>
            <div>
                <p className='SideHeadings'>From</p>
                <p className='RideCardInputItems'>{this.state.pickupPoint}</p>
                <p className='SideHeadings'>Date</p>
                <p className='RideCardInputItems'>{this.state.date}</p>
                <p className='SideHeadings'>Price</p>
                <p className='RideCardInputItems'>${this.state.price}</p>
            </div>
            <CircleFill style={{height:"10px",color:"purple"}}/>
            <CircleFill style={{ height:"7px",color:"silver"}}/>
            <CircleFill style={{ height:"7px",color:"silver"}}/>
            <CircleFill style={{ height:"7px",color:"silver"}}/>
            <CircleFill style={{ height:"7px",color:"silver"}}/>
            <GeoAltFill style ={{height:"15px", color:"purple"}}/>
            <div>
                <p className='SideHeadings'>To</p>
                <p className='RideCardInputItems'>{this.state.destination}</p>
                <p className='SideHeadings'>Time</p>
                <p className='RideCardInputItems'>{this.state.time}</p>
                <p className='SideHeadings'>Seat Availability</p>
                <p className='RideCardInputItems'>{this.state.noOfSeats}</p>
            </div>
                </div>
                </div> 
            </div>)
    }
}
export default RideCard;