import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: '100%',
    facingMode: 'environment'
};

const Camera = ({setShowVideo})=>{
    const webcamRef = useRef(null);
    const [url, setUrl] = useState(null);
    const [response, setResponse] = useState(null);

    const takePhoto = useCallback(async () =>{
        const imageSrc = webcamRef.current.getScreenshot();
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
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to process image');
            }
        }).then(data => {
            setResponse(data.prediction);
            // console.log(data.prediction);
        }).catch(error => {
            console.error('Error processing image:', error);
        });
    }

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
        !response ? (
        <div className="WebCam-Container p-3 h-4/5">
            <Webcam
                style={{borderRadius: "30px"}}
                width={"100%"}
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                videoConstraints={videoConstraints}
            />

            <div className="flex justify-center">
                <button 
                className="Capture-Photo-Btn m-auto border-spacing-1 border-x-black" 
                style={{borderRadius: "100%", width: "60px", height: "60px"}}
                onClick={takePhoto}></button>
            </div>
            
        </div>) 
        :
        ( 
            response === 'Ready' ?
            (<div className="relative m-auto w-3/4 min-h-48 p-3 rounded-2xl bg-green-800 text-white flex flex-col justify-center">
                <img className="m-auto" width={70} height={70} src="/img/leaf.svg" alt="Leaf icon"/>
                <h1 className="font-bold text-center">¡Genial!</h1>
                <p className="text-center my-1"> El cultivo está listo para su consumo.</p>

                <button className="mt-2 p-1 w-1/2 m-auto rounded-md font-bold bg-white text-green-950" onClick={() => setShowVideo(false)}>Continuar</button>
            </div> )
                :
            (<div className="relative m-auto w-3/4 p-3 rounded-2xl bg-orange-500 text-white flex flex-col justify-center">
                <img className="m-auto" width={70} height={70} src="/img/warning.png" alt="Warning icon"/>
                <h1 className="font-bold text-center">¡Cuidado!</h1>
                <p className="text-center my-1"> El cultivo aún no está listo para su consumo. Déjalo unos días en la cámara y prueba después.</p>

                <button className="mt-2 p-1 w-1/2 m-auto rounded-md font-bold bg-white text-amber-700" onClick={() => setShowVideo(false)}>Continuar</button>
            </div>)
        )
        
    );
}

export default Camera;