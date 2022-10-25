import React from 'react'
import axios from 'axios'

import "./FilePreview.css"
import IcoPdf from "./img/ico-pdf.png"
import IcoImg from "./img/ico-img.png"
import IcoExcel from "./img/ico-excel.png"

const FILE_TYPE_ICON = {
  pdf: IcoPdf,
  png: IcoImg,
  jpg: IcoImg,
  jpeg: IcoImg,
  gif: IcoImg,
  csv: IcoExcel,
}

const getPreviewUrl = (fileType, download_url) => {
  if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'gif') {
    return download_url
  }
  return FILE_TYPE_ICON[fileType]
}
const deleteFile = async (fileName, sha) => {
  const response = await axios.post('/delete', { fileName: encodeURIComponent(fileName), sha })
  if (response.data) {
    window.location.reload()
  }
}

function FilePreview(props) {
  const { download_url, name, sha } = props.file
  const fileType = name.split('.').pop()
  const previewUrl = getPreviewUrl(fileType, download_url)
  return (
    <div className='file-preview-container'>
      <img src={previewUrl} className="file-preview-img" alt="" />
      <div className='file-preview-footer'>
        <img src={FILE_TYPE_ICON[fileType]} alt="" className='file-preview-ico' />
        <a href={download_url} className='file-preview-footer-link' target="_blank" rel="noreferrer" download>{name}</a>
      </div>
      <span className='file-preview-delete' onClick={() => { deleteFile(name, sha) }}>🗑</span>
    </div>
  )
}

export default FilePreview
