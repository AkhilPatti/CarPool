import React, { PureComponent } from "react";

function DailogueBox(props)
{
    function ConfirmRide(response)
{
 props.SendResponse(response);
}
console.log("hell");
    return (
        <div style={{backgroundColor:"orange",width:"100vw",height:"100vh"}}>
        <div className="DailogueBoxbg" style={{backgroundColor:"beige"}}>
        <div className="ModalContainer" style={{backgroundColor:"rgba(29, 27, 27, 0)"}}>
        <div className="title" style={{backgroundColor:"rgba(29, 27, 27, 0)"}}>
        <h1 style={{color:"orange"}}>Ya ...</h1>
        </div>
        <div className="DialogueBody">
        <h3>Do you want to book a ride Offered by {props.name}</h3>
        </div>
        <div className="DialgueFooter">
            <button onClick={()=>ConfirmRide(false)} id="NoDialogue">No</button>
            <button onClick={()=>ConfirmRide(true)} id="YesDialogue">Yes</button>
        </div>
        </div>
        </div>
        </div>
        );
}
export default DailogueBox;