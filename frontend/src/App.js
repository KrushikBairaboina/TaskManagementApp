import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TaskManagementApp from './Components/TaskManagementApp';  // Updated to TaskManagementApp
import TaskDetails from './Components/TaskDetails';  // Updated to TaskDetails

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="task" />} />
          <Route path="/task" element={<TaskManagementApp />} />  {/* Updated to /task */}
          <Route path="/task/:id" element={<TaskDetails />} />  {/* Updated to /task/:id */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
