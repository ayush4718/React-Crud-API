import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { Table, TableContainer, TableHead, TableRow } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

export default function DataTable() {
    const [userdata,setuserdata]=useState([])
    const userData="http://localhost:4000/posts"
    console.log('userdata',userData)

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

    useEffect(()=>{
        GetData();
    },[])
    const GetData=()=>{
        console.log("hiii")
        if(userData!==null){
            axios.get("http://localhost:4000/posts")
            .then(res=>res.data)
            .then(data=>setuserdata(data))
            .catch(err=>console.log(err))
        }
    }
    
    return (
        <div className='App'>
        <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className='Tbl'  >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">E-mail</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">Hobby</StyledTableCell>
            <StyledTableCell align="center">Colour</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userdata && userdata.map((row,i) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center">{i+1}</StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center" >{row.email}</StyledTableCell>
              <StyledTableCell align="center" >{row.number}</StyledTableCell>
              <StyledTableCell align="center">{row.date}</StyledTableCell>
              <StyledTableCell align="center">{row.gender}</StyledTableCell>
              <StyledTableCell align="center">{row.Hobby.join(',')}</StyledTableCell>
              <StyledTableCell align="center">{row.color}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
    </div>
  )
}
