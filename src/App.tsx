import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar';
import MainContainer from './components/MainContainer';

import './App.css';

function App() {
  return (
    <div className="Brivo-App">
      <Navbar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </div>
  );
}

export default App;
