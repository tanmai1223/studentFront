import React, { useState } from "react";
import axios from "axios";
import '../Styles/Login.css'
import { Link } from "react-router-dom";

function RegisterPage() {
  const [data, setData] = useState({ username: "", password: "", role: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/register", data);
      setData({ username: "", password: "", role: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={data.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Role (admin/user)"
          name="role"
          value={data.role}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        <p className="switch-link">
          Already registered? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
