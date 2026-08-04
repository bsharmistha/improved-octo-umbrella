import { useEffect, useState } from 'react';
import { fetchJson } from '../api';

function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJson('/activities')
      .then((data) => setItems(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Activities</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {items.map((activity) => (
          <div className="col-md-6" key={activity._id || activity.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{activity.type}</h5>
                <p className="card-text mb-1">Duration: {activity.duration} min</p>
                <p className="card-text mb-1">Calories: {activity.calories}</p>
                <p className="card-text mb-0">Date: {new Date(activity.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
