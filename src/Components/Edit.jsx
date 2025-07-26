import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';
import '../Styles/Edit.css'

function Edit() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  

  const [info, setInfo] = useState({
    rollno: "",
    branch: "",
    name: "",
    gmail: "",
    fatherName: "",
    dob: "",
    gender: "",
    caste: "",
    doj: "",
    address: "",
    rank: "",
    per10: "",
    per12: "",
    ugcgpa: "",
    ugbacklog: "",
    ugper: ""
  });

  // ✅ Load the data into the form
  useEffect(() => {
    if (data) {
      setInfo(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/api/student/${data._id}`, info);
       navigate('/edited')
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update student");
    }
  };

  return (
    <div className="homepageed">
      <Header />
      <Sidebar />
      <div className="main-contented">
        <section className="details-sectioned">
          <h1><center>Edit Student</center></h1>
          <form onSubmit={handleSubmit}>
            <p><strong>Name:</strong> <input type="text" name="name" value={info.name} onChange={handleChange} /></p>
            <p><strong>Roll No:</strong> <input type="text" name="rollno" value={info.rollno} onChange={handleChange} /></p>
            <p><strong>Email:</strong> <input type="text" name="gmail" value={info.gmail} onChange={handleChange} /></p>
            <p><strong>Father's Name:</strong> <input type="text" name="fatherName" value={info.fatherName} onChange={handleChange} /></p>
            <p><strong>Branch:</strong> <input type="text" name="branch" value={info.branch} onChange={handleChange} /></p>
            <p><strong>Caste:</strong> <input type="text" name="caste" value={info.caste} onChange={handleChange} /></p>
            <p><strong>Gender:</strong> <input type="text" name="gender" value={info.gender} onChange={handleChange} /></p>
            <p><strong>Date of Birth:</strong> <input type="date" name="dob" value={info.dob?.slice(0, 10)} onChange={handleChange} /></p>
            <p><strong>Date of Joining:</strong> <input type="date" name="doj" value={info.doj?.slice(0, 10)} onChange={handleChange} /></p>
            <p><strong>Rank:</strong> <input type="text" name="rank" value={info.rank} onChange={handleChange} /></p>
            <p><strong>Address:</strong> <input type="text" name="address" value={info.address} onChange={handleChange} /></p>
            <p><strong>10th %:</strong> <input type="text" name="per10" value={info.per10} onChange={handleChange} /></p>
            <p><strong>12th %:</strong> <input type="text" name="per12" value={info.per12} onChange={handleChange} /></p>
            <p><strong>UG CGPA:</strong> <input type="text" name="ugcgpa" value={info.ugcgpa} onChange={handleChange} /></p>
            <p><strong>UG Backlog:</strong> <input type="text" name="ugbacklog" value={info.ugbacklog} onChange={handleChange} /></p>
            <p><strong>UG %:</strong> <input type="text" name="ugper" value={info.ugper} onChange={handleChange} /></p>
            <center><button type="submit">Update</button></center>
          </form>
        </section>

      </div>
    </div>
  );
}

export default Edit;
