import { useEffect, useState } from 'react';
import { fetchJson } from '../api';

function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJson('/workouts')
      .then((data) => setItems(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Workouts</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {items.map((workout) => (
          <div className="col-md-6" key={workout._id || workout.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text mb-1">Focus: {workout.focus}</p>
                <p className="card-text mb-1">Duration: {workout.duration} min</p>
                <p className="card-text mb-0">Difficulty: {workout.difficulty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
