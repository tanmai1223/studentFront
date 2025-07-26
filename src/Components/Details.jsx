import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import "../styles/HomePage.css";
import { AuthContext } from '../Context/AuthContext';

function Details() {
  const location = useLocation();
  const id = location.state?.id;
  const navigate=useNavigate()
  const {role,loading}=useContext(AuthContext)

  

  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/student/${id}`);
          setData(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }
  }, [id]);

  if (!id) {
    return <div>No student selected. Please go back to the student list.</div>;
  }

  if(loading) return <p>Loading...</p>
const formatName = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatAddress=(str)=>{
    return str.toLowerCase() .split(",")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

  return (
    <div className="homepage">
  <Header />
  <Sidebar />
  <div className="main-content">
    <section className="details-section">
      <h2>Student Details</h2>
      {data ? (
        <div className="details-card">
          <p><strong>Name:</strong> {formatName(data.name)}</p>
          <p><strong>Roll No:</strong> {data.rollno}</p>
          <p><strong>Email:</strong> {data.gmail}</p>
          <p><strong>Father's Name:</strong> {formatName(data.fatherName)}</p>
          <p><strong>Branch:</strong> {data.branch}</p>
          <p><strong>Caste:</strong> {data.caste}</p>
          <p><strong>Gender:</strong> {data.gender}</p>
          <p><strong>Date of Birth:</strong> {formatDate(data.dob)}</p>
          <p><strong>Date of Joining:</strong> {formatDate(data.doj)}</p>
          <p><strong>Rank:</strong> {data.rank}</p>
          <p><strong>Address:</strong> {formatAddress(data.address)}</p>
          <p><strong>10th Percentage:</strong> {data.per10}</p>
          <p><strong>12th Percentage:</strong> {data.per12}</p>
          <p><strong>UG CGPA:</strong> {data.ugcgpa}</p>
          <p><strong>UG Backlog:</strong> {data.ugbacklog}</p>
          <p><strong>UG Percentage:</strong> {data.ugper}</p>
          <div className='buttons'>
            <button onClick={()=>{navigate('/edit',{state:data})}}>Edit</button>
            {role==="admin" && <button onClick={()=>{navigate('/delete',{state:{id:data._id}})}}>Delete</button>}
          
          </div>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  </div>
</div>

  );
}

export default Details;
