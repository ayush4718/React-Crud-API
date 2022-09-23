import React from "react";
import { AppBar, Dialog, IconButton, Toolbar } from "@mui/material";
import { Link,Navigate,NavLink, useNavigate } from "react-router-dom"
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Crudf from "./crud-f";
import Button from '@mui/material/Button';

const Transition = React.forwardRef(function Transition(
  props: {children: React.ReactElement;},
  ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  export default function Navbar() {
  const navigate= useNavigate();
  const [open, setOpen] = React.useState(false);

  // edit dialog box 


  // delete 
  const handleClickOpen = () => {
    setOpen(true);
  };
  const Close=(i)=>{
    console.log("i",i)
    setOpen(i)
  }
  const handleClose = (ii) => {
    setOpen(false);
    navigate('/')
  };
  return (
    <div>
      <ul className="Nav">
        <li><NavLink onClick={handleClickOpen} to="/form" style={({isActive})=>{return{color: isActive ? 'lightBlue': 'black',textDecoration: "none",padding:"5px"}}}>ADD DATA</NavLink></li>
        <li><NavLink to="/changes" style={({isActive})=>{return{color: isActive ? 'blue': 'black',textDecoration: "none",padding:"5px"}}}>EDIT DATA</NavLink></li>
        <li><NavLink to="/" style={({isActive})=>{return{color: isActive ? 'blue': 'black',textDecoration: "none",padding:"5px"}}}>All DATA LIST</NavLink></li>
      </ul>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative',backgroundColor: '#a8d5ad'  }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              ADD USER DATA
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <Crudf Close={Close} />
      </Dialog>
    </div>
    
  )
}
