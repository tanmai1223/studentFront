// src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";



const View = () => {
  const [studentList, setStudentList] = useState([]);
  const navigate=useNavigate()

  const fetchStudent = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/student");
      setStudentList(res.data);
    } catch (err) {
      console.log("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const formatName = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

  return (
  
    <div className="homepage">
      <Header />
      <Sidebar />
   
      <div className="main-content">
        <section className="content">
          <h1><center>Student Records</center></h1>
          <br />
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Grade</th>
              <th>Percentage</th>
              
            </tr>
          </thead>
          <tbody>
            {studentList.map((student, idx) => (
              <tr key={idx} onClick={()=>{navigate('/details', { state: { id: student._id } })
}}>
                <td>{student.rollno}</td>
                <td>{formatName(student.name)}</td>
                <td>{student.gmail}</td>
                <td>{student.ugcgpa}</td>
                <td>{student.ugper}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        </section>
       
      </div>
    </div>
  );
};

export default View;
