import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Paper, Box, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TextField, MenuItem } from '@mui/material';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUserData, setNewUserData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    role: 'employee',
    password: 'pass' // Default password, user will change at first login
  });

  useEffect(() => {
    // Retrieve token and user data from localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Fetch user list if user is admin or manager
      if (parsedUser.role === 'admin' || parsedUser.role === 'manager') {
        fetchUserList(token);
      }
    } else {
      // Redirect to login page if token or user data is missing
      navigate('/authenticate');
    }
  }, [navigate]);

  const fetchUserList = async (token) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/users/list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user list');
      }
      const data = await response.json();
      setUserList(data); // Assuming response is already an array of users [{...}, {...}, ...]
    } catch (error) {
      console.error('Error fetching user list:', error);
      // Handle error as needed, e.g., show an error message
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/authenticate');
  };

  const handleAddUser = () => {
    setShowAddUserForm(true);
  };

  const handleCancelAddUser = () => {
    setShowAddUserForm(false);
    setNewUserData({
      email: '',
      firstname: '',
      lastname: '',
      role: 'employee',
      password: 'pass'
    });
  };

  const handleSaveUser = async () => {
    try {
      // Perform validation if needed

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newUserData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add new user');
      }

      const userData = await response.json();
      console.log('New user added:', userData);

      // Optionally, update the user list immediately after adding a new user
      fetchUserList(token);

      // Reset form and hide it
      handleCancelAddUser();
    } catch (error) {
      console.error('Error adding new user:', error);
      // Handle error as needed
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (!user) {
    // Show a loading message or null while checking localStorage
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {`Welcome to Dashboard ${user.firstname} ${user.lastname}`}
        </Typography>

        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          {!showAddUserForm ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddUser}
              style={{ marginBottom: '1rem' }}
            >
              Add New User
            </Button>
          ) : (
            <Paper elevation={3} sx={{ padding: 3, width: '80%', margin: 'auto' }}>
              <Typography variant="h6" align="center" gutterBottom>
                Add New User
              </Typography>
              <Box display="flex" flexDirection="column" alignItems="center">
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={newUserData.email}
                  onChange={handleChange}
                />
                <TextField
                  name="firstname"
                  label="First Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={newUserData.firstname}
                  onChange={handleChange}
                />
                <TextField
                  name="lastname"
                  label="Last Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={newUserData.lastname}
                  onChange={handleChange}
                />
                <TextField
                  select
                  name="role"
                  label="Role"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={newUserData.role}
                  onChange={handleChange}
                >
                  {['admin', 'manager', 'employee'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveUser}
                    style={{ marginRight: '1rem' }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleCancelAddUser}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Paper>
          )}
          {userList && userList.length > 0 ? (
            <TableContainer component={Paper} style={{ width: '80%', margin: 'auto', marginTop: '1rem' }}>
              <Table aria-label="user list">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.firstname}</TableCell>
                      <TableCell>{user.lastname}</TableCell>
                      <TableCell>{user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" align="center" style={{ marginTop: '1rem' }}>
              No users to display.
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default DashboardPage;
