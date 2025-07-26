import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';

function Delete() {
  const location = useLocation();
  const id = location.state?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const deleteStudent = async () => {
      try {
        await axios.delete(`http://localhost:3000/api/student/${id}`);
      } catch (err) {
        console.error("Error deleting student:", err);
      }
    };

    if (id) {
      deleteStudent();
    }
  }, [id]);

  return (
    <div className="homepage">
      <Header />
      <Sidebar />
      <div className="main-content">
        <section className="details-section">
          <h1><center>Record Deleted Successfully!</center></h1>
          <button className="delete-section" onClick={() => navigate('/')}>Home</button>
        </section>
      </div>
    </div>
  );
}

export default Delete;
