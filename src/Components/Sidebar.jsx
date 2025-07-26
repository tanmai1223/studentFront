import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/HomePage.css'
import { AuthContext } from '../Context/AuthContext'

function Sidebar() {
  const {role,loading}=useContext(AuthContext)

  if(loading) return <p>Loading...</p>
  return (
    <div >
        <aside className="sidebar">
          <ul>
            {
              role==='admin'?<li><Link to="/adminpage">Home</Link></li>:<li><Link to="/homepage">Home</Link></li>
            }
            
            <li><Link to="/view">View</Link></li>
            {
              role === 'admin' && <li><Link to="/add">Add</Link></li>
            }
            
          </ul>
        </aside>
      
    </div>
  )
}

export default Sidebar
