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
        <div className="WebCam-Container relative">
            <Webcam
                width={"100%"}
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                // onUserMedia={onUserMedia}
                videoConstraints={videoConstraints}
            />

            <button 
                className="bg-slate-300 border-spacing-1 border-x-black absolute top-0" 
                style={{borderRadius: "100%", width: "60px", height: "60px"}}
                onClick={takePhoto}></button>
            
        </div>
        // <div className="WebCam">
        //     <video src="" ref={'videoRef'}></video>
        //     <button className="bg-slate-300 border-spacing-1 border-x-black" id="click-photo" style={{borderRadius: "100%", width: "60px", height: "60px"}} ></button>
        //     <canvas ref={'photoRef'}></canvas> 
        // </div>
    );
}

export default Camera;