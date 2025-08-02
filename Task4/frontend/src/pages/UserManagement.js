import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaUnlock, FaTrash } from "react-icons/fa";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(users.map((u) => u.id));
    } else {
      setSelected([]);
    }
  };

  const toggleUserSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((uid) => uid !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const performAction = async (type) => {
    if (!selected.length) return;
    try {
      await API.post(`/users/${type}`, { ids: selected });
      setMsg(`${type} successful`);
      fetchUsers();
      setSelected([]);
    } catch (err) {
      navigate("/login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>User Management</h3>
        <Button variant="secondary" onClick={logout}>Logout</Button>
      </div>

      {msg && <div className="alert alert-info">{msg}</div>}

      {/* Toolbar */}
      <div className="d-flex gap-2 mb-2">
        <Button variant="danger" onClick={() => performAction("block")}>Block</Button>
        <OverlayTrigger placement="top" overlay={<Tooltip>Unblock</Tooltip>}>
          <Button variant="success" onClick={() => performAction("unblock")}>
            <FaUnlock />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Button variant="outline-danger" onClick={() => performAction("delete")}>
            <FaTrash />
          </Button>
        </OverlayTrigger>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selected.length === users.length && users.length > 0}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(u.id)}
                  onChange={() => toggleUserSelect(u.id)}
                />
              </td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{new Date(u.last_login_time).toLocaleString()}</td>
              <td className={u.status === "blocked" ? "text-danger" : "text-success"}>
                {u.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
