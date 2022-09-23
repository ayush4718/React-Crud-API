import axios, { Axios } from 'axios';
import React, { useCallback } from 'react'
import { useState,useEffect } from 'react'
import {
    useNavigate,
    useLocation
  } from "react-router-dom";
import Table from './table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  export default function Crudf({ state, Close}) {
    const [NameE,setNameE]=useState();
    const [EmailE,setEmailE]=useState();
    const [NumberE,setNumberE]=useState();
    const [DateE,setDateE]=useState();
    const [GenderE,setGenderE]=useState();
    const [ColorE,setColorE]=useState();
    const[user,setuser]=useState({Hobby:[]});
    const navigate=useNavigate();
    const locationn=useLocation();
    const userData="http://localhost:4000/posts"

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

    useEffect(()=>{state && setuser(state)},[])
    
    const handleSubmit=(event)=>{
        if(Validation()){
            if(state){
                const id=state.id;
                axios.put(`http://localhost:4000/posts/${id}`,user)
                .then(()=>{toast.success("Data was Edited !!",{
                    position:"top-center",
                    autoClose: 1111
                    })
                }).then(()=>{setuser({Hobby:[]})})
                .then(()=>{navigate('/')})
                   
            }
            else{
                if(userData==null){
                    axios.post('http://localhost:4000/posts',[user])
                }
                else{
                    localStorage.setItem('user',JSON.stringify([...userData,user]));
                    axios.post('http://localhost:4000/posts',{...user})
                }
                setuser({Hobby:[]})            
                navigate('/')
            }
            Close(false);
        }
        // setOpen(false);
    }
    function Validation(){
        const namev = /^[a-zA-Z\s]+$/;
        const emailv = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        const numberv = /^[1-9]\d{9}$/;
        console.log("name");
        let NameER = true;
        let emailEr = true;
        let numberEr = true;
        let dateEr = true;
        let genderEr = true
        let colorEr = true;
        // name validation
        if(!user.name){
            setNameE("Enter Your Name")
        }
        else if(namev.test(user.name)==false){
            setNameE("Enter Valid Name")
        }else{
            setNameE('')
            NameER=false;
        }
        // Email validation
        if(!user.email){
            setEmailE("Enter Your Email")
        }
        else if(emailv.test(user.email)==false){
            setEmailE("Enter Valid Email")
        }
        else{
            setEmailE("")
            emailEr=false;
        }
        // Number validation
        if(!user.number){
            setNumberE("Enter Your Number")
        }
        else if(numberv.test(user.number)==false){
            setNumberE("Enter Valid Number")
        }else{
            setNumberE(" ")
            numberEr=false;
        }
        // Date validation
        if(!user.date){
            setDateE("Enter Date")
        }else{
            setDateE("")
            dateEr=false;
        }
        // Gender validation
        if(!user.gender){
            setGenderE("Enter Your Gender")
        }else{
            setGenderE("")
            genderEr=false;
        }
        // Color validation
        if(!user.color){
            setColorE("Enter Your Favorite Coluor")
        }else{
            setColorE("")
            colorEr=false;
        }
        let vald = ( NameER || emailEr || numberEr || dateEr || genderEr || colorEr)
        if(vald === true){
            return false
        }else{
            return true
        }
    }
    return (
    <div className='App'>        
      <form className='form' >
            <label >Name : </label> 
            <input className='i-name' type="text" name="name" value={user.name || ''}  onChange={handleChange} /> <br/><span >{NameE || ''}</span>
            <label >E-mail : </label>
            <input className='i-name' type="email" name="email" value={user.email || ''}  onChange={handleChange} /><br/> <span >{EmailE || ''}</span>
            <label >Number : </label>
            <input className='i-name' type="number" name="number" value={user.number || ''}  onChange={handleChange} /><br/> <span >{NumberE || ''}</span>
            <label>Date : </label> 
            <input className='i-date'type="date" name="date" value={user.date || ''} placeholder="Date" onChange={handleChange} /><br/><span >{DateE || ''}</span>

            <label className='HB'>Gender : </label> <span >{GenderE || ''}</span>
            <input className='i-radio Hobby' type="radio" id="gender" name="gender" checked={user.gender==="Male"} value="Male" onChange={handleChange} /> 
            <label >Male</label><br/>
            <input type="radio" className='i-radio Hobby' id="gender" name="gender" checked={user.gender==="Female"} value="Female" onChange={handleChange} /> 
            <label >Female</label><br/>
            <input type="radio" className='i-radio Hobby' id="gender" name="gender" checked={user.gender==="Other"} value="Other" onChange={handleChange} /> 
            <label  >Other</label><br/>

            <label className='HB'>Hobby : </label>
            <label className='Hobby'>Singing:</label>
            <input type="checkbox" name="Hobby" checked={user.Hobby?.includes('Singing')} onChange={handleChange} value="Singing" /><br/>
            <label className='Hobby'>Traveling:</label>
            <input type="checkbox" name="Hobby" checked={user.Hobby?.includes('Traveling')} onChange={handleChange} value="Traveling" /><br/>
            <label className='Hobby'>Driving:</label>
            <input type="checkbox" name="Hobby" checked={user.Hobby?.includes('Driving')} onChange={handleChange} value="Driving"  /><br/>
            <label className='HB'>Favorite Colour : </label> 
            <span style={{padding:"0",marginLeft:"15px"}}>{ColorE || ''}</span>
            <input type="color" id="color" className='i-color' name="color" value={user.color || ''} onChange={handleChange} /><br/>
            <div className='sub'><input type="button" value="Submit" onClick={handleSubmit} className='button-6'  to="/" /></div>
        </form>
      <ToastContainer/>
    </div>
  )
}
