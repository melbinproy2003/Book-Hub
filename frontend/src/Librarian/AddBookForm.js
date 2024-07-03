import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

function RegisterAndManageBooks() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [image, setImage] = useState(null);
    const [summary, setSummary] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else if (id) {
            fetchBookDetails(token);
        }
    }, [navigate, id]);

    const fetchBookDetails = async (token) => {
        try {
            const response = await axiosInstance.get(`books/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (response.status === 200) {
                const book = response.data;
                setTitle(book.title);
                setAuthor(book.author);
                setIsbn(book.isbn);
                setPublishDate(book.publish_date);
                setSummary(book.summary);
                setCurrentImage(book.image);
            }
        } catch (err) {
            console.log(err);
            setError('Failed to fetch book details');
        }
    };

    const handleBookSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('isbn', isbn);
        formData.append('publish_date', publishDate);
        formData.append('summary', summary);
        if (image) {
            formData.append('image', image);
        }

        try {
            const url = id ? `books/${id}/update/` : 'books/add/';
            const method = id ? 'put' : 'post';
            await axiosInstance[method](url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setToastMessage(`Book ${id ? 'updated' : 'added'} successfully!`);
            setIsSuccess(true);
            setError('');
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            setToastMessage(`Book ${id ? 'update' : 'add'} failed`);
            setIsSuccess(false);
            setError(`Book ${id ? 'update' : 'add'} failed`);
        }
        setShowToast(true);
    };

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>{id ? 'Update Book' : 'Add Book'}</h2>
            <form onSubmit={handleBookSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>ISBN:</label>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Publish Date:</label>
                    <input
                        type="date"
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Summary:</label>
                    <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        required
                        style={styles.textarea}
                    ></textarea>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Image:</label>
                    {currentImage && (
                        <div style={styles.currentImageContainer}>
                            <img src={currentImage} alt="Current Book" style={styles.currentImage} />
                        </div>
                    )}
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>{id ? 'Update' : 'Add'}</button>
            </form>

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
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        fontSize: '16px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        backgroundColor: '#fff',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        minHeight: '100px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        alignSelf: 'center',
        marginTop: '20px',
    },
    toastBody: {
        backgroundColor: '#d4edda',
        color: '#155724',
    },
    toastBodyError: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
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
    currentImageContainer: {
        marginBottom: '10px',
    },
    currentImage: {
        width: '100px',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
};

export default RegisterAndManageBooks;
