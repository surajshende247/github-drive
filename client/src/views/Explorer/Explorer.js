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
      {
        files.map((file, index) => {
          return (
            <FilePreview key={index} file={file} />
          )
        })
      }
    </div>
  )
}

export default Explorer
