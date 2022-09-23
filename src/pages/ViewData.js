import { AppBar, Dialog, IconButton, Toolbar} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Crudf from './crud-f'
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useLocation, useNavigate } from 'react-router-dom';
import {AiFillEdit} from 'react-icons/ai'
import {MdOutlineDoneAll} from 'react-icons/md'
import { color } from '@mui/system';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ViewEdit(){
  const navigate = useNavigate()
  const [openEdit, setOpenEdit] = React.useState(true);
  const location = useLocation()
  const [EditInput,setEditInput]=useState(false)
  const[user,setuser]=useState({Hobby:[]});
    const handleChange= (event)=>{
    const name = event.target.name;
    const value=event.target.value;
    const Check=event.target.checked;
    if(name==='Hobby'){
        if(Check){
            setuser({...user,Hobby:[...user.Hobby,value]
            })
        }
        else{
            const ucheck= user.Hobby.filter((i)=>i!==value)
            setuser({...user,
                Hobby : ucheck})
        }
    }
    else{
        setuser({...user,
                [name] : value
        });
    }
  }
  useEffect(()=>{
    const data=location.state;
    setuser(data)
  },[])
  const HandleTic=()=>{
    const id=user.id;
    axios.put(`http://localhost:4000/posts/${id}`,user)
    .then(()=>{toast("Data was Edited !!",{
        position:"top-center",
        autoClose: 1111
        })
    })
  }
  const ShowInput=(i)=>{
    setEditInput({ [i]:true})
  }
  const HideInput=(i)=>{
    setEditInput({[i]:false})
    HandleTic();
  }
  const handleCloseEdit = () => {
    setOpenEdit(false);
    navigate('/changes')  
  };
  function Male(){
    return(
      <>
      <input className='i-radio Hobby' type="radio" id="gender" name="gender" checked={user.gender==="Male"} value="Male" onChange={handleChange} />
      <label >Male</label><br/>
      
      </>
    )
  }
  function Female(){
    return(
      <>
      <input type="radio" className='i-radio Hobby' id="gender" name="gender" checked={user.gender==="Female"} value="Female" onChange={handleChange} />
      <label >Female</label><br/>
      
      </>
    )
  }
  function Other(){
    return(
      <>
        <input type="radio" className='i-radio Hobby' id="gender" name="gender" checked={user.gender==="Other"} value="Other" onChange={handleChange} />     
        <label >Other</label><br/>
      </>
    )
  }
  const Singing=()=>{
    return(
      <>
        <br/><label className='Hobby'>Singing:</label><input type="checkbox" name="Hobby" checked={user.Hobby?.includes('Singing')} onChange={handleChange} value="Singing" />
      </>
    )
  }
  const Traveling=()=>{
    return(
      <>
        <br/><label className='Hobby'>Traveling:</label><input type="checkbox" name="Hobby" checked={user.Hobby?.includes('Traveling')} onChange={handleChange} value="Traveling" />
      </>
    )
  }
  const Driving=()=>{
    return(
      <>
        <br/><label className='Hobby'>Driving:</label><input type="checkbox" name="Hobby" checked={user.Hobby?.includes('Driving')} onChange={handleChange} value="Driving" />
      </>
    )
  }
  return(
    <div className='Edit'>
      {console.log("object",EditInput.name)}
      {console.log(EditInput)}
      <form className='form' >
            <label >Name :  <span >{user.name}</span></label> {EditInput.name ? <MdOutlineDoneAll className='EditView' onClick={()=>{HideInput('name')}}/> :<AiFillEdit className='EditView' onClick={()=>{ShowInput('name')}}/>}
            {EditInput.name && <input className='i-name' type="text" name="name" value={user.name || ''}  onChange={handleChange} />} <br/>
            <label >E-mail : <span >{user.email}</span></label>{EditInput.email ? <MdOutlineDoneAll className='EditView' onClick={()=>{HideInput('email')}}/> :<AiFillEdit className='EditView' onClick={()=>{ShowInput('email')}}/>}
            {EditInput.email && <input className='i-name' type="email" name="email" value={user.email || ''}  onChange={handleChange} />}<br/> 
            <label >Number : <span >{user.number}</span></label>{EditInput.number ? <MdOutlineDoneAll className='EditView' onClick={()=>{HideInput('number')}}/> :<AiFillEdit className='EditView' onClick={()=>{ShowInput('number')}}/>}
            {EditInput.number && <input className='i-name' type="number" name="number" value={user.number || ''}  onChange={handleChange} />}<br/> 
            <label>Date :  <span >{user.date}</span></label>{EditInput.date ? <MdOutlineDoneAll className='EditView' onClick={()=>{HideInput('date')}}/> :<AiFillEdit className='EditView' onClick={()=>{ShowInput('date')}}/>}
            {EditInput.date && <input className='i-date'type="date" name="date" value={user.date || ''} placeholder="Date" onChange={handleChange} />}<br/>

            <label className='HB'>Gender : <span >{user.gender}</span></label>{EditInput.gender ? <MdOutlineDoneAll className='EditView' onClick={()=>{HideInput('gender')}}/> :<AiFillEdit className='EditView' onClick={()=>{ShowInput('gender')}}/>}
            <br/>{EditInput.gender &&  <Male/>}
              {EditInput.gender && <Female/>}
              {EditInput.gender && <Other/> }

            <label className='HB'>Hobby : <span>{user.Hobby.join(',')}</span></label>{EditInput.hobby ? <MdOutlineDoneAll className='EditView' onClick={()=>{HideInput('Hobby')}}/> :<AiFillEdit className='EditView' onClick={()=>{ShowInput('hobby')}}/>}
        
            {EditInput.hobby && <Singing/>}
            {EditInput.hobby && <Traveling/>}
            {EditInput.hobby && <Driving/>}
            <label className='HB'>Favorite Colour : 
            <span style={{padding:"0",marginLeft:"15px"}}>{user.color}</span></label>{EditInput.color ? <MdOutlineDoneAll className='EditView' onClick={()=>{HideInput('color')}}/> :<AiFillEdit className='EditView' onClick={()=>{ShowInput('color')}}/>}
            {EditInput.color && <input type="color" id="color" className='i-color' name="color" value={user.color || ''} onChange={handleChange} />}<br/>
            <div className='sub'><input type="button" value="back"  className='button-6'  onClick={handleCloseEdit} /></div>
        </form>
    </div>
  )
}
export default function ViewData() {
  const navigate = useNavigate()
    const [openEdit, setOpenEdit] = React.useState(true);
    const location = useLocation();
    const Transition = React.forwardRef(function Transition(
        props: {children: React.ReactElement;},
        ref: React.Ref<unknown>,
        ) {
          return <Slide direction="up" ref={ref} {...props} />;
    });
    const handleCloseEdit = () => {
      setOpenEdit(false);
      navigate('/changes')  
    };
    return (
      <div>
        <Dialog
        fullScreen
        open={openEdit}
        onClose={handleCloseEdit}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative',backgroundColor: 'black' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={handleCloseEdit}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              ADD USER
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseEdit}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <ViewEdit/>
      </Dialog>
      <ToastContainer/>
    </div>
  )
}
