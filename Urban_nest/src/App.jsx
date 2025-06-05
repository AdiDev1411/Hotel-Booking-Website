import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './assets/components/Nav';
import Mainpage from './Mainpage';
import Login from './assets/components/Login';
import './App.css';
import Book_rooms from './assets/components/Book_rooms';
import ConfirmationPage from './assets/components/ConfirmationPage';
import Explore from './assets/components/Explore';
import Admin from './assets/components/Admin';
import AdminDashboard from './assets/components/AdminDashboard';
import RoomStatus from './assets/components/RoomStatus';
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/book-room" element = {<Book_rooms  />}/>
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/AdminDashBoard' element={<AdminDashboard/>} />
        <Route path='/roomStatus' element={<RoomStatus/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
