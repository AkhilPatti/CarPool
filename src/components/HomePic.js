import './HomePic.css';

function HomePic()
{
    return<>
        <div id="mainPicture" >
        <img class="CoverImage" src={require("../Data/logo.png")} style={{height:"90px",width:"90px"}} />
            <i className='caption' style={{marginBottom:"0px"}}>TURN <span style={{color:"orange"}}>MILES</span></i>
            <i className='caption' style={{marginTop:"-50px",marginBottom:"0px"}}>INTO <span style={{color:"purple"}}>MONEY</span></i>
            <p id="underCaption"style={{fontSize:"50px",fontWeight:"750",marginTop:"-10px",marginBottom:"0px",letterSpacing:"20px"}}>RIDES ON TAP</p>
        </div>
    </>
}
export  default HomePic;