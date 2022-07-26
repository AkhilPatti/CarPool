import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getStorage, uploadBytesResumable,getDownloadURL ,ref } from "firebase/storage";
import "firebase/compat/storage";


export default function Appla() {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
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
  function handleChange(e) {
    if (e.target.files[0])
        setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const metadata = {
        contentType: 'image/jpeg'
      };
      
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, 'images/' + file.name);
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
            setURL(downloadURL);
          });
        }
      );
    /*const path = `/images/${file.name}`;
    const Iref = ref(storage, path);
    Iref.put(file);
    const url = Iref.getDownloadURL();
    setURL(url);
    setFile(null);*/
  }

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
        <button disabled={!file}>upload to firebase</button>
      </form>
      <img src={url} alt="" />
    </div>
  );}