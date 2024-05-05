import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: '100%',
    facingMode: 'environment'
};

const Camera = ()=>{
    const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
      setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file){
        return;
    }
    // console.log('FILE');
    // console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    //console.log(formData);
    fetch('http://localhost:3001/predict', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log(data);
      // Handle response from the server if needed
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Camera;