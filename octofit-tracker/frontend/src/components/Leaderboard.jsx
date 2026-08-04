import { useEffect, useState } from 'react';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() || import.meta.env.CODESPACE_NAME?.trim() || import.meta.env.CODESPACE?.trim();
    const apiBase = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
      : 'http://localhost:8000/api/leaderboard';

    fetch(apiBase)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setItems(Array.isArray(data) ? data : data.results || data.items || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {items.map((entry, index) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id || `${entry.userName}-${index}`}>
            <div>
              <h6 className="mb-1">{entry.userName}</h6>
              <div className="text-muted">{entry.teamName}</div>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
