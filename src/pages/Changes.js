import React, { useEffect, useState } from 'react'
import { Await, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dialog,AppBar,IconButton, DialogActions, DialogTitle, Button ,Toolbar, Popover} from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Crudf from './crud-f';
import { Link,NavLink } from "react-router-dom"
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiDotsHorizontal } from 'react-icons/hi';
import {FiEdit} from 'react-icons/fi'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {GrView} from 'react-icons/gr'
import { Anchor } from '@mui/icons-material';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ViewData from './ViewData';

const Transition = React.forwardRef(function Transition(
  props: {children: React.ReactElement;},
  ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  export default function Changes() {
    const navigate = useNavigate();

    // states 
    const [userdata,setuserdata]=useState([])
    const [Update,setUpdate]=useState([])
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [Editid, setEditid] = useState();
    const [DeleteId, setDeleteId] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);

    // useEffect 
    useEffect(()=>{
        getUsers()
    },[]);

    // get users 
    function getUsers(){
        axios.get("http://localhost:4000/posts")
        .then(res=>res.data)
        .then(data=>setuserdata(data))
        .then(()=>{
          toast.success("Get Data SucessFull !",{
            position:"top-center",
            autoClose: 1111
          })
        })
        .catch(err=>console.log("err",err))
    }

    // delete 
    const handleClickOpen = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          })
          .then(()=>{HandleDelete()})
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };

    const HandleDelete=()=>{
      axios.delete(`http://localhost:4000/posts/${DeleteId}`)
        .then((result)=>{console.log(result)})
        .then(()=>{
          getUsers();
          toast.success("Delete SucessFull !",{
            position:"top-center",
            autoClose: 1111
          })
        })
        setOpen(false);
        setAnchorEl(null);
        navigate('/changes')
        
    }

    // Edit 
    const handleClickOpenEdit = (i) => {
        setOpenEdit(true);
        HandleEdit(Editid);
    };
    
    const handleCloseEdit = () => {
        setOpenEdit(false);

    };
    const HandleEdit=(i)=>{
        const Edata1=userdata.find((l,m)=>m===i);
        const Edata={...Edata1}
        setUpdate(Edata);
    }
    const Close=(c)=>{
      setOpenEdit(c)
      getUsers()
    }

    // set id and index 
    const HandleClickSet=(l,i)=>{
      setEditid(i);
      setDeleteId(l.id)
    }
    const handleClickDot = (event) => {
      setAnchorEl(event.currentTarget);
      console.log("anchor",event.currentTarget)
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    // view 
    const HandleView=()=>{
      const Edata1=userdata.find((l,m)=>m===Editid);
      console.log(Edata1);
      navigate('/user',{state:Edata1})
      
  }
  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;

  return (
    <div>{console.log('updt')}
      <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className='Tbl' >
        <TableHead>
          <TableRow>
            <StyledTableCell/>
            <StyledTableCell/>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="left">Edit</StyledTableCell>
            <StyledTableCell/>
            <StyledTableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {userdata.map((row,i) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell/>
              <StyledTableCell/>
              <StyledTableCell align="center">{i+1}</StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.date}</StyledTableCell>
              <StyledTableCell align="left" aria-describedby={id} variant="contained" onClick={handleClickDot}><HiDotsHorizontal className='dots' onClick={()=>{HandleClickSet(row,i)}}></HiDotsHorizontal></StyledTableCell>
              <StyledTableCell/>
              <StyledTableCell/>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
        <Dialog
        fullScreen
        open={openEdit}
        onClose={handleCloseEdit}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: 'black' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseEdit}
              aria-label="close"
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
        <Crudf state={Update} Close={Close}/>
      </Dialog>
      <Popover
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography className='icontype' fontSize={10} sx={{ p: 1 }}> <div className="icon"><FiEdit onClick={handleClickOpenEdit} fontSize={20} className='i-con'/></div>Edit</Typography>
        <Typography className='icontype' fontSize={10} sx={{ p: 1 }}> <div className="icon"><GrView onClick={HandleView} fontSize={20} className='i-con' /></div>View</Typography>
        <Typography className='icontype' fontSize={10} sx={{ p: 1 }}> <div className="icon"><RiDeleteBin5Line onClick={handleClickOpen} fontSize={20} className='i-con'/></div>Delete</Typography>
      </Popover>
      <ToastContainer/>
    </div>
  )
}
