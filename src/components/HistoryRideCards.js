import React,{useState} from 'react';
import "./RideCard.css";
import { GeoAltFill,CircleFill } from 'react-bootstrap-icons';
/*import ReactDOM from 'react-dom/client';*/
class Historycards extends React.Component
{   
    constructor(props)
    {
        console.log("afnd");
        console.log(props);
        super(props);
        this.state={
            name:props.name,
            pickupPoint:props.pickupPoint,
            date:props.date,
            price:props.price,
            destination:props.destination,
            time:props.time,
        }
    }

    render()
    { 
        return(
        <div onClick={()=>{this.CaptureCard(this.state.ride)}} style={{ paddingLeft:"20px", marginTop:"21px",color:"black", paddingRight:"10px",borderStyle:"solid",borderBottomWidth:"1.2px",borderWidth:"1px" ,borderRadius:"7px",borderColor:"silver", marginRight:"40px",cursor:"pointer"}}>
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
            </div>
                </div>
                </div> 
            </div>)
    }
}
export default Historycards;