import './App.css';
import { Route, Routes } from 'react-router';
import RegisterForm from './component/register';
import LoginForm from './component/login';
import Dashboard from './component/dashboard';
import ProtectedRoute from './protectedRoute/protectedRoute';
import MenuBar from './component/nav';
import GetAssingmentByID from './component/assingmentID';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

    return (
      <div className="App">
        <MenuBar />

        <Routes>
            <Route path="dashboard" element={
                <ProtectedRoute>
                    <Dashboard /> 
                </ProtectedRoute>
                } 
            />
            <Route path="assignment/:id" element={
                <ProtectedRoute>
                    <GetAssingmentByID /> 
                </ProtectedRoute>
                } 
            />
            <Route path="register" element={ <RegisterForm/>} 
            />
            <Route path="login" element={ <LoginForm/>} 
            />
        </Routes>

      </div>
    );
  }

export default App;
