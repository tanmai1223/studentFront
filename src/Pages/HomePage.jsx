import React from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import '../Styles/HomePage.css' // Optional: for styling
import Sidebar from '../Components/Sidebar'
import Charts from '../Components/Charts'

function HomePage() {
  return (
    <div className="home-container">
      <Header />
      <Sidebar />

      <div className="main-content">
        

        <section className="content">
          <h2><center>Welcome to the Student Portal</center></h2>
          <Charts />
        </section>
      </div>
    </div>
  )
}

export default HomePage
