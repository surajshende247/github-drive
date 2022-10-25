import React, {useState, useEffect} from 'react'
import axios from "axios"

import "./Explorer.css"

function Explorer() {
  const [files, setFiles] = useState([]);
  useEffect(()=>{
    async function getData(){
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
            <div key={index}>
              <img src={file.download_url}  style={{height: "100px"}}/>
            </div>
          )
        })
      }
    </div>
  )
}

export default Explorer
