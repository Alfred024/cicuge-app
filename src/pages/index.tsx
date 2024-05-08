'use client'
import Image from "next/image";
import Camera from "../components/camera"; 
import { Inter } from "next/font/google";
import { useState, useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // Show Webcam
  const [showVideo, setShowVideo] = useState(false);

  return (
    <main
      className={`bg-primary-green flex h-screen flex-col place-content-center ${inter.className}`}
    >
      
      {
        !showVideo ? (
          <>
            <section className="flex justify-end bg-secondary-green p-1" style={{borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"}}>
              {/* <h4 className="Page-Title text-white ml-2">App de análisis de cultivo</h4> */}
              <Image className="" width={70} height={70} src="/img/cicuge-white-logo.png" alt="CIGUGE logo"/>
            </section>

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
          </>
        ) : (
          <Camera setShowVideo={setShowVideo}/>
        )
      }
    </main>
  );
} 


