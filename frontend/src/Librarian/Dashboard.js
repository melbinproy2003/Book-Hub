import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBooks() {
            const token = localStorage.getItem('token');

            if (!token) {
                window.alert('Please Login');
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:8000/api/books/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }

                const data = await response.json();
                const sortedBooks = data.sort((a, b) => b.id - a.id);
                setBooks(sortedBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }

        fetchBooks();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleBookClick = (bookId) => {
        navigate(`/addBook/${bookId}`);
    };

    const handleDelete = async (bookId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8000/api/books/${bookId}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            if (response.ok) {
                setBooks(books.filter(book => book.id !== bookId));
                setToastMessage('Book deleted successfully');
                setIsSuccess(true);
            } else {
                throw new Error('Failed to delete book');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            setToastMessage('Failed to delete book');
            setIsSuccess(false);
        }
        setShowToast(true);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));

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
                        placeholder="Search..."
                        style={styles.searchInput}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div style={styles.cardContainer}>
                {filteredBooks.map(book => (
                    <div key={book.id} style={styles.bookItem}>
                        <div style={styles.img}>
                            <img src={book.image || 'https://placehold.co/50x50'} alt={book.title} style={styles.imgContent} />
                        </div>
                        <input type="text" style={styles.details} value={book.title} readOnly />
                        <button style={styles.edit} onClick={() => handleBookClick(book.id)}>Edit</button>
                        <button style={styles.delete} onClick={() => handleDelete(book.id)}>Delete</button>
                    </div>
                ))}
            </div>
            {showToast && (
                <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1 }}>
                    <div id="liveToast" className={`toast show ${isSuccess ? '' : 'text-bg-danger'}`} role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-body" style={isSuccess ? styles.toastBody : styles.toastBodyError}>
                            {toastMessage}
                        </div>
                    </div>
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
    bookItem: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        width: '500px',
        marginBottom: '10px',
    },
    img: {
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px',
    },
    imgContent: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    details: {
        flexGrow: 1,
        padding: '5px',
        border: '1px solid black',
        marginRight: '10px',
    },
    edit: {
        padding: '5px 10px',
        marginRight: '5px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0',
    },
    delete: {
        padding: '5px 10px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        backgroundColor: '#ffdddd',
    },
    toastBody: {
        backgroundColor: '#d4edda',
        color: '#155724',
    },
    toastBodyError: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
    },
};

export default Dashboard;
