import React, { useState,useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('register/', { username, password, email });
            setSuccess('User registered successfully!');
            setError('');
            navigate('/Userlist');
        } catch (err) {
            console.log(err);
            setSuccess('');
            setError('Registration failed');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>New User</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                {error && <div style={styles.alertError}>{error}</div>}
                {success && <div style={styles.alertSuccess}>{success}</div>}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={styles.input}
                    />
                </div> 
                <div style={styles.formGroup}>
                    <label style={styles.label}>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>ADD</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10%',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        alignSelf: 'center', // Center the button
    },
    alertError: {
        width: '100%',
        color: '#721c24',
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        textAlign: 'center',
    },
    alertSuccess: {
        width: '100%',
        color: '#155724',
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        textAlign: 'center',
    },
    registerLinkContainer: {
        textAlign: 'center', // Center the text and link
        marginTop: '10px',
    },
    link: {
        color: '#007BFF',
        textDecoration: 'none',
    },
};

export default Register;
