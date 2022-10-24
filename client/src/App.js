import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import "./App.css"
import Explorer from './views/Explorer/Explorer'
import Upload from './views/Upload/Upload'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explorer />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
