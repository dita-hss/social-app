import React, { useState, useRef } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import logo from '../assets/logo1.png';
import instaVideo from '../assets/share.mp4';
import brunoVideo from '../assets/bruno.mp4';
import brunoVideo2 from '../assets/bruno2.mp4';
import brunoVideo3 from '../assets/bruno3.mp4';
import './Login.css' ;
import jwt_decode from "jwt-decode";



import { client } from '../client'



export const Login = () => {
  
  const navigate = useNavigate();
  const handleLogin = (credentialResponse) => {
    console.log("this is the credential response:", credentialResponse);
    const obj = jwt_decode(credentialResponse.credential);
    console.log("this is the obj:", obj);
    localStorage.setItem('user', JSON.stringify(obj));
    console.log("this is the storage: from login" , localStorage)


    const { aud, name, picture } = obj;
    
    const doc = {
      _id: aud,
      _type: 'user',
      userName: name,
      image: picture,
    };

    console.log("this is the doc:", doc);


    client.createIfNotExists(doc).then(() => {      
      navigate('/', { replace: true });
    });
    
  }

  
  const videos = [brunoVideo, brunoVideo2, brunoVideo3, instaVideo];
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isFading, setIsFading] = useState(false); 

  const handleVideoEnd = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentVideo((currentVideo + 1) % videos.length);
      setIsFading(false);
    }, 100); 
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video 
          src={videos[currentVideo]}
          type="video/mp4"
          loop={false}
          controls={false}
          muted
          autoPlay={true}
          onEnded={handleVideoEnd}
          className={`w-full h-full object-cover ${isFading ? 'fade-out' : 'fade-in'}`} 
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width = "300px" alt="logo"/>
          </div>

          <div className='shadow-2xl' style={{ marginTop: '-80px' }}>
            
            <GoogleLogin 
              onSuccess={handleLogin}
              onError = {() => console.log("Error")}
              cookiePolicy="single_host_origin"

            />
            
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Login;