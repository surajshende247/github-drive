import React, { useState, useEffect } from 'react'
import axios from "axios"

import "./Explorer.css"
import FilePreview from '../../components/FilePreview/FilePreview';

function Explorer() {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await axios.post('/contents')
      setFiles(response.data)
      console.log(response.data)
    }
    getData()
  }, [])

  return (
    <div>
      <h1>Explorer</h1>
      <div className="container">
        <div className="row">
          {
            files.map((file, index) => {
              return (
                <div className="col" key={index} >
                  <FilePreview file={file} />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Explorer
