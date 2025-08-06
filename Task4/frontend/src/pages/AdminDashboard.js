import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Badge } from 'react-bootstrap';

function AdminDashboard() {
  const [users, setUsers] = useState([]);

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

  const handleBlock = async (id) => {
    await axios.put(`http://localhost:5000/admin/users/${id}/block`);
    fetchUsers();
  };

  const handleUnblock = async (id) => {
    await axios.put(`http://localhost:5000/admin/users/${id}/unblock`);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/admin/users/${id}`);
    fetchUsers();
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center fw-bold">User Management Dashboard</h2>

      <Table striped bordered hover responsive className="text-center shadow">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Badge bg={user.status === 'active' ? 'success' : 'secondary'}>
                  {user.status}
                </Badge>
              </td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleBlock(user.id)}
                    disabled={user.status === 'blocked'}
                  >
                    Block
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleUnblock(user.id)}
                    disabled={user.status === 'active'}
                  >
                    Unblock
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminDashboard;
