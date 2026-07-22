import { useState, useEffect } from 'react';
import './App.css';

interface Location {
  id: string;
  name: string;
  description: string | null;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
}

function App() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/locations')
      .then((response) => response.json())
      .then((data) => setLocations(data));
  }, []);

  return (
    <main className="page">
      <h1>Cidade Viva</h1>
      <p className="subtitle">Locais acessíveis e sustentáveis em Salto</p>

      <div className="location-list">
        {locations.map((location) => (
          <article className="location-card" key={location.id}>
            <div className="location-card-header">
              <h2>{location.name}</h2>
              <span className="category-tag">{location.category}</span>
            </div>

            {location.description && (
              <p className="description">{location.description}</p>
            )}

            <div className="address">
              <i className="ti ti-map-pin" aria-hidden="true"></i>
              <span>{location.address}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default App;