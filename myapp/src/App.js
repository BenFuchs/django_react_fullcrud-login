import { Link, Outlet } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

function App() {
    const SERVER = 'http://127.0.0.1:8000/';  // Ensure protocol is included

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [access, setAccess] = useState('');  // Fixed the naming to be consistent

    const login = () => {
        const data = { username, password }; // Sending data as an object
        axios.post(`${SERVER}login/`, data)
            .then(res => {
                setAccess(res.data.access);  // Update state with access token
                localStorage.setItem('access', res.data.access);  // Store access token in localStorage
            })
            .catch(err => console.error('Login error:', err));  // Added error handling
    };

    return (
        <div>
            <h1>Login Page</h1>
            <div>
                Username: 
                <input type="text" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                Password: 
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button onClick={login}>LOGIN</button>
            </div>
            <div>{username} -- {password}</div> {/* Displaying username and password for testing purposes */}
            <hr/>
            {access && (
                <div>
                    <Link to="/products">
                        <button>Go to Products</button>
                    </Link>
                </div>
            )}
            <Outlet />
        </div>
    );
}

export default App;
