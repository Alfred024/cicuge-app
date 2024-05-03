'use client'
import Image from "next/image";
import { Inter } from "next/font/google";
import {useState, useEffect} from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [showVideo, setShowVideo] = useState(false);
  // useEffect(()=>{
  //   if(showVideo){
      
  //   }
  // }, [showVideo]);
    
  function openCamera(){
    // navigator.mediaDevices.getUserMedia({ video: true })
    //         .then(function(stream) {
    //             video.srcObject = stream;
    //             video.play();
    //         })
    //         .catch(function(error) {
    //             console.error('Error accessing the camera:', error);
    //         });
    //     // Esconde el botón para mostrar la cámara 
    // var openCameraBtn = document.getElementById('openCameraBtn');
    // openCameraBtn.style.display = "none";
        
    // var videoContainer = document.getElementById('videoContainer');
    // videoContainer.style.display = "block";
    // paintVideo();
  } 



  return (
    <main
      className={`bg-primary-green flex h-screen flex-col place-content-center ${inter.className}`}
    >
      {
        !showVideo ? (
          <div id="Take-Photo-Container" className="m-auto max-w-80 h-3/5 rounded-xl bg-white p-5 flex flex-col align-middle justify-between">
            <h2 className=" text-center">Toma foto de tu cultivo</h2>
            
            <div className="bg-light-gray flex flex-col place-content-center p-4 h-3/5 m-5">
              <button onClick={()=>{}}>
              <Image className="m-auto mb-5" src='/img/photo-camera.svg' width={40} height={40} alt="Tanque estacionario" />
              </button>
              <label className="text-center" htmlFor="">Presione el botón verde para analizar la foto</label>
            </div>

            <button onClick={()=>setShowVideo(true)} className="bg-secondary-green rounded-2xl p-2 text-white" type="submit">Analizar planta</button>
          </div>
        ) : (
          <div className="relative w-full h-4/5" style={{borderRadius: "30px"}}>
            {/* <button id="start-camera">Start Camera</button> */}
            <video className="Video-Container" id="video" width="100%" height="100%" autoPlay></video>
            <div className="flex mt-2 w-full place-content-center">
              <button className="bg-slate-100 border-spacing-1 border-x-black" id="click-photo" style={{borderRadius: "100%", width: "60px", height: "60px"}} ></button>
            </div>
            <canvas className="Canva-Container w-full absolute top-0" id="canvas"></canvas>
          </div>
        )
      }


    </main>
  );

} 
