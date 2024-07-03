import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Register from './Librarian/Register';
import Home from './Home';
import Dashboard from './Librarian/Dashboard';
import AddBookForm from './Librarian/AddBookForm';
import BookDetails from './BookDetail';
import Userlist from './Librarian/Userlist';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} /> {/* Default route */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/addBook" element={<AddBookForm />} />
                    <Route path="/addBook/:id" element={<AddBookForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/BookDetails/:id" element={<BookDetails />} />
                    <Route path="/Userlist" element={<Userlist />}/>
                </Routes>
            </div>
        </Router>
    );
}
    
export default App;
