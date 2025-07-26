import React from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import '../Styles/HomePage.css'

function AdminPage() {
  
  return (
    <div className="home-container">
      <Header />
      <Sidebar />

      <div className="main-content">
        

        <section className="content">
          <h2><center>Welcome to the Admin Portal </center></h2>
          
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
