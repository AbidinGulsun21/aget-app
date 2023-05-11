import './App.css';
import Navbar from './Components/Navbar';
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.min.css'
import Topbar from './Components/Topbar';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from "react-router-dom";
import Products from './pages/Products';
import Deprems from './pages/Deprems';
import Login from './pages/Login';

function App() {
  return (
    <>
      <div className='grid p-0 m-0'>
        <div className='col-2 p-0 m-0'  >
          <Navbar />
        </div>
        <div className='col-10 p-0 m-0' >
          <Topbar />
          <div className='p-4'>
            <Routes>
              <Route exact path='/' element={<Dashboard />} />
              <Route path='/products' element={<Products />} />
              <Route path='/deprems' element={<Deprems />} />
              <Route path='/login' element={<Login />} />
            </Routes>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;