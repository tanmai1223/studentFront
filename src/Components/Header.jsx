import React, { useContext } from 'react'
import '../Styles/HomePage.css'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Header() {

  const {logout}=useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to login page after logout
  };
  return (
   <div className="homepage">
      <header className="header">
        <h1>Anurag University</h1>
         <div className="nav-right">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
        
      </header>

      

      
    </div>
  )
}

export default Header
