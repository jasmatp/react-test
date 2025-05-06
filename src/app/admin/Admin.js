import React, { useState } from "react";
import { useNavigate } from "react-router";

const Admin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        const user = data.find(
          (user) => user.name === userName && user.password === password
        );
  
        if (user) {
          navigate("/dashboard");
        } else {
          alert("Invalid username or password");
        }
      })
      .catch((err) => console.log(err));

      users.map((user) => {
      if (user.name === userName && user.password === password) {
        navigate("/dashboard");
      }
    });
  };

  return (
    <div className="loginPage">
      <h2>Admin login</h2>
      <form onSubmit={handleSubmit}>
        <label>UserName</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter Username"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />

        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Admin;
