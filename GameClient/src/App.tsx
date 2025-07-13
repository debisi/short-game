import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import axios from './utils/axios';
import { BASE_API_URL } from './constants/config';

interface User {
  name: string;
  email: string;
  userId: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/me', { withCredentials: true });
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  {/* Hide Login on GamePage refresh button */}
  if (loading) return null;

  return (
    <Router>
      <div className="h-screen overflow-hidden bg-gradient-to-b from-blue-500 to-purple-500 ">
        <Routes>
          <Route
            path="/"
            element={user ? <GamePage user={user} onUserChange={setUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? (
              <LoginPage onLogin={() => (window.location.href = `${BASE_API_URL}/login`)} />
            ) : (
              <Navigate to="/" />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
