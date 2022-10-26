import React, { useState } from 'react';
import axios from 'axios';

import './Upload.css';
import IcoUpload from './../../assets/ico-upload-cloud.svg'
import {convertBase64} from './../../util/convertBase64'

function App() {
  const [fileContent, setFileContent] = useState(null);
  const [fileName, setFileName] = useState(null);

  const [fileSelected, setFileSelected] = useState(false);

  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    const splitBase64 = base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    setFileName(encodeURIComponent(file.name));
    setFileContent(splitBase64)
    setFileSelected(true);
  }

  const sendContent = async () => {
    const response = await axios.post('/upload', {
      fileName: fileName,
      content: fileContent,
    })
    console.log(response.data)
  }

  return (
    <div>
      <form>
        <div className="file-upload-container">
          <div className={`file-choose-button ${fileSelected ? 'file-choose-button-selected' : ''}`}>
            <label htmlFor="file">
              <input type="file" name="file" id="file"
                onChange={e => handleFileRead(e)}
                style={{ "display": "none" }}
              />
              <img src={IcoUpload} alt="" />
            </label>
          </div>
          <button type="button" className='file-upload-button' onClick={sendContent}>Upload</button>
        </div>
      </form>
    </div>
  );
}

export default App;
