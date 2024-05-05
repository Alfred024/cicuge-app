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
        sendImageToProdict(imageSrc);
    }, [webcamRef]);

    function sendImageToProdict(imageDataUrl) {
        const file = base64StringtoFile(imageDataUrl, 'demo.png');
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:3001/predict', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to process image');
            }
        }).then(data => {
            console.log(data);
            console.log('Image processed successfully');
        }).catch(error => {
            console.error('Error processing image:', error);
        });
    }

    // function convertBase64_to_formData(base64Url) {
    //     return fetch(base64Url)
    //       .then(response => response.blob())
    //       .then(blob => {
    //         const formData = new FormData();
    //         formData.append('file', blob, 'filename'); // 'filename' is the name of the file
    //         return formData;
    //       })
    //       .catch(error => {
    //         console.error('There was an error converting base64 to FormData:', error);
    //       });
    // }

    function base64StringtoFile(base64String, filename) {
        const base64Image = base64String.split(';base64,').pop();
        const byteCharacters = atob(base64Image);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
        return new File([blob], filename, { type: 'application/octet-stream' });
    }
    
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