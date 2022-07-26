import React, { useState,useEffect,useContext,useRef} from "react";
import context from "../context/Context";
import { useNavigate} from 'react-router-dom';
import Header from './Header.js';
//import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getStorage, uploadBytesResumable,getDownloadURL ,ref } from "firebase/storage";

function Profile()
{
    let navigate=useNavigate();
    if(localStorage.getItem("EmailId")==undefined)
        {
            navigate("/login");
        }
    const filePickerRef=useRef();
    const [file,setFile]=useState();
    const [user,setUser]=useState({});
    const contextApi=useContext(context);
    const[url,setUrl]=useState();
    const firebaseConfig = {
        apiKey: "AIzaSyDVbyOC5MEHL02d2_Bp-H_mAM4MPKcuan0",
        authDomain: "car-pool-e077d.firebaseapp.com",
        databaseURL: "https://car-pool-e077d-default-rtdb.firebaseio.com",
        projectId: "car-pool-e077d",
        storageBucket: "car-pool-e077d.appspot.com",
        messagingSenderId: "8062308262",
        appId: "1:8062308262:web:01ccdeb5a1a77964e14967",
        measurementId: "G-SJVQ311WBS"
      };
      const app=initializeApp(firebaseConfig);
      const storage= getStorage(app);
      const getImageUrl=()=>
      {
        const starsRef = ref(storage, 'images/'+localStorage.getItem('EmailId'));
        getDownloadURL(starsRef)
        .then((url) => {setUrl(url);})
        .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
      });
    }
    const handleChange=e=>
    {
        let pickedFile;
        if(e.target.files && e.target.files.length==1)
        {
            pickedFile=e.target.files[0];
            setFile(pickedFile);
        }
    };

    const handleUpload=(e)=>
    {
        e.preventDefault();
    const metadata = {
        contentType: 'image/jpeg'
      };
      
      // Upload file and metadata to the object 'images/mountains.jpg'
      console.log(localStorage.getItem("EmailId"));
      const storageRef = ref(storage, 'images/' + localStorage.getItem("EmailId"));
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      
      // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            // ...
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setUrl(downloadURL);
            localStorage.setItem("imgUrl",downloadURL);
            setFile(undefined);
          });
        }
      );
        
    };
    useEffect(()=>
    {
        fetch("http://localhost:36349/GetUserDetails?userId="+contextApi.email,{
             headers : { 
                   'Content-Type': 'application/json',
                   'Accept': 'application/json'
                  }})
                 .then(data => {return data.json()})
                 .then(post => {setUser(()=>post)})
                 setUrl("../Data/logo.png");
                 getImageUrl();
                },[]);
    /*useEffect(()=>
    {
        if(!file)
        {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload=()=>
        {
            setImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    },[file]);*/
    return <>
        <Header />
        <div style={{width:"40%", margin:"auto", border:"black solid 1px", borderRadius:"2px", padding:"2%"}}>
        <img src={url} style={{borderRadius:"50%",height:"100px",marginLeft:"40%",width:"150px"}}></img>
        <input  id="myProfilePhoto" type="file"  ref={filePickerRef} placeholder="Change Profile Picture" style={{marginLeft:"35%"}} accept=".jpg, .png, ,jpeg" onChange={handleChange}></input>
        
        <div>
            <p className="Headings">
                EmailID        :        <span style={{textDecorationLine:"underline"}}>{user['emailId']}</span>
            </p>
        </div>
        <div>
            <p className="Headings">
                Name        :        <span style={{textDecorationLine:"underline"}}>{user['name']}</span>
            </p>

        </div>
        <div >
            <p className="Headings">
            Phone Number :<span style={{textDecorationLine:"underline"}}>{user['phNo']}</span>
            </p>
        
        <button style={{marginLeft:"40%", color:"white", fontWeight:"bold" ,fontSize:"25px" ,backgroundColor:"blue",height:"45px",width:"125px",cursor:"pointer"}} onClick={handleUpload}>
            Save
        </button>
        </div>
        </div>
    </>
}
export default Profile;