import './App.css'
import React,{useState, useEffect} from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from './Components/Sidebar'
import Mainbar from './Components/Mainbar'
import Image from './assets/image1.png'
import Lock from './assets/lock.png'


function App() {
  const [data, setData] = useState({})
  const [sideHead, setSidehead] = useState([])
  const [folders, setFolders] = useState([])
  const [activate, setActivate] = useState(false)
  const [create, setCreate] = useState(false)
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
     window.addEventListener("resize", handleResizeWindow);
     return () => {
       window.removeEventListener("resize", handleResizeWindow);
     };
   }, []);
  
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(data))
  }, [data])
  const active = data[activate]

  
  if(width<768){
    return (
      <Router>
        <div className='App' style={{backgroundColor: `${create ? '#2F2F2FBF' : '#FFFFFF'}`}}>
          <Routes>
            <Route path='/' element={<div className='App-side'><Sidebar width={width} folders={folders} setFolders={setFolders} create={create} setCreate={setCreate} data={data} sideHead={sideHead} setSidehead={setSidehead} setData={setData} activate={activate} setActivate={setActivate} active={active} /></div>}></Route>
            <Route path='/main' element={<div className='App-main1' style={{display: 'block'}}>
                <Mainbar setActivate={setActivate} width={width} setData={setData} active={active} />
              </div>}></Route>
          </Routes>
        </div>
      </Router>
    )
  }

  if(width>=768){
  return (
    <Router>
        <Routes>
          <Route path='/' element={
            <div className='App' style={{backgroundColor: `${create ? '#2F2F2FBF' : '#FFFFFF'}`}}>
              <div className='App-side'>
                <Sidebar width={width} folders={folders} setFolders={setFolders} create={create} setCreate={setCreate} data={data} sideHead={sideHead} setSidehead={setSidehead} setData={setData} activate={activate} setActivate={setActivate} active={active} />
              </div>
              <div className='App-main' style={{opacity: `${create ? '50%' : '100%'}`}}>
                {!activate ? <div className='main-content'>
                <img src={Image} alt='image' className='main-image'></img>
                <p className='head'>Pocket Notes</p>
                <p className='main-para'>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
                <p className='main-footer'><img src={Lock} alt='lock' width='15px' height='15px' className='main-lock'></img>end-to-end encrypted</p>
                </div> : <Mainbar width={width} setData={setData} active={active} />}
                </div>
              </div>}>
          </Route>
        </Routes>
    </Router>
  )}
}

export default App

