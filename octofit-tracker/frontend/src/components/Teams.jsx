import { useEffect, useState } from 'react';
import { fetchJson } from '../api';

function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJson('/teams')
      .then((data) => setItems(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Teams</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {items.map((team) => (
          <div className="col-md-6" key={team._id || team.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text mb-1">Coach: {team.coach}</p>
                <p className="card-text mb-1">Members: {team.members?.length || 0}</p>
                <p className="card-text mb-0">Points: {team.points}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
