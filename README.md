# Book Hub

## Project Overview
Book Hub is a web application designed to facilitate efficient and organized library operations. The project utilizes Python Django for the backend and React.js for the frontend. 

## Features
### User Management
- Add new users (librarians, patrons)
- Update user information
- Delete users
- Search for users

### Catalog Module
- Add books to the catalog
- Update book information (title, author, ISBN, etc.)
- Delete books
- Search for books

## Installation

### Prerequisites
- Python 3.8+
- npm
- Django
- React.js

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/melbinproy2003/Book-Hub.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd Book-Hub/backend
   ```
3. Create a virtual environment and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```

## Usage
1. Open your web browser and navigate to `http://localhost:3000/dashboard` to access the dashboard.
2. Use the provided endpoints and user interface to manage and interact with the book catalog.

## Contact
For questions or issues, please open an issue in this repository. 

[GitHub Repository](https://github.com/melbinproy2003/Book-Hub)
