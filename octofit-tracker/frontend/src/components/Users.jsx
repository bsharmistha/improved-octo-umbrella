import { useEffect, useState } from 'react';

function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() || import.meta.env.CODESPACE_NAME?.trim() || import.meta.env.CODESPACE?.trim();
    const apiBase = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/users`
      : 'http://localhost:8000/api/users';

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
      <h2 className="mb-3">Users</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {items.map((user) => (
          <div className="col-md-6" key={user._id || user.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text mb-1">Email: {user.email}</p>
                <p className="card-text mb-1">Level: {user.level}</p>
                <p className="card-text mb-0">Points: {user.points}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
