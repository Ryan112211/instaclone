
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import { auth, db } from './firebase';
import ImageUpload from './ImageUpload';
import Posts from './Posts';
import InstagramEmbed from 'react-instagram-embed';


  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
function App() {
const [posts,setposts]=useState([]);
const [username,setusername]=useState("");
const [password,setpassword]=useState("");
const [email,setEmail]=useState("");
const[user,setuser]=useState(null)
const classes=useStyles();
const [modalStyle] = useState(getModalStyle);
const [open,setopen]=useState(false);
const [opensignin,setopensignin]=useState(false);

useEffect(()=>{
const unsubscribe=auth.onAuthStateChanged((authUser)=>{
  if(authUser)
  {
console.log(authUser)
setuser(authUser)

  }
  else{
setuser(null);
  }
})
return ()=>{
  unsubscribe();
}
},[user,username])
  
  useEffect(()=>{
    db.collection("posts").orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setposts(snapshot.docs.map(doc=>({
        
        id:doc.id,
        post:
        doc.data()
      })))
    })
  },[])
  const signup=(event)=>{
    event.preventDefault();
auth.createUserWithEmailAndPassword(email,password)
.then((authUser)=>{
  return authUser.user.updateProfile({
    displayName:username
  })
})
.catch((error)=>alert(error.message))
setopen(false);
  }
const signin=(event)=>{
event.preventDefault();
auth.signInWithEmailAndPassword(email,password)
.catch((error=>alert(error.message)))
setopensignin(false);
}
  return (
    <div className="app">
     

<Modal
        open={open}
        onClose={()=>setopen(false)}
      
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
          <center>
          <img className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""></img>
             </center>
        <Input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e)=>setusername(e.target.value)}

        
        
        >
        </Input>
        <Input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}

        
        
        >
        </Input>
        <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e)=>setpassword(e.target.value)}

        
        
        >
        </Input>
        <Button type="submit" onClick={signup}>Sign Up</Button>
     
          </form>
        
        </div>
</Modal>
<Modal
        open={opensignin}
        onClose={()=>setopensignin(false)}
      
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
          <center>
          <img className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""></img>
             </center>

       
        <Input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}

        
        
        >
        </Input>
        <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e)=>setpassword(e.target.value)}

        
        
        >
        </Input>
        <Button type="submit"onClick={signin}>Sign In</Button>
     
          </form>
        
        </div>
</Modal>
     <div className="app__header">
     <img className="app__headerImage"
     src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
     >
       
     </img>
     {user?(<Button onClick={()=>auth.signOut()}>Logout</Button>):
    <div className="app__loginContainer">
    <Button onClick={()=>setopensignin(true)}>Sign In</Button>
    <Button onClick={()=>setopen(true)}>Sign up</Button>
    </div>
    }
    </div>
    
    
     {
      user?.displayName?(
        <ImageUpload username={user.displayName}></ImageUpload>
       ) :(
        <h3>Sorry You need to Login</h3>

       )  
    }
    
    <div className="app__posts">
    {
      posts.map(({id,post})=>(
        <Posts key={id} user={user} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}></Posts>
      ))
    }
    </div>
  <InstagramEmbed
  url='https://instagr.am/p/Zw9o4/'
  
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>
   
    
    
    
    
    
    </div>
  );
}

export default App;
