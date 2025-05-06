import logo from './logo.svg';
import './App.css';
import Admin from './app/admin/Admin';
import AdminDashboard from './app/admin/AdminDashboard'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {
  return (
    // <div className="App">
    //   <Admin />
    //   <AdminDashboard />
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Admin />}></Route>
        <Route path="/dashboard" element= {<AdminDashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
