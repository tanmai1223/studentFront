import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

function Charts() {
  const [genderData, setGenderData] = useState([]);
  const [casteData, setCasteData] = useState([]);
  const [academicData, setAcademicData] = useState([]);
  const [backlogData, setBacklogData] = useState([]);
  const [maleTopper, setMaleTopper] = useState(null);
  const [femaleTopper, setFemaleTopper] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/student');
        const students = res.data;

        const male = students.filter((s) => s.gender?.toLowerCase() === 'm');
        const female = students.filter((s) => s.gender?.toLowerCase() === 'f');

        // Gender Distribution
        setGenderData([
          { gender: 'Male', value: male.length },
          { gender: 'Female', value: female.length },
        ]);

        // Caste Distribution
        const casteMap = {};
        students.forEach((s) => {
          const caste = s.caste?.toUpperCase().trim() || 'UNKNOWN';
          casteMap[caste] = (casteMap[caste] || 0) + 1;
        });
        const casteArray = Object.entries(casteMap).map(([caste, count]) => ({ caste, count }));
        setCasteData(casteArray);

        // Academic Performance
        const countOver = (arr, key, threshold) =>
          arr.filter((s) => parseFloat(s[key]) > threshold).length;

        const academicChart = [
          {
            category: 'per10',
            Male: countOver(male, 'per10', 80),
            Female: countOver(female, 'per10', 80),
          },
          {
            category: 'per12',
            Male: countOver(male, 'per12', 80),
            Female: countOver(female, 'per12', 80),
          },
          {
            category: 'ugper',
            Male: countOver(male, 'ugper', 8),
            Female: countOver(female, 'ugper', 8),
          },
        ];
        setAcademicData(academicChart);

        // Backlog Count
        const maleBacklogs = male.filter((s) => parseInt(s.ugbacklog || 0) > 0).length;
        const femaleBacklogs = female.filter((s) => parseInt(s.ugbacklog || 0) > 0).length;

        setBacklogData([
          { gender: 'Male', value: maleBacklogs },
          { gender: 'Female', value: femaleBacklogs },
        ]);

        // Toppers
        const getTopper = (arr) =>
          arr.reduce((top, curr) =>
            parseFloat(curr.ugper || 0) > parseFloat(top.ugper || 0) ? curr : top,
            { ugper: 0 }
          );

        setMaleTopper(getTopper(male));
        setFemaleTopper(getTopper(female));
      } catch (err) {
        console.log('Error fetching student data:', err);
      }
    };

    fetchData();
  }, []);

  const GENDER_COLORS = ['#0088FE', '#FF69B4'];
  const BACKLOG_COLORS = ['#FF7F50', '#9370DB'];

  return (
    <div>
      {/* Topper Boxes */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        marginTop: '30px',
        marginBottom: '20px',
      }}>
        {maleTopper && (
          <div style={{
            padding: '20px',
            backgroundColor: '#e6f0ff',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            width: '300px',
            textAlign: 'center',
          }}>
            <h3>🏆 Male Topper</h3>
            <p><strong>{maleTopper.name}</strong></p>
            <p>UG %: {maleTopper.ugper}</p>
          </div>
        )}
        {femaleTopper && (
          <div style={{
            padding: '20px',
            backgroundColor: '#fff0f5',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            width: '300px',
            textAlign: 'center',
          }}>
            <h3>🏆 Female Topper</h3>
            <p><strong>{femaleTopper.name}</strong></p>
            <p>UG %: {femaleTopper.ugper}</p>
          </div>
        )}
      </div>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        padding: '40px'
      }}>
        {/* Gender Donut Chart */}
        <div style={{ textAlign: 'center' }}>
          <h3>Gender Distribution</h3>
          <center>
            <PieChart width={400} height={300}>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                nameKey="gender"
                label={({ gender, percent }) => `${gender} ${(percent * 100).toFixed(0)}%`}
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-gender-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </center>
        </div>

        {/* Caste Bar Chart */}
        <div style={{ textAlign: 'center' }}>
          <h3>Caste Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={casteData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="caste" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#28e26f" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Academic Performance Bar Chart */}
        <div style={{ textAlign: 'center' }}>
          <h3>High Scorers by Gender</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={academicData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Male" fill="#fe5d00" />
              <Bar dataKey="Female" fill="#034417" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Backlog Pie Chart */}
        <div style={{ textAlign: 'center' }}>
          <h3>Backlog Count (Male vs Female)</h3>
          <center>
            <PieChart width={400} height={300}>
              <Pie
                data={backlogData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
                nameKey="gender"
                label={({ gender, percent }) => `${gender} ${(percent * 100).toFixed(0)}%`}
              >
                {backlogData.map((entry, index) => (
                  <Cell key={`cell-backlog-${index}`} fill={BACKLOG_COLORS[index % BACKLOG_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Charts;
