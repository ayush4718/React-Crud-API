// import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Crudf from './pages/crud-f';
import Navbar from './pages/homepage';
import Changes from './pages/Changes';
import { createContext, useContext } from 'react';
import ResponsiveAppBar from './pages/nav';
import DataTable from './pages/table';
import ViewData from './pages/ViewData';
const EditUser=createContext([]);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        {/* <ResponsiveAppBar/> */}
        <Routes>
          <Route path='/' element={<DataTable />}/>
          <Route path='/changes' element={<Changes/>}/>
          <Route path='/user' element={<ViewData/>}/>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
