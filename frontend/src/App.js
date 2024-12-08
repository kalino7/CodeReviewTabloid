import './App.css';
import { Route, Routes } from 'react-router';
import RegisterForm from './component/register';
import LoginForm from './component/login';
import Dashboard from './component/dashboard';
import ProtectedRoute from './protectedRoute/protectedRoute';
import Nav from './component/nav';


function App() {

    return (
      <div className="App">
        <Nav />

        <Routes>
            <Route path="dashboard" element={
                <ProtectedRoute>
                    <Dashboard /> 
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
