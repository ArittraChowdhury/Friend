import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Table,
  Button,
  Badge,
  Row,
  Col,
  Dropdown,
  Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For redirection after logout

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate(); // Use navigate for redirect

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlock = async () => {
    await Promise.all(
      selectedUserIds.map((id) =>
        axios.put(`http://localhost:5000/admin/users/${id}/block`)
      )
    );
    fetchUsers();
    setSelectedUserIds([]);
  };

  const handleUnblock = async () => {
    await Promise.all(
      selectedUserIds.map((id) =>
        axios.put(`http://localhost:5000/admin/users/${id}/unblock`)
      )
    );
    fetchUsers();
    setSelectedUserIds([]);
  };

  const handleDelete = async () => {
    await Promise.all(
      selectedUserIds.map((id) =>
        axios.delete(`http://localhost:5000/admin/users/${id}`)
      )
    );
    fetchUsers();
    setSelectedUserIds([]);
  };

  const handleSelect = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const visibleUserIds = filteredUsers.map((user) => user.id);
    const allSelected = visibleUserIds.every((id) =>
      selectedUserIds.includes(id)
    );
    setSelectedUserIds(allSelected ? [] : visibleUserIds);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // or however you store auth token
    navigate('/login');
  };

  const filteredUsers = users.filter((user) => {
    if (filter === 'active') return user.status === 'active';
    if (filter === 'blocked') return user.status === 'blocked';
    return true;
  });

  return (
    <Container className="mt-5">
      <Row className="mb-3 align-items-center">
        <Col xs={6}>
          <h4 className="fw-bold">User Management Dashboard</h4>
        </Col>
        <Col xs={6} className="d-flex justify-content-end gap-2">
          <Dropdown onSelect={(val) => setFilter(val)}>
            <Dropdown.Toggle variant="secondary" size="sm">
              Filter: {filter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="all">All</Dropdown.Item>
              <Dropdown.Item eventKey="active">Active</Dropdown.Item>
              <Dropdown.Item eventKey="blocked">Blocked</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col>
          <Button
            variant="danger"
            size="sm"
            className="me-2"
            onClick={handleBlock}
            disabled={selectedUserIds.length === 0}
          >
            Block
          </Button>
          <Button
            variant="success"
            size="sm"
            className="me-2"
            onClick={handleUnblock}
            disabled={selectedUserIds.length === 0}
          >
            Unblock
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleDelete}
            disabled={selectedUserIds.length === 0}
          >
            Delete
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive className="shadow text-center">
        <thead className="table-dark">
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                checked={
                  filteredUsers.length > 0 &&
                  filteredUsers.every((u) => selectedUserIds.includes(u.id))
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => handleSelect(user.id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Badge bg={user.status === 'active' ? 'success' : 'secondary'}>
                  {user.status}
                </Badge>
              </td>
              <td>{user.last_login_time ? new Date(user.last_login_time).toLocaleString() : 'Never'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminDashboard;
