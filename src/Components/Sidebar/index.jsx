import React, {useState} from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

function Sidebar({width, folders, setFolders, create, setCreate, data, sideHead, setSidehead, setData, activate, setActivate, active}) {

  const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF']
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [color, setColor] = useState('')
  const handleColor = (col) => {
    setColor(col)
  }
    const handleSubmit = () => {
      const newNotes = {
        id: Date.now(),
        title: title,
        color: color,
      }
      
      if (title) {
        setFolders([...folders, title]);
        setData({ ...data, [title]: [{id: Date.now(), title: title, color: color, text: '', lastUpdated: ''}] });
      }

      localStorage.setItem("notesData", JSON.stringify(newNotes))
      const sideTitle = JSON.parse(localStorage.getItem("notesData"))
      if(sideTitle){
        setSidehead([sideTitle, ...sideHead])
        setCreate(false)
      }
    } 
    if(width<768 && activate){
      navigate('/main')
    }

  return (
    <div className='side-container'>
      <h1 className='side-head'>Pocket Notes</h1>
      <div className='create-btn'>
        <button className='create-head' onClick={() => setCreate(!create)}><span className='plus'>+</span>Create Notes group</button>
        {sideHead.map((each, index) => {
          if(width<768){
            return (
              <ul className='side-list' style={{opacity: `${create ? '25%' : '100%'}`}} key={index}>
                <div className='list-container' onClick={() => setActivate(each.title)}>
                  <div style={{backgroundColor: each.color, borderRadius: '100%'}} className='list-icon-div'><span className='list-icon'>{each.title.split(" ").length>1 ? each.title.split(" ")[0][0].toUpperCase() + each.title.split(" ")[1][0].toUpperCase() : each.title.split(" ")[0][0].toUpperCase() + 'G'}<p className='list-title'>{each.title}</p></span></div>
                </div>
              </ul>
            )
          }
          return (
            <ul className='side-list' style={{backgroundColor: `${activate && each.title === activate ? '#F7ECDC' : 'white'}`, opacity: `${create ? '5%' : '100%'}`}} key={index}>
              <div className='list-container' onClick={() => setActivate(each.title)}>
                <div style={{backgroundColor: each.color, borderRadius: '100%'}} className='list-icon-div'><span className='list-icon'>{each.title.split(" ").length>1 ? each.title.split(" ")[0][0].toUpperCase() + each.title.split(" ")[1][0].toUpperCase() : each.title.split(" ")[0][0].toUpperCase() + 'G'}<p className='list-title'>{each.title}</p></span></div>
              </div>
            </ul>
          )
        })}
        {create && <div className='newcreate-container'>
            <p className='newcreate-head'>Create New Notes group</p>
            <label className='input-label' htmlFor='create'>Group Name</label>
            <input type='text' id='create' name='create' onInput={(e) => setTitle(e.target.value)} placeholder='Enter your group name....'></input>
            <div className='color-div' style={{display: 'flex', flexDirection: 'row', gap: '1vw'}}>
              <p className='color-para'>Choose colour</p>
              {colors.map((eachColor, index) => <div className='color-each' key={index} onClick={() => handleColor(eachColor)} style={{backgroundColor: eachColor, width: '30px' , height: '30px', borderRadius: '50%', cursor: 'pointer'}}></div>)}
            </div>
            <button className='color-submit' style={{cursor: 'pointer'}} onClick={handleSubmit}>Create</button>
          </div>}
      </div>
    </div>
  )
}

export default Sidebar
