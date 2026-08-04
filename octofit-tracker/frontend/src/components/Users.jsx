import { useEffect, useState } from 'react';
import { fetchJson } from '../api';

function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJson('/users')
      .then((data) => setItems(data))
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
