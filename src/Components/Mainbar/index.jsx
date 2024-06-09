import React,{useState} from 'react'
import './index.css'
import { format } from 'date-fns'
import Arrow from '../../assets/arrow.png'
import BlueArrow from '../../assets/blue_arrow.png'
import Back from '../../assets/back.png'
import { useNavigate } from 'react-router-dom'

function Mainbar({setActivate, width, setData, active}) {

  const [newNote, setNewNote] = useState('')
  const navigate = useNavigate()
  const addNote = () => {
    if (newNote.trim() === '') return;

    setData(prevNotes => ({
      ...prevNotes,
      [active[0].title]: [...prevNotes[active[0].title], { text: newNote, id: Date.now(), lastUpdated: new Date() }]
    }));
    setNewNote('');
  };

  const handleKeyDown = (e) => {
    if(e.key == 'Enter'){
      e.preventDefault();
      addNote();
    }
  }

  const handleSidebar = () => {
    setActivate(false)
    navigate('/')
  }

  if(width<768) {
    return(
      <div className='main-container1'>
      <div className='main-head1'>
        <img className='main-back' src={Back} alt='back-img' onClick={handleSidebar}></img>
        <div className='main-icon1' style={{backgroundColor: active[0].color, borderRadius: '100%'}}><span className='main-icon-para1'>{active[0].title.split(" ").length>1 ? active[0].title.split(" ")[0][0].toUpperCase() + active[0].title.split(" ")[1][0].toUpperCase() : active[0].title.split(" ")[0][0].toUpperCase() + 'G'}</span></div>
        <p className='main-title1'>{active[0].title}</p>
      </div>
      <div className='main-list1' style={{display: 'flex', flexDirection: 'column', gap: '0vh'}}>
        {active.map((note, index) => {
          return (note.text && <div key={index} style={{display: 'flex', flexDirection: 'row', gap: '10vw'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <p className='main-date11'>{format(note.lastUpdated, 'hh:mm a')}</p>
              <p className='main-date21'>{format(note.lastUpdated, 'd')} {format(note.lastUpdated, 'MMMM')} {format(note.lastUpdated, 'yyyy')}</p>
            </div>
            <div className='main-text1'>{note.text}</div>
          </div>)
        })} 
      </div>
      <div className='main-textarea1'>
        <div className='main-input1'>
          <input type='text' className='main-area1' id='body' placeholder='Enter your text here...........' value={newNote} onKeyDown={handleKeyDown} onChange={(e) => setNewNote(e.target.value)}></input>
          <img className='arrow1' src={`${newNote ? BlueArrow : Arrow}`} alt='arrow' width='20px' height='20px' onClick={addNote}></img>
        </div>
      </div>
    </div>
    )
  }
  
  if(width>=768){
  return (
    <div className='main-container'>
      <div className='main-head'>
        <div className='main-icon' style={{backgroundColor: active[0].color, borderRadius: '100%'}}><span className='main-icon-para'>{active[0].title.split(" ").length>1 ? active[0].title.split(" ")[0][0].toUpperCase() + active[0].title.split(" ")[1][0].toUpperCase() : active[0].title.split(" ")[0][0].toUpperCase() + 'G'}</span></div>
        <p className='main-title'>{active[0].title}</p>
      </div>
      <div className='main-list' style={{display: 'flex', flexDirection: 'column', gap: '7vh'}}>
        {active.map((note, index) => {
          return (note.text && <div key={index} style={{display: 'flex', flexDirection: 'row', gap: '2vw'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <p className='main-date1'>{format(note.lastUpdated, 'hh:mm a')}</p>
              <p className='main-date2'>{format(note.lastUpdated, 'd')} {format(note.lastUpdated, 'MMMM')} {format(note.lastUpdated, 'yyyy')}</p>
            </div>
            <div className='main-text'>{note.text}</div>
          </div>)
        })} 
      </div>
      <div className='main-textarea'>
        <div className='main-input'>
          <input type='text' className='main-area' id='body' placeholder='Enter your text here...........' value={newNote} onKeyDown={handleKeyDown} onChange={(e) => setNewNote(e.target.value)}></input>
          <img className='arrow' src={`${newNote ? BlueArrow : Arrow}`} alt='arrow' width='20px' height='20px' onClick={addNote}></img>
        </div>
      </div>
    </div>
  )}
}


export default Mainbar
