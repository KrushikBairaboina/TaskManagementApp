# Task Management App

A full-stack Task Management application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This app allows users to create, manage, and track tasks with pagination, status filtering, and CRUD operations.

---

## Features
- Create, read, update, and delete tasks (CRUD operations).
- Separate views for **Pending Tasks** and **Completed Tasks**.
- Paginated task lists for better performance and usability.
- Integrated search functionality.
- Toast notifications for user feedback.
- Backend API built using **Express.js** and **MongoDB**.
- Frontend built using **React.js**.

---

## Technologies Used
- **Frontend**: React.js, React Router, Bootstrap, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: Bootstrap 5
- **Notifications**: react-toastify

---

## Installation Instructions

Follow these steps to clone and run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/KrushikBairaboina/TaskManagementApp.git
cd TaskManagementAppw
```

### 2. Install Dependencies
You need to install dependencies for both the **frontend** and **backend**.

#### Install Backend Dependencies
```bash
cd backend
npm install
```

#### Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 3. Set Up Environment Variables

#### Backend
Create a `.env` file in the `backend` directory and add the following:
```env
MONGO_URL=mongodb+srv://krushikbairaboina07:krushik@crudapplication.0fo8c.mongodb.net/?retryWrites=true&w=majority&appName=CrudApplication
PORT=8080
```

Replace `your_mongodb_connection_string` with your MongoDB connection string.

---

### 4. Run the Application

#### Start the Backend Server
```bash
cd backend
npm start
```

The backend server will run on (http://localhost:8080).

#### Start the Frontend
```bash
cd frontend
npm start
```

The frontend will run on (http://localhost:3000/task) by default.

---

## Folder Structure
```
task-management-app
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## API Endpoints (Backend)
Here are the key API routes available in the backend:
- **GET /api/tasks**: Fetch all tasks (supports pagination and search).
- **POST /api/tasks**: Create a new task.
- **PUT /api/tasks/:id**: Update an existing task.
- **DELETE /api/tasks/:id**: Delete a task.

---

## Screenshots
![Screenshot 2024-11-28 152445](https://github.com/user-attachments/assets/47363911-a472-478b-825d-20f932b80325)
![Screenshot 2024-11-28 152513](https://github.com/user-attachments/assets/4d4d70d6-25b3-49e1-9c0e-b3981ae0ad5a)




---

## Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

## License
This project is licensed under the MIT License.

---

## Author
- Krushik Bairaboina
- GitHub: (https://github.com/KrushikBairaboina)

---

Let me know if you want me to customize it further or help you with the screenshots and project links!

