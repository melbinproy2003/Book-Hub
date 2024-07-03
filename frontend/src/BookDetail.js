import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookDetails() {
    const { id } = useParams(); // Get the book ID from the URL
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchBookDetails(token);
        }
    }, [navigate, id]);

    const fetchBookDetails = async (token) => {
        try {
            const response = await fetch(`http://localhost:8000/api/books/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBook(data);
            } else {
                setError('Failed to fetch book details');
            }
        } catch (error) {
            setError('An error occurred while fetching book details');
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.bookItem}>
                <div style={styles.imgContainer}>
                    <img src={book.image || 'https://placehold.co/150x200'} alt="Book" style={styles.imgContent} />
                </div>
                <div style={styles.details}>
                    <h2>{book.title}</h2>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>Published:</strong> {book.publish_date}</p>
                    <p><strong>Summary:</strong></p>
                    <div style={styles.summary}>
                        {book.summary}
                    </div>
                </div>
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <button style={styles.button} onClick={() => navigate(-1)}>OK</button>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f9fa',
    },
    bookItem: {
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: '800px',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        gap: '20px',
    },
    imgContainer: {
        flex: '0 0 150px',
    },
    imgContent: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    details: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        maxHeight: '400px',
        padding: '10px',
    },
    summary: {
        marginTop: '10px',
        lineHeight: '1.6',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: '1px solid #007bff',
        backgroundColor: '#007bff',
        color: '#ffffff',
        cursor: 'pointer',
        marginTop: '20px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    }
};

export default BookDetails;
