import react from "react";
import context from "./Context";
import { useState } from "react";
const Notestate=(props)=>
    {const [email,setEmail]=useState(undefined);
    const [name,setName]=useState(undefined);
    const UpdateEmail=(email)=>
    {
        setEmail(()=>localStorage.getItem('EmailId'))
    }
    function UpdateName(name)
    {
        setName(()=>localStorage.getItem('Name'))
    }
    return <context.Provider value={{email,name, UpdateEmail,UpdateName}}>
        {props.children}
    </context.Provider>
    }
export default Notestate;