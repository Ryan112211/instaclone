import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import firebase from "firebase"
import { db,storage} from './firebase';
import './imageupload.css'
function ImageUpload({username}) {
useEffect(()=>{
        firebase.appCheck().activate();
      },[])
const [caption,setcaption]=useState("")

const [progress,setprogress]=useState(0);
const [image,setimage]=useState(null);
const handleChange=(e)=>{
    if(e.target.files[0]){
        setimage(e.target.files[0])
    }
}
const handleupload=()=>{
   
const uploadtask=storage.ref(`images/${image.name}`).put(image);
uploadtask.on(
    "state_changed",
    (snapshot)=>{
        const progress=Math.round(
            (snapshot.bytesTransferred/snapshot.totalBytes)*100
        )
        setprogress(progress)
    },
    (error)=>{
        console.log(error)
        alert(error.message)
    },
    ()=>{
        storage.ref("images")
        .child(image.name)
        .getDownloadURL().then(url=>{
            db.collection("posts").add({
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                caption:caption,
                imageUrl:url,
                username:username

            })
            setprogress(0);
            setcaption("");
            setimage(null);
        })
    }
)
}
    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100"></progress>
        <input type="text" placeholder="Enter Caption" onChange={event=>setcaption(event.target.value)} value={caption}></input> 
        <input type="file" onChange={handleChange}></input>
        <Button className="imageupload__button" onClick={handleupload}>Upload</Button> 
        </div>
    )
}

export default ImageUpload
