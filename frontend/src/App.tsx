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
  const [search, setSearch] = useState('');

  useEffect(() => {
    const url = search
      ? `http://localhost:3000/locations?search=${encodeURIComponent(search)}`
      : 'http://localhost:3000/locations';

    fetch(url)
      .then((response) => response.json())
      .then((data) => setLocations(data));
  }, [search]);

  return (
    <main className="page">
      <h1>Cidade Viva</h1>
      <p className="subtitle">Locais acessíveis e sustentáveis em Salto</p>

      <div className="search-box">
        <label htmlFor="search-input" className="sr-only">
          Buscar locais por nome ou categoria
        </label>
        <i className="ti ti-search" aria-hidden="true"></i>
        <input
          id="search-input"
          type="text"
          placeholder="Buscar por nome ou categoria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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

        {locations.length === 0 && (
          <p className="empty-state">Nenhum local encontrado para essa busca.</p>
        )}
      </div>
    </main>
  );
}

export default App;