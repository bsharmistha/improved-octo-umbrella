import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() || import.meta.env.CODESPACE_NAME?.trim() || import.meta.env.CODESPACE?.trim();
  const apiHint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/...`
    : 'http://localhost:8000/api/...';

  return (
    <div className="container py-5">
      <div className="p-4 rounded bg-light shadow-sm">
        <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
        <p className="lead text-muted">
          A modern multi-tier fitness dashboard for students, teams, and activities.
        </p>
        <p className="mb-0">
          The app will use <code>{apiHint}</code> for API calls.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            OctoFit
          </NavLink>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/teams">
              Teams
            </NavLink>
            <NavLink className="nav-link" to="/activities">
              Activities
            </NavLink>
            <NavLink className="nav-link" to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className="nav-link" to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
