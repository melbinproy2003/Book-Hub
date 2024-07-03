import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Userlist() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/users/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();

        if (Array.isArray(data)) { 
          const sortedUsers = data.sort((a, b) => b.id - a.id);
          setUsers(sortedUsers);
        } else {
          console.error('Unexpected data format received from API');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}/delete/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        if (response.ok) {
            setToastMessage('User deleted successfully');
            setIsSuccess(true);
        } else {
            throw new Error('Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        setToastMessage('Failed to delete user');
        setIsSuccess(false);
    }
    setShowToast(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase()); 
  };

  const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchQuery));

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Book Hub</h1>
        <nav style={styles.navbar}>
          <Link to="/dashboard" style={styles.navlink}>HOME</Link>
          <Link to="/Userlist" style={styles.navlink}>USERS</Link>
          <Link to="/register" style={styles.navlink}>ADD USER</Link>
          <Link to="/addBook" style={styles.navlink}>ADD BOOK</Link>
          <a href="#" style={styles.navlink} onClick={handleLogout}>LOGOUT</a>
        </nav>
      </header>
      <div style={styles.searchContainer}>
        <div style={styles.searchBox}>
          <input
            type="text"
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div style={styles.cardContainer}>
        {filteredUsers.map(user => (
          <div key={user.id} style={styles.userItem}>
            <input type="text" style={styles.details} value={user.username} readOnly />
            <button style={styles.delete} onClick={() => handleDelete(user.id)}>Remove</button>
          </div>
        ))}
      </div>
      {showToast && (
        <div style={isSuccess ? styles.toastSuccess : styles.toastError}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    color: '#343a40',
    fontFamily: 'Arial, sans-serif',
    paddingTop: '80px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Georgia, serif',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  navbar: {
    display: 'flex',
    gap: '20px',
  },
  navlink: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '18px',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  searchBox: {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 20px',
    borderRadius: '50px',
    border: '1px solid #ced4da',
    paddingRight: '60px',
    fontSize: '16px',
    fontFamily: 'Courier New, monospace',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
  },
  userItem: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    marginBottom: '10px',
  },
  details: {
    flexGrow: 1,
    padding: '5px',
    marginRight: '10px',
  },
  delete: {
    padding: '5px 10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    backgroundColor: '#ffdddd',
  },
  toastSuccess: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px 20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  toastError: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px 20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
};

export default Userlist;
