import './App.css';
import { Route, Routes } from 'react-router';
import RegisterForm from './component/register';
import LoginForm from './component/login';


function App() {

    return (
      <div className="App">
        <ul>
            <li><a href='/register'>register new user </a></li>
            <li><a href='/login'>login user </a></li>
        </ul>
        
        <Routes>
            <Route path="register" element={ <RegisterForm />} />
            <Route path="login" element={ <LoginForm />} />
        </Routes>

      </div>
    );
  }

export default App;
