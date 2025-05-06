import React, { useEffect, useMemo, useState } from "react";

const AdminDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Admin",
    password: "",
  });
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editUser !== null) {
        const res = await fetch(
          `http://localhost:5000/users/${users[editUser].email}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        if (!res.ok) throw new Error("Failed to update");
      } else {
        const res = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to add");
      }

      const updatedUsers = await fetch("http://localhost:5000/users").then(
        (res) => res.json()
      );
      setUsers(updatedUsers);
      setForm({ name: "", email: "", role: "Admin", password: "" });
    } catch (err) {
      console.log(err);
    }

    setForm({ name: "", email: "", role: "Admin", password: "" });
  };

  const handleDelete = async (email) => {
    try {
      const res = await fetch(`http://localhost:5000/users/${email}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedUsers = await fetch("http://localhost:5000/users").then(
          (res) => res.json()
        );
        setUsers(updatedUsers);
      } else {
        alert("Error delete user");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderData = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  const handleEdit = (user, index) => {
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
    });
    setEditUser(index);
  };

  return (
    <div className="dashboardPage">
      <h2>Admin Dashboard</h2>
      <form>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <label>Select Role</label>
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option>User</option>
          <option>Admin</option>
        </select>
        <button type="submit" onClick={handleSubmit}>
          Add user
        </button>
      </form>
      {users.length > 0 && (
        <div>
          <h3>User Lists</h3>
          <input
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />

          <table border={1}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {renderData.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <button onClick={() => handleEdit(user, index)}>Edit</button>
                  <button onClick={() => handleDelete(user.email)}>
                    Delete
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
