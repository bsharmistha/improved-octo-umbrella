import { useEffect, useState } from 'react';

function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() || import.meta.env.CODESPACE_NAME?.trim() || import.meta.env.CODESPACE?.trim();
    const apiBase = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/activities`
      : 'http://localhost:8000/api/activities';

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
