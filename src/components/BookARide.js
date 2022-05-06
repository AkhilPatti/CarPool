import React from 'react';
import "./BookARide.css";
function BookCard()
{
    return<>
    <body>
        <div style={{border:"solid 1px", borderColor:"silver",borderRadius:"5px" ,display:"flex",flexDirection:"column",width:"300px",paddingBottom:"30px",paddingRight:"30px",paddingLeft:"20px"}}>
        <div style={{display:"flex", flexDirection:"row", marginBottom:"0px"}}>
            <h2 style={{width:"fitContent",height:"fitContent", marginBottom:"0px"}}>Book a  Ride</h2>
            <label className="toggle" style={{alignSelf:"center"}}>
                <span class="onoff">OFF
                </span>
                <input type="checkbox"/>
                <span class="slider"></span>
            </label>
            </div>
            <p style={{marginTop:"2px"}} id="tagLine">we get you the matches asap !</p>
            <form style={{display:"flex",flexDirection:"column",marginTop:"15px"}}>
                <label>
                    From
                </label>
                <input type="text" style={{borderBottom:"silver solid 2px"}}>
                </input>
                <label>To</label>
                <input type="text"  style={{borderBottom:"blue solid 2px"}}></input>
                <label>Date</label>
                <input type="text" placeholder='xx/mm/yyyy'></input>
                <label>Time</label>
                <div style={{display:"flex",flexWrap:"wrap",marginTop:"10px",marginBottom:"14px"}}>
                <button className="TimeButtons">5am-9am</button>
                <button className="TimeButtons">9am-12pm</button>
                <button className="TimeButtons">12pm-3pm</button>
                <button className="TimeButtons">3pm-6pm</button>
                <button className="TimeButtons">6am-9pm</button>
                </div>
                <button type='submit' style={{color:"white",backgroundColor:"orange",width:"100px",borderColor:"green"}}>Submit</button>
            </form>
            
        </div>
        </body>
    </>
}
export default BookCard;