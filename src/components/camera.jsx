import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: '100%',
    facingMode: 'environment'
};

const Camera = ()=>{
    const webcamRef = useRef(null);
    const [url, setUrl] = useState(null);

    const takePhoto = useCallback(async () =>{
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        setUrl(imageSrc);
    }, [webcamRef]);

    // const onUserMedia = (e) =>{
    //     console.log(e);
    // }

    return(
        <div className="WebCam-Container p-3 h-4/5">
            <Webcam
                style={{borderRadius: "30px"}}
                width={"100%"}
                //height={"80%"}
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                // onUserMedia={onUserMedia}
                videoConstraints={videoConstraints}
            />

            <div className="flex justify-center">
                <button 
                className="Capture-Photo-Btn m-auto border-spacing-1 border-x-black" 
                style={{borderRadius: "100%", width: "60px", height: "60px"}}
                onClick={takePhoto}></button>
            </div>
            
        </div>
        // <div className="WebCam">
        //     <video src="" ref={'videoRef'}></video>
        //     <button className="bg-slate-300 border-spacing-1 border-x-black" id="click-photo" style={{borderRadius: "100%", width: "60px", height: "60px"}} ></button>
        //     <canvas ref={'photoRef'}></canvas> 
        // </div>
    );
}

export default Camera;